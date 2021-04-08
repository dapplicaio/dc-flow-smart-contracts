//import DarkCountry from "../../contracts/DarkCountry.cdc"

//emulator
import DarkCountry from "0xDarkCountry"

// This script gets the AssetType ID associated with an asset
// in a collection by getting a reference to the asset
// and then looking up its AssetType ID

// Parameters:
//
// account: The Flow Address of the account whose moment data needs to be read
// itemID: The unique ID for the moment whose data needs to be read

// Returns: UInt64
// The AssetType ID associated with an asset with a specified asset ID

pub fun main(account: Address, itemID: UInt64): UInt64 {

    // get the public account object for the token owner
    let owner = getAccount(account)

    let collectionBorrow = owner.getCapability(DarkCountry.CollectionPublicPath)!
        .borrow<&{DarkCountry.DarkCountryCollectionPublic}>()
        ?? panic("Could not borrow DarkCountryCollectionPublic")

    // borrow a reference to a specific NFT in the collection
    let nft = collectionBorrow.borrowDarkCountryNFT(id: itemID)
        ?? panic("No such itemID in that collection")

    return nft.assetTypeID
}
