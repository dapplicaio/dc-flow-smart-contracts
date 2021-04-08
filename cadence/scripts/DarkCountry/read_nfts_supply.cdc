//import DarkCountry from "../../contracts/DarkCountry.cdc"

//emulator
import DarkCountry from "0xDarkCountry"

// This scripts returns the number of DarkCountry NFTs currently in existence.

pub fun main(): UInt64 {
    return DarkCountry.totalSupply
}
