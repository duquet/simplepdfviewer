# PDF Viewer App

A Next.js application for viewing PDF files using react-pdf and pdfjs-dist.

## Setup and Installation

```bash
npm install
npm run dev
```

## Troubleshooting Common Issues

### 1. PDF.js Worker CORS Issues

Initially, we encountered CORS errors when trying to load the PDF.js worker from CDNs:

```
Access to script at 'https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.js' has been blocked by CORS policy
```

#### Solution: Use Local Worker File

Instead of loading from a CDN, we now serve the worker file locally:

1. Install specific version of pdfjs-dist:

```bash
npm install pdfjs-dist@4.8.69
```

2. Copy the worker file to public directory:

```bash
cp node_modules/pdfjs-dist/build/pdf.worker.min.mjs public/pdf.worker.js
```

Note: We renamed from `.mjs` to `.js` to avoid module-related issues.

3. Update PDFWorker component (`src/components/PDFWorker.tsx`):

```typescript
"use client";

import { pdfjs } from "react-pdf";

export default function PDFWorker() {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";
  return null;
}
```

### 2. Next.js Configuration

To properly handle PDF files and workers, update `next.config.ts`:

```typescript
import type { Configuration } from "webpack";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config: Configuration) => {
    config.resolve!.alias = {
      ...config.resolve?.alias,
      canvas: false,
    };
    // Enable loading of PDF files
    config.module!.rules!.push({
      test: /\.pdf$/,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
```

### 3. Version Compatibility

- Use specific versions to avoid compatibility issues:
  - `pdfjs-dist@4.8.69`
  - `react-pdf` (latest version compatible with your React version)

### 4. File Extensions

- The worker file should use `.js` extension instead of `.mjs` in production
- This avoids issues with ES modules in certain environments

### 5. Project Structure

```
pdf-viewer-app/
├── public/
│   └── pdf.worker.js        # Copied from pdfjs-dist
├── src/
│   └── components/
│       ├── PDFWorker.tsx    # Worker configuration
│       └── PdfUploader.tsx  # Main PDF viewer component
└── next.config.ts           # Webpack configuration
```

## Best Practices

1. **Local Worker File**: Always serve the PDF.js worker file locally instead of from a CDN
2. **Version Pinning**: Pin to specific versions of `pdfjs-dist` to avoid breaking changes
3. **File Extensions**: Use `.js` for the worker file in production
4. **Error Handling**: Implement proper error handling in the PDF viewer component

## Common Errors and Solutions

1. **CORS Errors**: Solved by serving worker file locally
2. **Module Loading Issues**: Solved by using `.js` extension
3. **Worker Setup Failed**: Usually indicates incorrect worker path or CORS issues
4. **Canvas Errors**: Handled by setting `canvas: false` in webpack config

## Development

```bash
# Install dependencies
npm install

# Copy worker file
cp node_modules/pdfjs-dist/build/pdf.worker.min.mjs public/pdf.worker.js

# Start development server
npm run dev
```

## Features

- Upload PDF files via file input
- Drag and drop PDF files
- View PDFs with pagination controls
- Responsive design

## Technologies Used

- Next.js
- React
- react-pdf
- Tailwind CSS

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. Drag and drop a PDF file onto the upload area, or click to select a file
2. The PDF will be displayed in the viewer
3. Use the Previous and Next buttons to navigate through multi-page PDFs

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [React-PDF Documentation](https://react-pdf.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
