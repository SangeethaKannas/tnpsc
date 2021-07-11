import React from "react";

const Topics = ({ topics, selectTopic }) => {
  return (
    <>
      <article>
        <ul className="topics">
          {topics.map((topic) => (
            <li key={topic.name}>
              <button
                onClick={selectTopic}
                value={topic.name}
                className="topic"
              >
                {topic.name}
              </button>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
};

export default Topics;
