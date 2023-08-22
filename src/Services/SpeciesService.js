import APIrequest from "./config/axios.config"

export function createSpecies(newSpecies){
    return APIrequest.post("/species/new",{body: newSpecies})
}

export function getAllSpecies(){
    return APIrequest.get("/species")
}

export function getVisibleSpecies(){
    return APIrequest("/species/visible")
}

export function deleteSpecies(id){
    return APIrequest.delete("/species/"+id)
}

export function getSpeciesById(id){
    return APIrequest.get("/species/"+id)
}

export function editSpecies(species,id){
    return APIrequest.put("/species/"+id,{body: species}) 
}

