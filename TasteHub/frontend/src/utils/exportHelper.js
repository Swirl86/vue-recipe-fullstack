import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Build HTML-layout for recipe export/printing.
 * @param {Object} recipe - Recipe data.
 * @param {boolean} darkMode - Whether to use dark mode styling.
 * @param {boolean} forDocx - Whether the HTML is for a DOCX export.
 * @returns {string} - HTML string representing the recipe layout.
 */
function createRecipePrintHTML(recipe, darkMode = false, forDocx = false) {
    const bg = darkMode ? "#1f2937" : "#ffffff";
    const text = darkMode ? "#f9fafb" : "#111827";

    const radius = forDocx ? "0" : "16px";
    const maxWidth = forDocx ? "700px" : "800px";
    const centerStyle = forDocx ? "text-align:center;" : "display:flex; justify-content:center;";

    return `
        <div class="export-recipe" 
             style="font-family: 'Inter', sans-serif; background:${bg}; color:${text}; 
                    padding:40px; width:${maxWidth}; border-radius:${radius}; margin:0 auto;">

            <h1 style="font-size:32px; font-weight:800; text-align:center; margin-bottom:20px;">
                ${recipe.name || "Untitled Recipe"}
            </h1>

            <div style="${centerStyle} margin-bottom:20px;">
                <img src="${recipe.thumbnail || "/assets/no_img.png"}" 
                     alt="Recipe image"
                     style="width:300px; border-radius:12px; object-fit:cover; display:block; margin:0 auto;">
            </div>

            <div style="text-align:center; margin-bottom:10px;">
                ${
                    recipe.category
                        ? `<span style="background:#f9a8d4; color:#831843; padding:6px 12px; border-radius:20px; margin-right:6px; display:inline-block;">
                            ${recipe.category}
                           </span>`
                        : ""
                }
                ${
                    recipe.area
                        ? `<span style="background:#fef3c7; color:#92400e; padding:6px 12px; border-radius:20px; display:inline-block;">
                            ${recipe.area}
                           </span>`
                        : ""
                }
            </div>

            ${
                recipe.tags?.length
                    ? `<div style="text-align:center; margin:16px 0;">
                        ${recipe.tags
                            .map(
                                (tag) =>
                                    `<span style="background:#ede9fe; color:#4c1d95; padding:6px 12px; border-radius:20px; margin:4px; display:inline-block;">${tag}</span>`
                            )
                            .join("")}
                       </div>`
                    : ""
            }

            <h2 style="font-size:24px; margin-top:20px; border-bottom:2px solid ${text}; padding-bottom:6px;">
                🧂 Ingredients
            </h2>
            <ul style="list-style:disc; padding-left:24px; margin-top:10px; line-height:1.6;">
                ${recipe.ingredients
                    .map((ing, i) => `<li>${recipe.measures?.[i] || ""} ${ing}</li>`)
                    .join("")}
            </ul>

            <h2 style="font-size:24px; margin-top:30px; border-bottom:2px solid ${text}; padding-bottom:6px;">
                🍳 Instructions
            </h2>
            <p style="margin-top:10px; line-height:1.6; white-space:pre-line;">
                ${recipe.instructions || ""}
            </p>

            ${
                recipe.youtube
                    ? `<div style="margin-top:30px; text-align:center;">
                        <a href="${recipe.youtube}" target="_blank" 
                           style="color:${darkMode ? "#f472b6" : "#be185d"}; 
                                  text-decoration:underline; font-weight:600;">
                            ▶ Watch on YouTube
                        </a>
                       </div>`
                    : ""
            }
        </div>
    `;
}

/**
 * Export recipe in specified format.
 * @param {Object} recipe - Recipe data.
 * @param {string} format - Export format: "pdf", "word", or "text".
 * @param {boolean} darkMode - Whether to use dark mode styling.
 */
export async function exportRecipe(recipe, format, darkMode = false) {
    const container = document.createElement("div");
    const forDocx = format === "docx";
    container.innerHTML = createRecipePrintHTML(recipe, darkMode, forDocx);
    document.body.appendChild(container);

    const element = container.firstElementChild;

    if (format === "pdf") {
        element.style.borderRadius = "0";
        element.style.margin = "0";
        element.style.width = "595px"; // A4 pt ~595
        element.style.background = darkMode ? "#1f2937" : "#ffffff";

        const canvas = await html2canvas(element, { scale: 2, useCORS: true, allowTaint: true });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        let position = 0;
        while (position < imgHeight) {
            pdf.addImage(imgData, "PNG", 0, -position, imgWidth, imgHeight);
            position += pdfHeight;
            if (position < imgHeight) pdf.addPage();
        }

        pdf.save(`Recipe - ${recipe.name || "recipe"}.pdf`);
    } else if (format === "docx") {
        const htmlContent = `
            <html xmlns:o="urn:schemas-microsoft-com:office:office" 
                  xmlns:w="urn:schemas-microsoft-com:office:word" 
                  xmlns="http://www.w3.org/TR/REC-html40">
                <head>
                    <meta charset="utf-8">
                    <title>${recipe.name}</title>
                </head>
                <body style="font-family: 'Inter', sans-serif; text-align:center; background:${
                    darkMode ? "#1f2937" : "#ffffff"
                }; color:${darkMode ? "#f9fafb" : "#111827"};">
                    ${createRecipePrintHTML(recipe, darkMode, true)}
                </body>
            </html>
        `;
        const blob = new Blob([htmlContent], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Recipe - ${recipe.name || "recipe"}.docx`;
        link.click();
    } else if (format === "word") {
        const blob = new Blob([element.innerText], { type: "application/msword" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Recipe - ${recipe.name || "recipe"}.doc`;
        link.click();
    } else if (format === "text") {
        const blob = new Blob([element.innerText], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Recipe - ${recipe.name || "recipe"}.txt`;
        link.click();
    }

    document.body.removeChild(container);
}
