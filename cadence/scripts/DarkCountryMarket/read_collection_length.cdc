//import DarkCountryMarket from "../../contracts/DarkCountryMarket.cdc"

//emulator
import DarkCountryMarket from "0xDarkCountryMarket"

// This script returns the size of an account's SaleOffer collection.

pub fun main(account: Address): Int {
    let acct = getAccount(account)
    let marketCollectionRef = acct
        .getCapability<&DarkCuntryMarket.Collection{DarkCuntryMarket.CollectionPublic}>(
             DarkCuntryMarket.CollectionPublicPath
        )
        .borrow()
        ?? panic("Could not borrow market collection from market address")

    return marketCollectionRef.getSaleOfferIDs().length
}
