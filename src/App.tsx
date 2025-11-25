import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./Index";
import DocsPage from "./pages/docs";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/docs" element={<DocsPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
