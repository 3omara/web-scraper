export default function Menu({ setType }) {
  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "webScraper")}
        draggable
      >
        Web Scrapper
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "summary")}
        draggable
      >
        Summary
      </div>
      <footer>
        For more information, visit: <a href = "https://github.com/3omara/web-scrapper.git"><em>Github Repository</em></a>
      </footer>
    </aside>
  );
}
