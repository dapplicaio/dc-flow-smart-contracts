//import DarkCountryMarket from "../../contracts/DarkCountryMarket.cdc"

//emulator
import DarkCountryMarket from "0xDarkCountryMarket"

transaction(itemID: UInt64) {
    let marketCollection: &DarkCountryMarket.Collection

    prepare(signer: AuthAccount) {
        self.marketCollection = signer.borrow<&DarkCountryMarket.Collection>(from: DarkCountryMarket.CollectionStoragePath)
            ?? panic("Missing or mis-typed DarkCountryMarket Collection")
    }

    execute {
        let offer <-self.marketCollection.remove(itemID: itemID)
        destroy offer
    }
}
