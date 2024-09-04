import { useState } from "react";
import Canvas from "./Components/Canvas";
import Menu from "./Components/Menu";
import "./css/Style.css";

function App() {
  const [type, setType] = useState();
  return (
    <>
      <Canvas type={type} />
      <Menu setType={setType} />
    </>
  );
}

export default App;
