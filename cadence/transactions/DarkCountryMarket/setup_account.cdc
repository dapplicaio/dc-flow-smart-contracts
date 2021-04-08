//import DarkCountryMarket from "../../contracts/DarkCountryMarket.cdc"

//emulator
import DarkCountryMarket from "0xDarkCountryMarket"

// This transaction configures an account to hold SaleOffer items.

transaction {
    prepare(signer: AuthAccount) {

        // if the account doesn't already have a collection
        if signer.borrow<&DarkCountryMarket.Collection>(from: DarkCountryMarket.CollectionStoragePath) == nil {

            // create a new empty collection
            let collection <- DarkCountryMarket.createEmptyCollection() as! @DarkCountryMarket.Collection

            // save it to the account
            signer.save(<-collection, to: DarkCountryMarket.CollectionStoragePath)

            // create a public capability for the collection
            signer.link<&DarkCountryMarket.Collection{DarkCountryMarket.CollectionPublic}>(DarkCountryMarket.CollectionPublicPath, target: DarkCountryMarket.CollectionStoragePath)
        }
    }
}
