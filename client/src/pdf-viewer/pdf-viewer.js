import React, { useMemo, useState } from "react";

import { Document, Outline, pdfjs } from "react-pdf/dist/esm/entry.webpack";
import { Page } from "react-pdf";
//pdfjs.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js'

function highlightPattern(text = '', pattern = '') {
  const splitText = text.split(pattern);

  if (splitText.length <= 1) {
    return text;
  }

  const matches = text.match(pattern);

  return splitText.reduce(
    (arr, element, index) =>
      matches[index]
        ? [...arr, element, <mark key={index}>{matches[index]}</mark>]
        : [...arr, element],
    []
  );
}

const PdfViewer = ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState('');

//   const textRenderer = useMemo((textItem) => {
//       console.log(textItem);
//     return highlightPattern(textItem.str, searchText);
//   }, [searchText]);

  function onChange(event) {
    setSearchText(event.target.value);
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function onItemClick({ pageNumber: itemPageNumber }) {
    setPageNumber(itemPageNumber);
  }

  return (
    <>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Outline onItemClick={onItemClick} />
        <Page pageNumber={pageNumber || 1} />
      </Document>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
        <div>
            <label htmlFor="search">Search:</label>
            <input type="search" id="search" onKeyPress={onChange} />
        </div>
      </div>
    </>
  );
};

export default PdfViewer;
