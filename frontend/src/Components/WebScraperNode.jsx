import { Handle, Position, useHandleConnections } from "@xyflow/react";
import { useEffect, useState } from "react";
import { stream_reader } from "../helpers";

const webScrapperUrl = "http://127.0.0.1:5000/scrape";

export default function WebScraperNode({ data }) {
  const [url, setUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [content, setContent] = useState("");
  const update_listener = () => {
    if (data.setcontent !== undefined && data.content !== undefined && data.content !== "") {
      data.setcontent(data.content);
    }
  };

  const handle_input = async (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    };
    const response = await fetch(webScrapperUrl, options);
    if (response.status !== 200) {
      setIsValidUrl(false);
      return;
    }
    setIsValidUrl(true);
    data.content = await stream_reader(response);
    setContent(data.content);
  };

  useHandleConnections({
    type: "source",
    onConnect: () => setTimeout(() => update_listener(), 1000),
    onDisconnect: () => delete data.setContent,
  });

  useEffect(() => {
    update_listener();
  }, [content]);

  return (
    <>
      <div className="Node" id="webScraperNode">
        <h2>Web Scrapper</h2>
        <Handle type="source" position={Position.Right} />
        <form onSubmit={handle_input}>
          <div className="horizontalContainer">
            <label htmlFor="text" style={{ paddingRight: "10px" }}>
              URL:
            </label>
            <input
              id="text"
              name="text"
              onChange={(e) => setUrl(e.target.value)}
              className="nodrag"
              style={{
                borderColor: isValidUrl ? "green" : "red",
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
}
