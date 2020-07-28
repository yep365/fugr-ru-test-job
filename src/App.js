import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { CellField, Header, Footer } from "./components";

function App() {
  const { selectedRow } = useSelector(({ cell }) => cell);

  useEffect(() => {
    if (selectedRow !== null) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [selectedRow]);
  return (
    <div className="wrapper">
      <Header />
      <CellField />
      <Footer />
    </div>
  );
}

export default App;
