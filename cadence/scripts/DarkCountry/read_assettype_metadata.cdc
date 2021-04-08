//import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
//import DarkCountry from "../../contracts/DarkCountry.cdc"

// for tests only
import NonFungibleToken from "0xNonFungibleToken"
import DarkCountry from "0xDarkCountry"

// This script returns the full metadata associated with an asset type
// in the DarkCountry smart contract

// Parameters:
//
// assetTypeID: The unique ID for the asset type whose data needs to be read

// Returns: {String:String}
// A dictionary of all the play metadata associated
// with the specified assetTypeID

pub fun main(assetTypeID: UInt32): {String:String} {

    let metadata = DarkCountry.getAssetTypeMetaData(assetTypeID: assetTypeID) ?? panic("AssetType doesn't exist")

    log(metadata)

    return metadata
}
