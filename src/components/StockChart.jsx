import React, { useState } from 'react'
import Chart from 'react-apexcharts'
import StockData from './StockData'
const StockChart = ({chartData, symbol}) => {
    const {day, week, year } = chartData 
    const [ dateFormat , setDateFormat ] = useState([])


    const determineTimeFormat = ()=>{
        switch(dateFormat){
            case "24h":
                return day
            case "7d":
                return week
            case "1y":
                return year
            default:
                return day

        }
    }

    //logic for color which is a bit tricky
    
    const color = determineTimeFormat() !== undefined? determineTimeFormat()[determineTimeFormat().length-1].y-determineTimeFormat()[0].y > 0? "#26C281" : "#ed3419" : "#26C281"
    const options = {
        //colors is a bit trcky, add it last
        colors:[color],
        title:{
            text: symbol,
            align: "center",
            style: {
                fontSize: "24px"
            }
        },
        chart:{
            id: "stock data",
            animations: {
                speed: 1300
            }
        },
        xaxis: {
            type:"datetime",
            labels: {
                datetimeUTC: false
            }
        },
        tooltip:{
            x:{
                format: "MMM dd HH:MM"
            }
        }
    }

  
 
    const series = [{
        name: symbol,
        data: determineTimeFormat() !== undefined? determineTimeFormat(): [],
    }]
    const renderButtonSelect =(btn)=>{
         const classes = " m-2 p-3"
         if (btn == dateFormat){
            return classes + " bg-blue-800"
         }else{
            return classes + " border-2 border-blue-800"
         }
    }
   
  return (
    <div style={{backgroundColor: "rgba(145,158,171,0.04)"}} className="my-5 p-4 shadow-sm ">
        <Chart options={options} series= {series} type="area" width= "100%"/>
        <div>
            <button onClick={()=>setDateFormat("24h")} className={renderButtonSelect('24h')}>24h</button>
            <button onClick={()=>setDateFormat("7d")} className={renderButtonSelect('7d')}>7d</button>
            <button onClick={()=>setDateFormat("1y")} className={renderButtonSelect('1y')}>1y</button>
        </div>
        
    </div>
  )
}

export default StockChart