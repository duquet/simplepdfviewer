"use client";

import { pdfjs } from "react-pdf";

export default function PDFWorker() {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";
  return null;
}
