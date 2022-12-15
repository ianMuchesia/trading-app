import { data } from 'autoprefixer'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import finnhub from '../apis/finnhub'
import StockChart from '../components/StockChart'
import StockData from '../components/StockData'



const formatData = (data ) =>{
  return data.t.map((el,index)=>{
        return{
          x:el *1000,
          //we have to get the corresponding y value for the first item in the t array we want the first item in the c array. wherever the index we are on just grab the same we are on the c 
          y:Math.floor(data.c[index])

          //math floor added later to remove the decimal points
        }
  })
}
const StockDetail = () => {
  const {symbol} = useParams()
  const [chartData, setChartData ] = useState([])



  useEffect(()=>{
    const fetchData = async()=>{
     try{
      const date = new Date()
      //beacause the api expecs time in seconds while our method gives us time in milliseconds
      const currentTime = Math.floor(date.getTime()/1000)
      //one day ago
      
      //but there is an issue stock market close on weekends . so it may lead to some issues
      let oneDay;
      if(date.getDay()===6){
        //saturday
        oneDay = currentTime - 2*24*60*60;
      }
      else if(date.getDay()===0){
        //sunday
        oneDay = currentTime - 3*24*60*60;
      }
      else{
        //other days
        oneDay = currentTime - 24*60*60;
      }
      const oneWeek = currentTime -7*24*60*60
      const oneYear = currentTime -24*60*60*365
      const responses = await Promise.all([
        finnhub.get("/stock/candle",{
          params:{
           symbol,
           from: oneDay,
           to: currentTime,
           resolution: 30,
          }
        })
        ,
        finnhub.get("/stock/candle",{
          params:{
           symbol,
           from: oneWeek,
           to: currentTime,
           resolution: 60,
          }
        })
        ,
        finnhub.get("/stock/candle",{
          params:{
           symbol,
           from: oneYear,        
           to: currentTime,
           resolution: "W",//data points
          }
        }) 

      ])
      /* const responseDay = await finnhub.get("/stock/candle",{
        params:{
         symbol,
         from: oneDay,
         to: currentTime,
         resolution: 30,
        }
      })
      const responseWeek = await finnhub.get("/stock/candle",{
        params:{
         symbol,
         from: oneWeek,
         to: currentTime,
         resolution: 60,
        }
      })
      const responseYear = await finnhub.get("/stock/candle",{
        params:{
         symbol,
         from: oneYear,        
         to: currentTime,
         resolution: "W",//data points
        }
      }) */


      /* console.log(responseDay)
      console.log(responseWeek)
      console.log(responseYear) */
      //t stands for time stamp us3e epoch converter to convert
      console.log(responses)
      setChartData({
        day: formatData(responses[0].data),
        week: formatData(responses[1].data),
        year: formatData(responses[2].data),
      })
    }catch(error){

    }

     }
      fetchData()

     }
   
  ,[symbol])

  return (
    <div>
      {chartData && (
        <div>
          <StockChart chartData={chartData} symbol={symbol}/>
          <StockData symbol={symbol}/>
        </div>
      )}

    </div>
  )
}

export default StockDetail