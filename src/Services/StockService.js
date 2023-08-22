import APIrequest from "./config/axios.config"

export function createStock(newStock){
    console.log(newStock)
    return APIrequest.post("/stocks/new",{body: newStock})
}

export function getAllStocksById(id){
    return APIrequest.get("/stocks/"+id)
}

export function deleteStock(id){
    return APIrequest.delete("/stocks/"+id)
} 

export function editStock(stock){
    console.log(stock)
    return APIrequest.put("/stocks/"+stock.stock_id,{body: stock}) 
}