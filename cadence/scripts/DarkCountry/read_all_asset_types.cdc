//import DarkCountry from "../../contracts/DarkCountry.cdc"

// for tests only
import DarkCountry from "0xDarkCountry"

// This script returns an array of all the created Asset Types

// Returns: [DarkCountry.AssetType]
// array of all Asset Types created for DarkCountry items

pub fun main(): [DarkCountry.AssetType] {

    return DarkCountry.getAllAssetTypes()
}
