//import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
//import DarkCountry from "../../contracts/DarkCountry.cdc"

//emulator
import NonFungibleToken from "0xNonFungibleToken"
import DarkCountry from "0xDarkCountry"

// This script returns the value for the specified metadata field
// associated with an asset type in the DarkCountry smart contract

// Parameters:
//
// assetTypeID: The unique ID for the asset type whose data needs to be read
// field: The specified metadata field whose data needs to be read

// Returns: String
// Value of specified metadata field associated with specified assetTypeID

pub fun main(assetTypeID: UInt32, field: String): String {

    let field = DarkCountry.getAssetTypeMetaDataByField(assetTypeID: assetTypeID, field: field) ?? panic("AssetType doesn't exist")

    log(field)

    return field
}
