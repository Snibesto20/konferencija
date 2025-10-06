import {BrowserRouter, Routes, Route} from "react-router-dom"

import Panel from "./pages/Panel"
import Start from "./pages/Start"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/panel" element={<Panel />} />
        <Route path="/start/:id" element={<Start />} />
        <Route path="/" element={<Panel />} />
      </Routes>
    </BrowserRouter>
  )
}