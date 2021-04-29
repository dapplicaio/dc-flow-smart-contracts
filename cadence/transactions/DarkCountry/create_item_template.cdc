//import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
//import DarkCountry from "../../contracts/DarkCountry.cdc"

//emulator
import NonFungibleToken from "0xNonFungibleToken"
import DarkCountry from "0xDarkCountry"

// This transaction creates a new item template struct
// and stores it in the DarkCountry smart contract

// Parameters:
//
// metadata: A dictionary of all the play metadata associated

transaction(metadata: {String: String}) {

    // local variable for storing the minter reference
    let minter: &DarkCountry.NFTMinter
    let currItemTemplateID: UInt64

    prepare(signer: AuthAccount) {

        self.currItemTemplateID = DarkCountry.nextItemTemplateID;
        // borrow a reference to the NFTMinter resource in storage
        self.minter = signer.borrow<&DarkCountry.NFTMinter>(from: DarkCountry.MinterStoragePath)
            ?? panic("Could not borrow a reference to the NFT minter")
    }

    execute {

        // Create an item type with the specified metadata
        self.minter.createItemTemplate(metadata: metadata)
    }

    post {
        DarkCountry.getItemTemplateMetaData(itemTemplateID: self.currItemTemplateID) != nil:
            "item template doesnt exist"
    }
}
