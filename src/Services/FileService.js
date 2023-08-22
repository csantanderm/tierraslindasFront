import APIrequestData from "./config/axios.fileconfig"


export function uploadImg(formData){
    console.log(formData)
    return APIrequestData.post("/image",{body: formData})
    
}
