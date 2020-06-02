import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";

export default function Home() {
  console.log("API IS", process.env.REACT_APP_BACKEND);
  return (
    <Base title="Home">
      <h1 className="text-white">hello this is the home screen {API}</h1>
    </Base>
  );
}
