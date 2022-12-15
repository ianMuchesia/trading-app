import React, { useEffect, useState } from 'react'
import finnhub from '../apis/finnhub'

const StockData = ({symbol}) => {
const [stockData , setStockData ] = useState([])

useEffect(()=>{
    let isMounted = true;
    const fetchData=async()=>{
        try{
            const response = await finnhub.get("/stock/profile2",{
                params:{
                    symbol
                }
            })
            console.log(response)
            if(isMounted){
                setStockData(response.data)
            }
        }catch(error){
            console.log(error.message)
        }
    }
    fetchData()
    return ()=>{isMounted = false}
},[symbol])
  return (
    <div>
        {
            stockData && (
                
                    <div className='border bg-white rounded shadow-sm p-4 mt-5 grid md:grid-cols-3'>
                        <div>
                            <div><span className='font-bold'>name: {stockData.name}
                                </span></div>
                        </div>
                        <div><span 
                        className='font-bold'>country:{stockData.country}
                                </span></div>
                                <div><span className='font-bold'>ticker:{stockData.ticker}
                                </span></div>
                        <div>
                        <div><span className='font-bold'>Exchange:{stockData.exchange}

                                </span></div>
                        </div>
                        <div><span className='font-bold'>Industry:{stockData.finnhubIndustry}
                                </span></div>
                                <div><span className='font-bold'>IPO:{stockData.ipo}
                                </span></div>
                        <div>
                        <div><span className='font-bold'>MarketCap:{stockData.marketCapitalization}
                                </span></div>
                                <div><span className='font-bold'>Shares Outstanding:{stockData.shareOustanding}
                                </span></div>
                                <div><a href={stockData.weburl} className='font-bold'>url:{stockData.weburl}
                                </a></div>
                        </div>
                    </div>
                
            )
        }
    </div>
  )
}

export default StockData