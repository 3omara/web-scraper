import {
  Handle,
  Position,
  useNodesData,
  useHandleConnections,
} from "@xyflow/react";
import { useEffect, useState } from "react";
import { stream_reader } from "../helpers";

const summaryUrl = "https://web-scraper-backend-lac.vercel.app/summarize";
const default_summary = "Waiting for content to summarize...";
export default function SummaryNode({}) {
  const [summary, setSummary] = useState(default_summary);
  const [content, setContent] = useState("");
  const [subscribedNode, setSubscribedNode] = useState();

  useHandleConnections({
    type: "target",
    onDisconnect: () => setSubscribedNode(""),
    onConnect: (connection) => setSubscribedNode(connection[0].source),
  });
  const nodeData = useNodesData(subscribedNode);

  useEffect(() => {
    if (nodeData != null) {
      nodeData.data.setcontent = setContent;
    }
  }, [nodeData]);

  useEffect(() => {
    const fetch_summary = async () => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      };
      const response = await fetch(summaryUrl, options);
      if (response.status !== 200) {
        setSummary("Nothing to summarize.")
      } else {
        let result = await stream_reader(response)
        setSummary(result.replace(/[^a-zA-Z0-9,. ]/g, "").slice(7, -2))
      }
    };
    if(content !== ""){
      fetch_summary();
    }
  }, [content]);

  return (
    <div className="Node" id="summaryNode">
      <h2>Summary</h2>
      <Handle type="target" position={Position.Left} />
      <div className="verticalContainer">
        <label htmlFor="text">Website Summary:</label>
        <textarea
          disabled
          value={nodeData === null ? "No Webscraper node connected." : summary}
        />
      </div>
    </div>
  );
}
