//import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
//import DarkCountry from "../../contracts/DarkCountry.cdc"
//import DarkCountryMarket from "../../contracts/DarkCountryMarket.cdc"

//emulator
import NonFungibleToken from "0xNonFungibleToken"
import DarkCountry from "0xDarkCountry"
import DarkCountryMarket from "0xDarkCountryMarket"

// Parameters:
//
// newPercentage: a new value of cut percentage for DarkCountry NFT market

transaction(newPercentage: UFix64) {

    // local variable for storing the minter reference
    let admin: &DarkCountryMarket.Admin

    prepare(adminAddress: AuthAccount) {

        // borrow a reference to the Admin resource in storage
        self.admin = adminAddress.borrow<&DarkCountryMarket.Admin>(from: DarkCountryMarket.AdminStoragePath)
            ?? panic("Could not borrow a reference to the market admin")
    }

    execute {

        self.admin.setPercentage(newPercentage)
    }

    post {

        DarkCountryMarket.cutPercentage == newPercentage : "New cut percentage was not set"
    }

}
