import React, {useState, useEffect} from 'react'

const StockList = () => {
    const [stock , setSTock ]  = useState([])
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"])



    //there is a possibility when we use use=Effect our component gets unmounted 
    useEffect(()=>{
      let isMounted = true;
        const fetchData= async()=>{
         
            try
            {
              const responses = await Promise.all(watchList.map(stock=>{
                return {responses:fetch(`https://finnhub.io/api/v1/quote?symbol=${stock}&token=${import.meta.env.VITE_API_KEY}`),
                
                   }
              }))
              /* const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=MSFT&token=${import.meta.env.VITE_API_KEY}`)
            
              console.log(data) */
              const data = await Promise.all(responses.map(response=>{
               return  response.responses
              }))
              console.log(data)
             if(isMounted){
                setSTock(data)
              } 
            }catch(error){
              console.log(error.message)
            }
           
        }
        //when use promise.all you provide a list of promise and it will try revolving all of them at once 
        fetchData()
        return ()=>{isMounted=false}
    },[])

  return (
    <div>StockList</div>
  )
}

export default StockList