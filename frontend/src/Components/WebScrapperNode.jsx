import { Handle, Position } from "@xyflow/react";
import { useState } from "react";

const webScrapperApi = "http://127.0.0.1:5000/scrap";

export default function WebScrapperNode() {
  const [url, setUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false);

  const handle_input = async (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url }),
    };
    const response = await fetch(webScrapperApi, options);
    if (response.status !== 200) {
      setIsValidUrl(false);
      return;
    }
    setIsValidUrl(true);
    const content = response.json.urlContent;
  };

  return (
    <>
      <div className="Node" id="webScrapperNode">
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
