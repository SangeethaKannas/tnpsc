import React, {useState} from "react";

import { Document, Outline, Page } from "react-pdf/dist/esm/entry.webpack";

const PdfViewer = ({
  fileName,
  onDocumentLoadSuccess,
  onItemClick,
  pageNumber,
}) => {
  function onRenderSuccess() {}

  const COMMON_FILE_PATH = 'http://localhost:3000/pdf-files/';

  const OPTIONS = {
    cMapUrl: "cmaps/",
    cMapPacked: true,
  };

  return (
    <>
      {fileName && fileName.length > 1 && <div>
        <article className="document-article">
          <Document 
            file={COMMON_FILE_PATH + fileName}
            onLoadSuccess={onDocumentLoadSuccess}
            options={OPTIONS}
            >
            <Outline onItemClick={onItemClick} />
            <Page
              pageNumber={pageNumber || 1}
              onRenderSuccess={onRenderSuccess}
            />
          </Document>
        </article>
        <article id="secondary-document"></article>
      </div>
      }
    </>
  );
};

export default PdfViewer;
