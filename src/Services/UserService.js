import APIrequest from "./config/axios.config"

export function getUser(user, pass){
    return APIrequest.get("/user/"+user+"/"+pass)

}