//import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
//import DarkCountry from "../../contracts/DarkCountry.cdc"

//emulator
import NonFungibleToken from "0xNonFungibleToken"
import DarkCountry from "0xDarkCountry"

// This script gets the serial number of an asset
// by borrowing a reference to the nft
// and returning its serial number

// serial number is the number of nfts minted per a specific asset type

// Parameters:
//
// address: The Flow Address of the account whose moment data needs to be read
// itemID: The unique ID for the asset whose data needs to be read

// Returns: UInt64
// The serialNumber associated with an asset with a specified ID

pub fun main(address: Address, id: UInt64): UInt32 {

    // get the public account object for the token owner
    let owner = getAccount(address)

    let collectionBorrow = owner.getCapability(DarkCountry.CollectionPublicPath)!
        .borrow<&{DarkCountry.DarkCountryCollectionPublic}>()
        ?? panic("Could not borrow DarkCountryCollectionPublic")

    // borrow a reference to a specific NFT in the collection
    let nft = collectionBorrow.borrowDarkCountryNFT(id: itemID)
        ?? panic("No such itemID in that collection")

    return nft.serialNumber
}
