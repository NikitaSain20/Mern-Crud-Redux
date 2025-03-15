import "./App.css";
import Crud from "./Components/Crud";
import ContextReducer from "./Components/ContextReducer";
// import { useState } from "react";
export const apiUrl = process.env.REACT_APP_API_URL;
function App() {
  return (
    <>
      <ContextReducer>
        <Crud />
      </ContextReducer>
    </>
  );
}

export default App;
