import { useState } from "react";
import expand_img from "../assets/expand.png"
import collapse_img from "../assets/collapse.png"

export default function Menu({ setType }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <>
      {!isExpanded ? (
        <aside style={{height:"fit-content", width:"fit-content"}}>
          <input
            type="image"
            src={expand_img}
            alt="collapse"
            onClick={() => setIsExpanded(true)}
          />
        </aside>
      ) : (
        <aside>
          <input
            type="image"
            src={collapse_img}
            alt="collapse"
            onClick={() => setIsExpanded(false)}
          />
          <div className="description">
            You can drag these nodes to the pane on the right.
          </div>
          <div
            className="dndnode"
            onDragStart={(event) => onDragStart(event, "webScraper")}
            draggable
          >
            Web Scraper
          </div>
          <div
            className="dndnode"
            onDragStart={(event) => onDragStart(event, "summary")}
            draggable
          >
            Summary
          </div>
          <footer>
            For more information, visit:{" "}
            <a href="https://github.com/3omara/web-scrapper.git">
              <em>Github Repository</em>
            </a>
          </footer>
        </aside>
      )}
    </>
  );
}
