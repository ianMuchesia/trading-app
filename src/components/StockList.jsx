import React, {useState, useEffect} from 'react'

const StockList = () => {

    const [watchList, setWatchList] = useState(["GOOGLE", "MSFT", "AMZN"])
    useEffect(()=>{
        const fetchData= async()=>{

            const response = await fetch("https://finnhub.io/api/v1/quote?symbol=MSFT&token=ccq5kriad3i4o9irpul0ccq5kriad3i4o9irpulg")
            const data = await response.json()
            console.log(data)
        }
        fetchData()
    },[])

  return (
    <div>StockList</div>
  )
}

export default StockList