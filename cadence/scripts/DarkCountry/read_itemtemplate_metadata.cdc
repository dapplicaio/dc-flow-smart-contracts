//import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
//import DarkCountry from "../../contracts/DarkCountry.cdc"

// for tests only
import NonFungibleToken from "0xNonFungibleToken"
import DarkCountry from "0xDarkCountry"

// This script returns the full metadata associated with an item template
// in the DarkCountry smart contract

// Parameters:
//
// itemTemplateID: The unique ID for the item template whose data needs to be read

// Returns: {String:String}
// A dictionary of all the play metadata associated
// with the specified itemTemplateID

pub fun main(itemTemplateID: UInt32): {String:String} {

    let metadata = DarkCountry.getItemTemplateMetaData(itemTemplateID: itemTemplateID) ?? panic("ItemTemplate doesn't exist")

    log(metadata)

    return metadata
}
