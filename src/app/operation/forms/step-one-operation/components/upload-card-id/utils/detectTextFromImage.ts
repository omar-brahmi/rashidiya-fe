import {createWorker, OEM, PSM, Worker} from 'tesseract.js';

let worker: Worker | null = null;

// Initialize Tesseract worker once and reuse it
async function initializeWorker() {
  if (!worker) {
    worker = await createWorker();
    await worker.loadLanguage('eng+ara');
    await worker.initialize('eng+ara');
    // Set the worker to prioritize speed over accuracy
    await worker.setParameters({
      tessedit_ocr_engine_mode: OEM.LSTM_ONLY,
      tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
      preserve_interword_spaces: "1",
      user_defined_dpi: "300", // Optimized DPI for text clarity
      tessjs_create_hocr: "0", // Disable HOCR output for speed
      tessjs_create_tsv: "0",  // Disable TSV output for speed
      tessjs_create_box: "0",  // Disable box output for speed
      tessjs_create_unlv: "0", // Disable UNLV output for speed
      tessjs_create_osd: "0",  // Disable OSD output for speed
    });
  }
}

export async function detectTextFromImage(base64Image: string): Promise<{
  cardID: string,
  firstName: string,
  lastname: string
}> {
  await initializeWorker();
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = base64Image;

    image.onload = async () => {
      try {
        // Reduce image size to speed up OCR without much accuracy loss
        const MAX_WIDTH = 800; // Set a max width for resizing
        const scaleFactor = Math.min(1, MAX_WIDTH / image.width);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error("Canvas context not available"));
          return;
        }

        // Set canvas dimensions based on scale factor
        canvas.width = image.width * scaleFactor;
        canvas.height = image.height * scaleFactor;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Convert the canvas to a data URL for OCR
        const imageDataUrl = canvas.toDataURL('image/jpeg');

        // Recognize text using Tesseract worker
        const {data: {text}} = await worker!.recognize(imageDataUrl, {
          rotateAuto: true
        });

        resolve({
          cardID: extractIdNumber(text),
          ...extractName(text) || {firstName: "", lastname: ""}
        });
      } catch (error) {
        reject(`OCR Error: ${error}`);
      }
    };

    image.onerror = (error) => reject(error);
  });
}

export function extractIdNumber(text: string): string {
  const idRegex = /\d{3}-\d{4}-\d{7}-\d{1}/;
  const match = text.match(idRegex);
  return match ? match[0] : "ID not found";
}

export function extractName(text: string): { firstName: string, lastname: string } | null {
  const match = text.match(/Name[:\s]+([A-Za-z]+)\s+([A-Za-z]+)/i);
  if (match) {
    return {firstName: match[1], lastname: match[2]};
  }
  return null;
}

// Terminate the worker when it's no longer needed
export async function terminateWorker() {
  if (worker) {
    await worker.terminate();
    worker = null;
  }
}
