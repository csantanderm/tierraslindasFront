import APIrequest from "./config/axios.config"


export function getAllFamilies(){
    return APIrequest.get("/families")
}

export function createFamily(newFamily){
    return APIrequest.post("/families/new",{body: newFamily})
}

export function deleteFamily(id){
    return APIrequest.delete("/families/"+id)
}

export function getFamilyById(id){
    return APIrequest.get("/families/"+id)
}

export function editFamily(family){
    return APIrequest.put("families/"+family.family_id, {body:family }) 
}

