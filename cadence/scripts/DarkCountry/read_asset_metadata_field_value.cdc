//import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
//import DarkCountry from "../../contracts/DarkCountry.cdc"

// for tests only
import NonFungibleToken from "0xNonFungibleToken"
import DarkCountry from "0xDarkCountry"

// This script gets the metadata associated with an asset
// in a collection by looking up its assetTypeID and then searching
// for that asset's metadata in the DarkCountry contract. It returns
// the value for the specified metadata field

// Parameters:
//
// account: The Flow Address of the account whose asset data needs to be read
// itemID: The unique ID for the asset whose data needs to be read
// fieldToSearch: The specified metadata field whose data needs to be read

// Returns: String
// Value of specified metadata field

pub fun main(account: Address, itemID: UInt64, fieldToSearch: String): String {

    // borrow a public reference to the owner's asset collection
    let owner = getAccount(account)

    let collectionBorrow = owner.getCapability(DarkCountry.CollectionPublicPath)!
        .borrow<&{DarkCountry.DarkCountryCollectionPublic}>()
        ?? panic("Could not borrow DarkCountryCollectionPublic")

    // borrow a reference to a specific NFT in the collection
    let nft = collectionBorrow.borrowDarkCountryNFT(id: itemID)
        ?? panic("No such itemID in that collection")

    // Get the metadata field associated with the specific AssetType
    let field = DarkCountry.getAssetTypeMetaDataByField(assetTypeID: nft.assetTypeID, field: fieldToSearch) ?? panic("AssetType doesn't exist")

    log(field)

    return field
}
