//import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
//import DarkCountry from "../../contracts/DarkCountry.cdc"

//emulator
import NonFungibleToken from "0xNonFungibleToken"
import DarkCountry from "0xDarkCountry"

// This script reads the public nextSAssetTypeID from the DarkCountry contract and
// returns that number to the caller

// Returns: UInt64
// the nextAssetTypeID field in DarkCountry contract

pub fun main(): UInt64 {

    log(DarkCountry.nextAssetTypeID)

    return DarkCountry.nextAssetTypeID
}
