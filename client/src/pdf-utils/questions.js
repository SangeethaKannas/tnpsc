import React, { useEffect, useState } from "react";

import PdfViewer from "./pdf-viewer";
import Topics from "./topics";

const Questions = ({ topics, questionPapers }) => {
  const [pageIndex, setPageIndex] = useState(null);
  const [pagesList, setPagesList] = useState(null);
  const [questionPapersList, setQuestionPapersList] = useState([]);
  const [questionPapersIndex, setQuestionPapersIndex] = useState(0);
  const [file, setFile] = useState(null);

  const extractPages = pagesList =>
    pagesList.reduce((acc, page) => {
      acc.push(page.pageNumber);
      return acc;
    }, []);

  function loadFirstFile(questionPapers) {
    setFile(questionPapers[0].fileName);
    setQuestionPapersIndex(0);
  }

  function showFirstPage(questionPapersList, index = 0) {
    setPagesList(extractPages(questionPapersList[index].pages));
    setPageIndex(0);
  }

  useEffect(() => {
    setQuestionPapersList(questionPapers);
    loadFirstFile(questionPapers);
    showFirstPage(questionPapers, 0);
  }, questionPapers);

  function onDocumentLoadSuccess() {}

  function extractQuestionPapers(topicName) {
    const selectedTopics = topicName ? [topicName] : [...topics];
    const filteredQnPaper = questionPapers.map((qnPaper) => {
      qnPaper.pages = qnPaper.pages.filter((page) =>
        page.tags.some((tag) => selectedTopics.includes(tag))
      );
      return qnPaper;
    });

    return filteredQnPaper;
  }

  const selectTopic = (event) => {
    const questionPapersList = extractQuestionPapers(event.target.value);
    setQuestionPapersList(questionPapersList);
    loadFirstFile(questionPapersList);
    showFirstPage(questionPapersList, 0);
  };

  function changePage(direction) {
    const nextPage = pageIndex + direction * 1;
    // Load next page until last page
    // else load next question paper
    if (nextPage < pagesList.length) {
      setPageIndex(nextPage);
    } else if (questionPapersIndex < questionPapersList.length) {      
      setFile(questionPapersList[questionPapersIndex + 1].fileName);
      showFirstPage(questionPapersList, questionPapersIndex + 1);
      setQuestionPapersIndex(questionPapersIndex + 1);
    }
  }

  function prevPage() {
    changePage(-1);
  }
  function nextPage() {
    changePage(1);
  }

  function onItemClick({ pageNumber: itemPageNumber }) {}

  return (
    <>
    <Topics selectTopic={selectTopic} topics={topics} />
    { 
      <section className="container">     
        <button
          type="button"
          className="nav-button"
          disabled={pageIndex <= 0}
          onClick={prevPage}
        >
          Previous
        </button>
        {
          file && 
          <PdfViewer
            fileName={file}
            onDocumentLoadSuccess={onDocumentLoadSuccess}
            onItemClick={onItemClick}
            pageNumber={pagesList[pageIndex]}
            //onRenderSuccess={onRenderSuccess}
          ></PdfViewer>
        }
        <button
          type="button"
          className="nav-button"
          disabled={            
              questionPapersIndex === questionPapersList.length - 1 && 
              pageIndex === pagesList.length - 1            
          }          
          onClick={nextPage}
        >
          Next 
        </button>
      </section>
      }
    </>
  );
};

export default Questions;
