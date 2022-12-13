import {BrowserRouter, Routes, Route } from "react-router-dom"
import StockDetail from "./pages/StockDetail"
import StockOverView from "./pages/StockOverView"
export default function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<StockOverView/>}/>
      <Route path="/detail/:symbol" element={<StockDetail/>}/>

    </Routes>
   </BrowserRouter>
  )
}