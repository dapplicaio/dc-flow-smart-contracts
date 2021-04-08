//import FungibleToken from "../../contracts/FungibleToken.cdc"
//import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
//import FlowToken from "../../contracts/FlowToken.cdc"
//import DarkCountry from "../../contracts/DarkCountry.cdc"
//import DarkCountryMarket from "../../contracts/DarkCountryMarket.cdc"

//emulator
import FungibleToken from "0xFungibleToken"
import NonFungibleToken from "0xNonFungibleToken"
import FlowToken from "0xFlowToken"
import DarkCountry from "0xDarkCountry"
import DarkCountryMarket from "0xDarkCountryMarket"

transaction(saleItemID: UInt64, saleItemPrice: UFix64) {
    let flowVault: Capability<&FlowToken.Vault{FungibleToken.Receiver}>
    let darkCountryCollection: Capability<&DarkCountry.Collection{NonFungibleToken.Provider}>
    let marketCollection: &DarkCountryMarket.Collection

    prepare(signer: AuthAccount) {
        // we need a provider capability, but one is not provided by default so we create one.
        let DarkCountryCollectionProviderPrivatePath = /private/darkCountryCollectionProvider

        self.flowVault = signer.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)!
        assert(self.flowVault.borrow() != nil, message: "Missing or mis-typed Flow receiver")

        if !signer.getCapability<&DarkCountry.Collection{NonFungibleToken.Provider}>(DarkCountryCollectionProviderPrivatePath)!.check() {
            signer.link<&DarkCountry.Collection{NonFungibleToken.Provider}>(DarkCountryCollectionProviderPrivatePath, target: DarkCountry.CollectionStoragePath)
        }

        self.darkCountryCollection = signer.getCapability<&DarkCountry.Collection{NonFungibleToken.Provider}>(DarkCountryCollectionProviderPrivatePath)!
        assert(self.darkCountryCollection.borrow() != nil, message: "Missing or mis-typed DarkCountryCollection provider")

        self.marketCollection = signer.borrow<&DarkCountryMarket.Collection>(from: DarkCountryMarket.CollectionStoragePath)
            ?? panic("Missing or mis-typed DarkCountryMarket Collection")
    }

    execute {
        let offer <- DarkCountryMarket.createSaleOffer (
            sellerItemProvider: self.darkCountryCollection,
            itemID: saleItemID,
            sellerPaymentReceiver: self.flowVault,
            price: saleItemPrice
        )
        self.marketCollection.insert(offer: <-offer)
    }
}
