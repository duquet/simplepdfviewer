"use client";

import { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import PDFWorker from "./PDFWorker";

export default function PdfUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      setError(null);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      if (files[0].type === "application/pdf") {
        setFile(files[0]);
        setError(null);
      } else {
        setError("Please upload a PDF file");
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("Error loading PDF:", error);
    setError("Error loading PDF. Please try another file.");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <PDFWorker />

      <div
        className={`w-full p-8 border-2 border-dashed rounded-lg mb-8 text-center cursor-pointer ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="application/pdf"
          onChange={onFileChange}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex flex-col items-center justify-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4h-8m-12 0H8m12 0a4 4 0 01-4-4v-4m32 0v-4a4 4 0 00-4-4h-8"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop a PDF file here, or click to select
            </p>
            {file && (
              <p className="mt-2 text-sm text-green-600">
                Selected file: {file.name}
              </p>
            )}
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
        </label>
      </div>

      {file && !error && (
        <div className="pdf-container">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<div className="text-center">Loading PDF...</div>}
          >
            {numPages > 0 && (
              <Page
                pageNumber={pageNumber}
                loading={<div className="text-center">Loading page...</div>}
              />
            )}
          </Document>
          {numPages > 0 && (
            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                disabled={pageNumber <= 1}
                onClick={() => setPageNumber(pageNumber - 1)}
              >
                Previous
              </button>
              <span>
                Page {pageNumber} of {numPages}
              </span>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                disabled={pageNumber >= numPages}
                onClick={() => setPageNumber(pageNumber + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
