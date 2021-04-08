//import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
//import DarkCountry from "../../contracts/DarkCountry.cdc"

//emulator
import NonFungibleToken from "0xNonFungibleToken"
import DarkCountry from "0xDarkCountry"

transaction {
    prepare(signer: AuthAccount) {
        // if the account doesn't already have a collection
        if signer.borrow<&DarkCountry.Collection>(from: DarkCountry.CollectionStoragePath) == nil {

            // create a new empty collection
            let collection <- DarkCountry.createEmptyCollection()

            // save it to the account
            signer.save(<-collection, to: DarkCountry.CollectionStoragePath)

            // create a public capability for the collection
            signer.link<&DarkCountry.Collection{NonFungibleToken.CollectionPublic, DarkCountry.DarkCountryCollectionPublic}>(DarkCountry.CollectionPublicPath, target: DarkCountry.CollectionStoragePath)
        }
    }
}
