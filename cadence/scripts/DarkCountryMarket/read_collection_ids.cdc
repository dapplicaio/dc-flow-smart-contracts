//import DarkCountryMarket from "../../contracts/DarkCountryMarket.cdc"

//emulator
import DarkCountryMarket from "0xDarkCountryMarket"

// This script returns an array of all the NFT IDs for sale
// in an account's SaleOffer collection.

pub fun main(address: Address): [UInt64] {
    let marketCollectionRef = getAccount(address)
        .getCapability<&DarkCountryMarket.Collection{DarkCountryMarket.CollectionPublic}>(
            DarkCountryMarket.CollectionPublicPath
        )
        .borrow()
        ?? panic("Could not borrow market collection from market address")

    return marketCollectionRef.getSaleOfferIDs()
}
