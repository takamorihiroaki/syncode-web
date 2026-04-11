import fs from "fs";

const LOG_DIR = "logs";
const LOG_FILE = `${LOG_DIR}/repair-log.json`;

function ensureLogFile() {
    if (!fs.existsSync(LOG_DIR)) {
        fs.mkdirSync(LOG_DIR, { recursive: true });
    }

    if (!fs.existsSync(LOG_FILE)) {
        fs.writeFileSync(LOG_FILE, "[]", "utf-8");
    }
}

export function log(entry) {
    ensureLogFile();

    let logs = [];

    try {
        logs = JSON.parse(fs.readFileSync(LOG_FILE, "utf-8"));
    } catch {
        logs = [];
    }

    logs.push({
        ...entry,
        time: new Date().toISOString(),
    });

    fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
}