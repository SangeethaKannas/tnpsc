import React, { useMemo, useState } from "react";

import { Document, Outline, pdfjs } from "react-pdf/dist/esm/entry.webpack";
import { Page } from "react-pdf";
//pdfjs.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js'

import Search from "./Search";

function highlightPattern(text = "", pattern = "") {
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
  const [pageNumber, setPageNumber] = useState(3);
  const [pagesList, setPagesList] = useState([]);
  const [searchText, setSearchText] = useState("");

  //   const textRenderer = useMemo((textItem) => {
  //       console.log(textItem);
  //     return highlightPattern(textItem.str, searchText);
  //   }, [searchText]);
  //
  //   function onChange(event) {
  //     setSearchText(event.target.value);
  //   }

  function modifyCanvas() {
    const x = 33;
    const y = 40;
    const desiredWidth = 600;
    const desiredHeight = 500;
    let mainCanvas = null;
    let secondaryDocument = null;

    mainCanvas = document.getElementsByClassName(
      "react-pdf__Page__canvas"
    )[0];
    var imageContentRaw = mainCanvas
        .getContext("2d")
      .getImageData(x, y, desiredWidth, desiredHeight);

    secondaryDocument = document.getElementById("secondary-document");
    secondaryDocument.innerHTML = '<canvas id="dtemp"></canvas>';

    let secondaryCanvas = document.getElementById("dtemp");
    let secondaryCanvas_Context = secondaryCanvas.getContext("2d");
    secondaryCanvas_Context.canvas.width = desiredWidth;
    secondaryCanvas_Context.canvas.height = desiredHeight;
    secondaryCanvas.getContext("2d").putImageData(imageContentRaw, 0, 0);
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPagesList([0, numPages - 1]);
    setTimeout(modifyCanvas, 1000);
  }

  function onRenderSuccess () {
    let mainCanvas = document.getElementsByClassName(
      "react-pdf__Page__canvas"
    )[0];
    if(mainCanvas.style.display === 'block') {
      mainCanvas.style.display = 'none';
    }
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
    modifyCanvas();
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

  const topics = [
    {
      name:'Maths',
      tags: ['a','b','c'],
      pages: '89-100',
      questionnumbers: []
    }
  ];

  function selectTopic(topic) {
    //setNumPages(topic.pages)
  }

  return (
    <>
      <section className="container">
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <article>
          <ul className="topics">
            {
              topics.map(
                topic => 
                  <li key={topic.name} onClick={selectTopic(topic)}>
                    {topic.name}
                  </li>
              )
            }
          </ul>
        </article>
        <div>
          <article className="document-article">
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
              <Outline onItemClick={onItemClick} />
              <Page pageNumber={pageNumber || 2} onRenderSuccess={onRenderSuccess} />
            </Document>
          </article>
          <article id="secondary-document"></article>
        </div>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </section>
    </>
  );
};

export default PdfViewer;
