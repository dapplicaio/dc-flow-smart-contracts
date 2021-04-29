//import DarkCountry from "../../contracts/DarkCountry.cdc"

//emulator
import DarkCountry from "0xDarkCountry"

// This script gets the ItemTemplate ID associated with an item
// in a collection by getting a reference to the item
// and then looking up its ItemTemplate ID

// Parameters:
//
// account: The Flow Address of the account whose moment data needs to be read
// itemID: The unique ID for the moment whose data needs to be read

// Returns: UInt64
// The ItemTemplate ID associated with an item with a specified item ID

pub fun main(account: Address, itemID: UInt64): UInt64 {

    // get the public account object for the token owner
    let owner = getAccount(account)

    let collectionBorrow = owner.getCapability(DarkCountry.CollectionPublicPath)!
        .borrow<&{DarkCountry.DarkCountryCollectionPublic}>()
        ?? panic("Could not borrow DarkCountryCollectionPublic")

    // borrow a reference to a specific NFT in the collection
    let nft = collectionBorrow.borrowDarkCountryNFT(id: itemID)
        ?? panic("No such itemID in that collection")

    return nft.itemTemplateID
}
