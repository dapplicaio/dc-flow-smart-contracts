//import DarkCountry from "../../contracts/DarkCountry.cdc"

// for tests only
import DarkCountry from "0xDarkCountry"

// This script returns an array of all the created Item Templates

// Returns: [DarkCountry.ItemTemplate]
// array of all Item Templates created for DarkCountry items

pub fun main(): [DarkCountry.ItemTemplate] {

    return DarkCountry.getAllItemTemplates()
}
