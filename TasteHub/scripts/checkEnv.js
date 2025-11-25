// scripts/checkEnv.js
const fs = require("fs");
const path = require("path");

// Define your env files and required keys
const envConfigs = [
    {
        name: "backend",
        path: path.resolve(__dirname, "../backend/.env"),
        requiredKeys: ["MONGO_URI", "MONGO_URI_TEST", "PORT", "DROP_DB"],
    },
    {
        name: "frontend",
        path: path.resolve(__dirname, "../frontend/.env"),
        requiredKeys: ["VITE_BACKEND_URL"],
    },
];

let allGood = true;

envConfigs.forEach((config) => {
    console.log(`\nChecking ${config.name} .env...`);

    // ----------------------------
    // AUTO CREATE .env IF MISSING
    // ----------------------------
    if (!fs.existsSync(config.path)) {
        if (fs.existsSync(config.examplePath)) {
            fs.copyFileSync(config.examplePath, config.path);
            console.log(
                "\x1b[33m%s\x1b[0m",
                `⚠️  ${config.name} .env missing → created from .env.example`
            );
        } else {
            console.error(
                "\x1b[31m%s\x1b[0m",
                `❌ ${config.name} .env file is missing and no .env.example found!`
            );
            allGood = false;
            return;
        }
    }

    // Read .env content
    const envContent = fs.readFileSync(config.path, "utf8");
    const envLines = envContent.split("\n").filter((line) => line.trim() !== "");

    const envVars = {};
    envLines.forEach((line) => {
        const [key, ...valueParts] = line.split("=");
        envVars[key] = valueParts.join("=").trim();
    });

    // Validate required keys
    config.requiredKeys.forEach((key) => {
        if (!(key in envVars) || !envVars[key] || envVars[key].includes("your_")) {
            console.error(
                "\x1b[31m%s\x1b[0m",
                `❌ ${config.name}: ${key} is missing or not configured properly`
            );
            allGood = false;
        } else {
            console.log("\x1b[32m%s\x1b[0m", `✅ ${config.name}: ${key} is set`);
        }
    });
});

if (!allGood) {
    console.log(
        "\nPlease update the generated .env files with real values before running the project."
    );
    process.exit(1);
}

console.log("\n\x1b[32m%s\x1b[0m", "All .env files are correctly set up!");
