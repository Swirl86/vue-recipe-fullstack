import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Export DOM element as PDF, Word, or Text
 * @param {HTMLElement} element
 * @param {"pdf"|"word"|"text"} format
 * @param {string} filename
 * @param {boolean} darkMode - apply dark theme styles for export
 */
export async function exportElement(element, format, filename = "document", darkMode = false) {
    if (!element) return;

    if (darkMode) element.classList.add("dark-theme");

    if (format === "pdf") {
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "pt",
            format: "a4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${filename}.pdf`);
    } else if (format === "word") {
        const blob = new Blob([element.innerText], { type: "application/msword" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${filename}.doc`;
        link.click();
    } else if (format === "text") {
        const blob = new Blob([element.innerText], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Recipe - ${filename}.txt`;
        link.click();
    }

    if (darkMode) element.classList.remove("dark-theme");
}
