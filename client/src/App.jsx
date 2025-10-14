import {BrowserRouter, Routes, Route} from "react-router-dom"

import Panel from "./pages/Panel"
import Start from "./pages/Start"
import Archives from "./pages/Archives"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/panel" element={<Panel />} />
        <Route path="/archives" element={<Archives />} />
        <Route path="/start/:id" element={<Start />} />
        <Route path="/" element={<Panel />} />
      </Routes>
    </BrowserRouter>
  )
}