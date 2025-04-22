"use client";

import PdfUploader from "@/src/components/PdfUploader";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="z-10 w-full max-w-5xl flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8 text-center">PDF Viewer</h1>
        <PdfUploader />
      </div>
    </main>
  );
}
