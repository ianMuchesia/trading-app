import {BrowserRouter, Routes, Route } from "react-router-dom"
import StockDetail from "./pages/StockDetail"
import StockOverView from "./pages/StockOverView"
import  WatchListContextProvider  from "./context/WatchListContext"
import "./App.css"
export default function App() {
  return (
    <WatchListContextProvider>
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<StockOverView/>}/>
      <Route path="/detail/:symbol" element={<StockDetail/>}/>

    </Routes>
   </BrowserRouter>
   </WatchListContextProvider>
  )
}