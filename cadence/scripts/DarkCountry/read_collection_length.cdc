//import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
//import DarkCountry from "../../contracts/DarkCountry.cdc"

//emulator
import NonFungibleToken from "0xNonFungibleToken"
import DarkCountry from "0xDarkCountry"

pub fun main(address: Address): Int {
    let account = getAccount(address)

    let collectionRef = account.getCapability(DarkCountry.CollectionPublicPath)!
        .borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? panic("Could not borrow capability from public collection")

    return collectionRef.getIDs().length
}
