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

transaction(saleItemID: UInt64, marketCollectionAddress: Address) {
    let paymentVault: @FungibleToken.Vault
    let darkCountryCollection: &DarkCountry.Collection{NonFungibleToken.Receiver}
    let marketCollection: &DarkCountryMarket.Collection{DarkCountryMarket.CollectionPublic}

    prepare(signer: AuthAccount) {
        self.marketCollection = getAccount(marketCollectionAddress)
            .getCapability<&DarkCountryMarket.Collection{DarkCountryMarket.CollectionPublic}>(
                DarkCountryMarket.CollectionPublicPath
            )!
            .borrow()
            ?? panic("Could not borrow market collection from market address")

        let saleItem = self.marketCollection.borrowSaleItem(itemID: saleItemID)
                    ?? panic("No item with that ID")
        let price = saleItem.price

        let mainFlowTokenVault = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
            ?? panic("Cannot borrow FlowToken vault from acct storage")
        self.paymentVault <- mainFlowTokenVault.withdraw(amount: price)

        self.darkCountryCollection = signer.borrow<&DarkCountry.Collection{NonFungibleToken.Receiver}>(
            from: DarkCountry.CollectionStoragePath
        ) ?? panic("Cannot borrow DarkCountry collection receiver from acct")
    }

    execute {
        self.marketCollection.purchase(
            itemID: saleItemID,
            buyerCollection: self.darkCountryCollection,
            buyerPayment: <- self.paymentVault
        )
    }
}
