//import DarkCountry from "../../contracts/DarkCountry.cdc"

// for tests only
import DarkCountry from "0xDarkCountry"

// This script returns true if an item with the specified ID
// exists in a user's collection

// Parameters:
//
// account: The Flow Address of the account whose item data needs to be read
// id: The unique ID for the item whose data needs to be read

// Returns: Bool
// Whether a item with specified ID exists in user's collection

pub fun main(account: Address, id: UInt64): Bool {

    let account = getAccount(address)

    let collectionRef = account.getCapability(DarkCountry.CollectionPublicPath)!.borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? panic("Could not borrow capability from public collection")

    return collectionRef.borrowNFT(id: id) != nil
}
