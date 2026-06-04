import fs from "fs";
import { execFile } from "child_process";
import { promisify } from "util";
import pdf from "pdf-parse";

const execFileAsync = promisify(execFile);

const tryPdftotext = async (filePath) => {
  try {
    const { stdout } = await execFileAsync("pdftotext", ["-layout", filePath, "-"], { maxBuffer: 10 * 1024 * 1024 });
    return stdout ? String(stdout).toLowerCase() : "";
  } catch (err) {
    console.warn("pdftotext not available or failed:", err.message);
    return "";
  }
};

// parseResume accepts either:
// - a local file path (string)
// - a Buffer containing PDF data
// - a URL (string starting with http)
export const parseResume = async (input) => {
  try {
    let buffer = null;

    if (Buffer.isBuffer(input)) {
      buffer = input;
    } else if (typeof input === "string") {
      if (input.startsWith("http")) {
        // fetch remote URL into buffer
        const res = await fetch(input);
        const arr = await res.arrayBuffer();
        buffer = Buffer.from(arr);
      } else if (fs.existsSync(input)) {
        buffer = fs.readFileSync(input);
      } else {
        // Not a valid path or URL
        return "";
      }
    } else {
      return "";
    }

    const data = await pdf(buffer);

    const text = data.text ? data.text.toLowerCase() : "";

    if (!text || text.trim().length < 80) {
      // If we had a local file path, try pdftotext fallback
      // write a temp file when buffer was used
      if (!Buffer.isBuffer(input) && typeof input === "string" && fs.existsSync(input)) {
        const pdftxt = await tryPdftotext(input);
        if (pdftxt && pdftxt.trim().length > text.trim().length) {
          return pdftxt;
        }
      }
    }

    return text;
  } catch (error) {
    console.error("PDF Parse Error:", error.message);
    return "";
  }
};