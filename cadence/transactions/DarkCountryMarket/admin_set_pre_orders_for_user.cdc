//import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
//import DarkCountry from "../../contracts/DarkCountry.cdc"
//import DarkCountryMarket from "../../contracts/DarkCountryMarket.cdc"

//emulator
import NonFungibleToken from "0xNonFungibleToken"
import DarkCountry from "0xDarkCountry"
import DarkCountryMarket from "0xDarkCountryMarket"

// This transaction sets pre orders for a user address
//

// Parameters:
//
// userAddress: user's Flow Account address
// preOrders: dictionary of asset type { AssetTypeID, amount }

transaction(userAddress: Address, preOrders: {UInt64: UInt64}) {

    // local variable for storing the admin reference
    let admin: &DarkCountryMarket.Admin

    prepare(adminAddress: AuthAccount) {

        // borrow a reference to the Admin resource in storage
        self.admin = adminAddress.borrow<&DarkCountryMarket.Admin>(from: DarkCountryMarket.AdminStoragePath)
            ?? panic("Could not borrow a reference to the market admin")
    }

    execute {

        self.admin.setPreOrdersForAddress(userAddress: userAddress, newPreOrders: preOrders)
    }

    post {

        DarkCountryMarket.preOrders[userAddress] != nil : "Pre orders were not set"
    }

}
