// This script gets the percentage cut that beneficiary will take
// of DarkCountry nfts

// The same value is used for all the nfts

// Returns: UFix64

//import DarkCountryMarket from "../../contracts/DarkCountryMarket.cdc"

//emulator
import DarkCountryMarket from "0xDarkCountryMarket"

pub fun main(): UInt64 {

    return DarkCountryMarket.cutPercentage
}
