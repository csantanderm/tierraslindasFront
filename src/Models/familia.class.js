

export default class Familia{

    family_id
    name
    description

    constructor(){
        this.family_id = ""
        this.name = ""
        this.description = ""
    }

    setData(data){
        this.family_id = data.family_id
        this.name = data.name
        this.description = data.description
    }


}