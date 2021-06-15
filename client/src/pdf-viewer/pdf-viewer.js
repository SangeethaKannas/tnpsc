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
  
  const [pageNumber, setPageNumber] = useState(3);
  const [pagesList, setPagesList] = useState([0, 1]);
  // const [searchText, setSearchText] = useState("");

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

    // mainCanvas = document.getElementsByClassName(
    //   "react-pdf__Page__canvas"
    // )[0];
    // var imageContentRaw = mainCanvas
    //     .getContext("2d")
    //   .getImageData(x, y, desiredWidth, desiredHeight);

    // secondaryDocument = document.getElementById("secondary-document");
    // secondaryDocument.innerHTML = '<canvas id="dtemp"></canvas>';

    // let secondaryCanvas = document.getElementById("dtemp");
    // let secondaryCanvas_Context = secondaryCanvas.getContext("2d");
    // secondaryCanvas_Context.canvas.width = desiredWidth;
    // secondaryCanvas_Context.canvas.height = desiredHeight;
    // secondaryCanvas.getContext("2d").putImageData(imageContentRaw, 0, 0);
  }

  function onDocumentLoadSuccess({ numPages }) {    
    setPagesList(extractPages(["1-" + (numPages - 1)]));
    setTimeout(modifyCanvas, 1000);
  }

  function onRenderSuccess() {
    let mainCanvas = document.getElementsByClassName(
      "react-pdf__Page__canvas"
    )[0];
    if (mainCanvas.style.display === "block") {
      // mainCanvas.style.display = 'none';
    }
    setTimeout(modifyCanvas, 500);
  }

  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );

  function extractPages(pagesList) {
    const pageSequence = [];

    for (let page in pagesList) {
      if (pagesList[page].indexOf("-") > -1) {
        pageSequence.push(
          ...range(
            Number(pagesList[page].split("-")[0]),
            Number(pagesList[page].split("-")[1]),
            1
          )
        );
      } else {
        pageSequence.push(pagesList[page]);
      }
    }
    console.log(pageSequence);
    return pageSequence;
  }

  function changePage(direction) {
    //TODO: Make sure the pages are from pagesList
    const nextPage = pageNumber + direction * 1;
    if (nextPage < pagesList[pagesList.length - 1] || nextPage > 1) {
      setPageNumber(nextPage);
    }
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

  //const topics = ['Maths', 'Science', 'History', 'Geography', 'தமிழ் வரலாறு', 'Economics', 'Polity'];

  const topics = [
    {
      name: "Maths",
      tags: ["a", "b", "c"],
      pages: ["89-100"],
      questionnumbers: [],
    },
    {
      name: "Polity",
      tags: ["a", "b", "c"],
      pages: ["81-82"],
      questionnumbers: [],
    },
    {
      name: "Physics",
      tags: ["a", "b", "c"],
      pages: ["89-100"],
      questionnumbers: [],
    },
  ];

  const selectTopic = (event) => {
    setPagesList(extractPages(event.target.value.split(",")));

    let currentPageList = event.target.value.split(",");
    let currentPageNumber = 1;
    if (currentPageList[0].indexOf("-") > -1) {
      currentPageNumber = Number(currentPageList[0].split("-")[0]);
    } else {
      currentPageNumber = Number(currentPageList[0]);
    }
    setPageNumber(currentPageNumber);
  };

  return (
    <>
      <section className="container">
        <button
          type="button"
          disabled={pageNumber <= pagesList[0]}
          onClick={previousPage}
        >
          Previous
        </button>
        <article>
          <ul className="topics">
            {topics.map((topic) => (
              <li key={topic.name}>
                <button
                  onClick={selectTopic}
                  value={topic.pages}
                  className="topic"
                >
                  {topic.name}
                </button>
              </li>
            ))}
          </ul>
        </article>
        <div>
          <article className="document-article">
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
              <Outline onItemClick={onItemClick} />
              <Page
                pageNumber={pageNumber || 2}
                onRenderSuccess={onRenderSuccess}
              />
            </Document>
          </article>
          <article id="secondary-document"></article>
        </div>
        <button
          type="button"
          disabled={pageNumber >= pagesList[pagesList.length - 1]}
          onClick={nextPage}
        >
          Next
        </button>
      </section>
    </>
  );
};

export default PdfViewer;
