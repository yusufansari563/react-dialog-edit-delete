import { useEffect, useState } from "react";
import "./styles.css";
import json from "./data.json";
import Card from "./component/card";

export default function App() {
  const [list, setList] = useState(json.list);

  return (
    <div className="App">
      <h2 style={{ marginTop: "3rem", marginBottom: "2rem" }}>lorem ipsum</h2>
      <Card list={list} setList={setList} />
    </div>
  );
}
