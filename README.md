## Dark Country - Cadence 

## About
This repository contains cadence smart contracts, scripts, transactions, and unit tests (using [Jest Framework](https://jestjs.io/)) which can be run on Flow Emulator and the Flow Testnet.

### DarkCountry.cdc

The smart contract contains the core functionality for DarkCountry NFTs.

The contract manages the data associated with all the AssetType structures that are used as templates for the DarkCountry NFTs.

When a new NFTs wants to be added to the records and the type of the NFT is not registered, a Minter creates a new AssetType struct that is stored in the smart contract. E.g. Minter creates Asset Type for Rare Land Pack, sets data associated with it. Then they can mint new multiple NFTs of Common Rare Pack type by specifying the appropriate asset type ID.

AssetType is a public struct that contains public information (metadata) that is shared for a group of NFTs. 

The private NFTMinter resource is used to mint new NFTs.

The NFT minter resource has the power to do configuration actions in the smart contract. 
When Minter wants to call functions in an AssetType, they call their borrowSet function to get a reference to an AssetType structure in the contract. Then, they can call functions on the AssetType using that reference.
    
The contract also defines a Collection resource. This is an object that every DarkCountry NFT owner will store in their account to manage their NFT collection.

The main DarkCountry account and / or an account that holds NFT Minter resource, might also have theirs own NFTs collections.
Those can be used to hold its own minted NFTs that have not yet been sent to a user.

### DarkCountryMarket.cdc

The purpose of the smart contract is provide an ability to sell and buy DarkCountry NFTs

Marketplace is where users can create a sale collection that they store in their account storage. In the sale collection, they can put their NFTs up for sale with a price and publish a reference so that others can see the sale.

If another user sees an NFT that they want to buy, they can send fungible tokens that equal or exceed the buy price to buy the NFT. The NFT is transferred to them when they make the purchase.

Each user who wants to sell NFTs will have a sale collection instance in their account that holds the NFTs that they are putting up for sale. They can give a reference to this collection to a central contract so that it can list the sales in a central place.

When a user creates a sale, they will supply four arguments:
 - A DarkCountry.Collection capability that allows their sale to withdraw
   a NFT when it is purchased.
 - A FungibleToken.Receiver capability as the place where the payment for the token goes.
 - Item ID as the identifier of the item for sale
 - Price of the item for sale

DarkCountry Market has smart contract level setting that are managed by an account with Admin resource. Such setting are as follows:
 - beneficiaryCapability: A FungibleToken.Receiver capability specifying a beneficiary, where a cut of the purchase gets sent.
 - cutPercentage: A cut percentage, specifying how much the beneficiary will recieve.
 - preOrders: A dictionary of Adress to {AssetType : number of preordered items} mapping that indicates how many items of a specific asset type are resevred for the Address.

Only Admins can create sale offers wich can be used in pre-sales only. Such offers can not be accepted by users that do not have records in the preOrders. Once such sale is accepted, the preOrders value is adjusted accordingly.

## Installation

### 1. Install Node

Please follow instructions on NodeJS download page and install [latest version of NodeJS software:](https://nodejs.org/en/download/)

### 2. Install the Flow CLI

Before you start, install the [Flow command-line interface (CLI)](https://docs.onflow.org/flow-cli).

_This project requires `flow-cli v0.15.0` or above._

### 3. Flow JS Testing Framework

Run `npm install` inside `test` folder. <br>

For documentations on how to use
the framework you can consult package repository [https://github.com/onflow/flow-js-testing](https://github.com/onflow/flow-js-testing)

## Getting Started
### Run tests on Flow Emulator:
1. Run `flow project start-emulator -v` 
2. Run test file

### Run tests on Flow Testnet:
1. Deploy the contracts `flow project deploy --network=testnet`
2. Setup accounts
3. Set contracts address and private keys to environment
4. Run test file

_Please Note:_
1. The test framework has been extended with configuration helper to be able to run the tests at the testnet.
