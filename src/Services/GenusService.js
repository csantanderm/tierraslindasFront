import APIrequest from "./config/axios.config"

export function getAllGenus(){
    return APIrequest.get("/genus")
}

export function createGenus(newGenus){
    return APIrequest.post("/genus/new",{body: newGenus})
}

export function deleteGenus(id){
    return APIrequest.delete("/genus/"+id)
}

export function getGenusById(id){
    return APIrequest.get("/genus/"+id)
}

export function editGenus(genus){
    console.log(genus)
    return APIrequest.put("genus/"+genus.genus_id, {body:genus }) 
}

