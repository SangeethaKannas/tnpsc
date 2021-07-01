import "./App.css";

import Questions from "./pdf-utils/questions";
import questionPapers from "./assets/json/question-papers.json";

function App() {
  const topics = [
    {
      name: "Maths",
      tags: ["Algebra", "HCF-LCM", "Sequences", "Maths"]
    },
    {
      name: "Polity",
      tags: ["Parts", "Schedules", "Amendments"]
      
    },
    {
      name: "Economics",
      tags: ["Demography", "Census"]
    },
    {
      name: "TN History",
      tags: ["Dravidian Politics"]
    },
    {
      name: "TN Illakiyam",
      tags: ["Thirukural"]
    },
    {
      name: "Physics",
      tags: ["Light"]
    }
  ];

  return (
    <div className="App">
      <Questions  topics={topics} questionPapers={questionPapers}/>
    </div>
  );
}

export default App;
