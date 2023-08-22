import { FAMILIES } from "./Families.enum"

export class species{

    name = ""
    cientificName = ""
    description = ""
    irrigation = ""
    minTemperature = ""
    family = FAMILIES.UNDEFINED

    constructor(name, cientificName, description, irrigation, minTemperature, family){
        this.name = name
        this.cientificName = cientificName
        this.description = description
        this.irrigation = irrigation
        this.minTemperature = minTemperature
        this.family = family
    }

}