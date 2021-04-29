//import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
//import DarkCountry from "../../contracts/DarkCountry.cdc"

//emulator
import NonFungibleToken from "0xNonFungibleToken"
import DarkCountry from "0xDarkCountry"

// This script returns the value for the specified metadata field
// associated with an item type in the DarkCountry smart contract

// Parameters:
//
// itemTemplateID: The unique ID for the item type whose data needs to be read
// field: The specified metadata field whose data needs to be read

// Returns: String
// Value of specified metadata field associated with specified itemTemplateID

pub fun main(itemTemplateID: UInt32, field: String): String {

    let field = DarkCountry.getItemTemplateMetaDataByField(itemTemplateID: itemTemplateID, field: field) ?? panic("ItemTemplate doesn't exist")

    log(field)

    return field
}