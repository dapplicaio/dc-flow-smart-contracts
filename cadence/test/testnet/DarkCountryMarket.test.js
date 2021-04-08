require('dotenv').config();
import path from "path";

import * as t from "@onflow/types";

import { init, sendTransaction } from "flow-js-testing/dist";

import {
    DARK_COUNTRY,
    DARK_COUNTRY_MARKET,
    ALICE,
    BOB
} from "../constans";
import {
    configureAccount,
    getTransactionCodeByName
} from "./helpers";

const basePath = path.resolve(__dirname, "../../../cadence");

let DarkCountryContractAddress,
    DarkCountryMarketContractAddress,
    FlowTokenContractAddress,
    Alice,
    Bob,

    setupDarkCountryAccountTransaction,
    setupDarkCountryMarketAccountTransaction,
    createAssetTypeTransaction,
    mintNftTransaction,
    buyMarketItemTransaction,
    sellMarketPackTransaction,
    adminSetBeneficiaryTransaction,
    adminSetCutPercentageTransaction,
    adminSetPreOrdersForUserTransaction,
    removeMarketItemTransaction,
    sellMarketPackPreOrderedTransaction,

    assetTypeId

const mintedNftIds = [];

beforeAll(() => {
    init(basePath);
    jest.setTimeout(35000);
});

describe("DarkCountryMarket Tests", () => {
    test("Get test accounts", () => {
        DarkCountryContractAddress = process.env.DARK_COUNTRY_ADDRESS;
        DarkCountryMarketContractAddress = process.env.DARK_COUNTRY_MARKET_ADDRESS;
        Alice = process.env.Alice_ADDRESS;
        Bob = process.env.Bob_ADDRESS;
        FlowTokenContractAddress = process.env.FLOW_TOKEN_ADDRESS;

        expect(DarkCountryContractAddress).toBeTruthy();
        expect(DarkCountryMarketContractAddress).toBeTruthy();
        expect(Alice).toBeTruthy();
        expect(Bob).toBeTruthy();
        expect(FlowTokenContractAddress).toBeTruthy();
    });

    test("Get DarkCountry setupAccount transaction code", async () => {
        setupDarkCountryAccountTransaction = await getTransactionCodeByName({
            name: "DarkCountry/setup_account"
        });

        expect(setupDarkCountryAccountTransaction).toBeTruthy();
    });

    test("Get DarkCountryMarket setupAccount transaction code", async () => {
        setupDarkCountryMarketAccountTransaction = await getTransactionCodeByName({
            name: "DarkCountryMarket/setup_account"
        });

        expect(setupDarkCountryMarketAccountTransaction).toBeTruthy();
    });

    test("Get create asset type transaction code", async () => {
        createAssetTypeTransaction = await getTransactionCodeByName({
            name: "DarkCountry/create_asset_type"
        });

        expect(createAssetTypeTransaction).toBeTruthy();
    });

    test("Get mintNft transaction code", async () => {
        mintNftTransaction = await getTransactionCodeByName({
            name: "DarkCountry/mint_nft"
        });

        expect(mintNftTransaction).toBeTruthy();
    });

    test("Get adminSetBeneficiary transaction code", async () => {
        adminSetBeneficiaryTransaction = await getTransactionCodeByName({
            name: "DarkCountryMarket/admin_set_beneficiary"
        });

        expect(adminSetBeneficiaryTransaction).toBeTruthy();
    });

    test("Get adminSetPreOrdersForUser transaction code", async () => {
        adminSetPreOrdersForUserTransaction = await getTransactionCodeByName({
            name: "DarkCountryMarket/admin_set_pre_orders_for_user"
        });

        expect(adminSetPreOrdersForUserTransaction).toBeTruthy();
    });

    test("Get sellMarketPackPreOrdered transaction code", async () => {
        sellMarketPackPreOrderedTransaction = await getTransactionCodeByName({
            name: "DarkCountryMarket/sell_market_pack_pre_ordered"
        });

        expect(sellMarketPackPreOrderedTransaction).toBeTruthy();
    });

    test("Get buyMarketItem transaction code", async () => {
        buyMarketItemTransaction = await getTransactionCodeByName({
            name: "DarkCountryMarket/buy_market_item"
        });

        expect(buyMarketItemTransaction).toBeTruthy();
    });

    test("Get removeMarketItem transaction code", async () => {
        removeMarketItemTransaction = await getTransactionCodeByName({
            name: "DarkCountryMarket/remove_market_item"
        });

        expect(removeMarketItemTransaction).toBeTruthy();
    });

    test("Get sellMarketPack transaction code", async () => {
        sellMarketPackTransaction = await getTransactionCodeByName({
            name: "DarkCountryMarket/sell_market_pack"
        });

        expect(sellMarketPackTransaction).toBeTruthy();
    });

    test("Get adminSetCutPercentage transaction code", async () => {
        adminSetCutPercentageTransaction = await getTransactionCodeByName({
            name: "DarkCountryMarket/admin_set_cut_percentage"
        });

        expect(adminSetCutPercentageTransaction).toBeTruthy();
    });

    test("Setup DarkCountry account", async () => {
        try {
            await configureAccount(DARK_COUNTRY);
            await sleep(5000);

            const transactionResult1 = await sendTransaction({
                code: setupDarkCountryAccountTransaction,
                signers: [DarkCountryContractAddress]
            });

            expect(transactionResult1.errorMessage).toBe("");

            const transactionResult2= await sendTransaction({
                code: setupDarkCountryMarketAccountTransaction,
                signers: [DarkCountryContractAddress]
            });

            expect(transactionResult2.errorMessage).toBe("");
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Setup DarkCountryMarket account", async () => {
        try {
            await configureAccount(DARK_COUNTRY_MARKET);
            await sleep(5000);

            const transactionResult1 = await sendTransaction({
                code: setupDarkCountryAccountTransaction,
                signers: [DarkCountryMarketContractAddress]
            });

            expect(transactionResult1.errorMessage).toBe("");

            const transactionResult2= await sendTransaction({
                code: setupDarkCountryMarketAccountTransaction,
                signers: [DarkCountryMarketContractAddress]
            });

            expect(transactionResult2.errorMessage).toBe("");
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Setup Alice account", async () => {
        try {
            await configureAccount(ALICE);
            await sleep(5000);

            const transactionResult1 = await sendTransaction({
                code: setupDarkCountryAccountTransaction,
                signers: [Alice]
            });

            expect(transactionResult1.errorMessage).toBe("");

            const transactionResult2= await sendTransaction({
                code: setupDarkCountryMarketAccountTransaction,
                signers: [Alice]
            });

            expect(transactionResult2.errorMessage).toBe("");
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Setup Bob account", async () => {
        try {
            await configureAccount(BOB);
            await sleep(5000);

            const transactionResult1 = await sendTransaction({
                code: setupDarkCountryAccountTransaction,
                signers: [Bob]
            });

            expect(transactionResult1.errorMessage).toBe("");

            const transactionResult2= await sendTransaction({
                code: setupDarkCountryMarketAccountTransaction,
                signers: [Bob]
            });

            expect(transactionResult2.errorMessage).toBe("");
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Should be able to create asset type", async () => {
        try {
            await configureAccount(DARK_COUNTRY);
            await sleep(5000);

            const args = [[
                [
                    { key: "Name", value: "Common Land Pack" },
                    { key: "Rarity", value: "Common" },
                ],
                t.Dictionary([
                    { key: t.String, value: t.String },
                    { key: t.String, value: t.String }
                ])
            ]];

            const { errorMessage, events } = await sendTransaction({
                code: createAssetTypeTransaction,
                signers: [DarkCountryContractAddress],
                args
            });

            assetTypeId = events.find(data => !!data).data.id;

            expect(assetTypeId).toBeTruthy();
            expect(errorMessage).toBe("");
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Shouldn't be able to mint nft with incorrect assetTypeID", async () => {
        try {
            await configureAccount(DARK_COUNTRY);
            await sleep(5000);

            const args = [
                //recipient
                [DarkCountryContractAddress, t.Address],
                //assetTypeID
                [999, t.UInt64],
            ];

            await sendTransaction({
                code: mintNftTransaction,
                signers: [DarkCountryContractAddress],
                args
            });
        } catch (e) {
            expect(e).toContain("Cannot mintNFT: assetType doesn't exist.");
        }
    });

    test("Should be able to mint nft", async () => {
        try {
            await configureAccount(DARK_COUNTRY);
            await sleep(5000);

            const users = [
                Alice,
                DarkCountryMarketContractAddress,
                DarkCountryMarketContractAddress
            ];

            for (const user of users) {
                const args = [
                    //recipient
                    [user, t.Address],
                    //assetTypeID
                    [assetTypeId, t.UInt64],
                ];

                const { errorMessage, events } = await sendTransaction({
                    code: mintNftTransaction,
                    signers: [DarkCountryContractAddress],
                    args
                });

                mintedNftIds.push(events.find(data => !!data).data.id);

                expect(errorMessage).toBe("");
            }
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Non admin shouldn't be able to set beneficiary", async () => {
        try {
            await configureAccount(BOB);
            await sleep(5000);

            const args = [
                //beneficiaryAddress
                [Alice, t.Address]
            ];

            await sendTransaction({
                code: adminSetBeneficiaryTransaction,
                signers: [Bob],
                args
            });
        } catch (e) {
            expect(e).toContain("Could not borrow a reference to the market admin");
        }
    });

    test("Admin should be able to set beneficiary", async () => {
        try {
            await configureAccount(DARK_COUNTRY_MARKET);
            await sleep(5000);

            const args = [
                //beneficiaryAddress
                [Bob, t.Address]
            ];

            const { errorMessage } = await sendTransaction({
                code: adminSetBeneficiaryTransaction,
                signers: [DarkCountryMarketContractAddress],
                args
            });

            expect(errorMessage).toBe("");
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Non admin shouldn't be able to set cut percentage", async () => {
        try {
            await configureAccount(BOB);
            await sleep(5000);

            const args = [
                //newPercentage
                ["0.1", t.UFix64]
            ];

            await sendTransaction({
                code: adminSetCutPercentageTransaction,
                signers: [Bob],
                args
            });
        } catch (e) {
            expect(e).toContain("Could not borrow a reference to the market admin");
        }
    });

    test("Admin should be able to set cut percentage", async () => {
        try {
            await configureAccount(DARK_COUNTRY_MARKET);
            await sleep(5000);

            const args = [
                //newPercentage
                ["0.1", t.UFix64]
            ];

            const { errorMessage } = await sendTransaction({
                code: adminSetCutPercentageTransaction,
                signers: [DarkCountryMarketContractAddress],
                args
            });

            expect(errorMessage).toBe("");
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Non admin shouldn't be able to set pre orders for user", async () => {
        try {
            await configureAccount(BOB);
            await sleep(5000);

            const args = [
                //userAddress
                [Alice, t.Address],
                //preOrders
                [
                    { key: assetTypeId, value: 1 },
                    t.Dictionary({ key: t.UInt64, value: t.UInt64 })
                ]
            ];

           await sendTransaction({
                code: adminSetPreOrdersForUserTransaction,
                signers: [Bob],
                args
           });
        } catch (e) {
            expect(e).toContain("Could not borrow a reference to the market admin");
        }
    });

    test("Admin should be able to set pre orders for user", async () => {
        try {
            await configureAccount(DARK_COUNTRY_MARKET);
            await sleep(5000);

            const args = [
                //userAddress
                [Bob, t.Address],
                //preOrders
                [
                    { key: assetTypeId, value: 1 },
                    t.Dictionary({ key: t.UInt64, value: t.UInt64 })
                ]
            ];

            const { errorMessage } = await sendTransaction({
                code: adminSetPreOrdersForUserTransaction,
                signers: [DarkCountryMarketContractAddress],
                args
            });

            expect(errorMessage).toBe("");
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Should be able to sell pre ordered market packs", async () => {
        try {
            await configureAccount(DARK_COUNTRY_MARKET);
            await sleep(5000);

            const packs = [
                mintedNftIds[1],
                mintedNftIds[2]
            ];

            for (const pack of packs) {
                const args = [
                    //saleItemID
                    [pack, t.UInt64],
                    //saleItemPrice
                    ["100.0",t.UFix64]
                ];

                const { errorMessage } = await sendTransaction({
                    code: sellMarketPackPreOrderedTransaction,
                    signers: [DarkCountryMarketContractAddress],
                    args
                });

                expect(errorMessage).toBe("");
            }
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Shouldn't be able to buy pre ordered market item with incorrect id", async () => {
        try {
            await configureAccount(BOB);
            await sleep(5000);

            const args = [
                [999, t.UInt64],
                [DarkCountryMarketContractAddress, t.Address]
            ];

            await sendTransaction({
                code: buyMarketItemTransaction,
                signers: [Bob],
                args
            });
        } catch (e) {
            expect(e).toContain("No item with that ID");
        }
    });

    test("Alice shouldn't be able to buy pre ordered market item", async () => {
        try {
            await configureAccount(ALICE);
            await sleep(5000);

            const args = [
                [mintedNftIds[1], t.UInt64],
                [DarkCountryMarketContractAddress, t.Address]
            ];

            await sendTransaction({
                code: buyMarketItemTransaction,
                signers: [Alice],
                args
            });
        } catch (e) {
            expect(e).toContain("Could not find pre ordered assets");
        }
    });

    test("Should be able to buy pre ordered market item", async () => {
        try {
            await configureAccount(BOB);
            await sleep(5000);

            const args = [
                [mintedNftIds[1], t.UInt64],
                [DarkCountryMarketContractAddress, t.Address]
            ];

            const { errorMessage } = await sendTransaction({
                code: buyMarketItemTransaction,
                signers: [Bob],
                args
            });

            expect(errorMessage).toBe("");
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Bob shouldn't be able to buy second pre ordered market item", async () => {
        try {
            await configureAccount(BOB);
            await sleep(5000);

            const args = [
                [mintedNftIds[2], t.UInt64],
                [DarkCountryMarketContractAddress, t.Address]
            ];

            await sendTransaction({
                code: buyMarketItemTransaction,
                signers: [Bob],
                args
            });
        } catch (e) {
            expect(e).toContain("Could not find pre ordered assets");
        }
    });

    test("Should be able to sell market pack", async () => {
        try {
            await configureAccount(BOB);
            await sleep(5000);

            const args = [
                //saleItemID
                [mintedNftIds[1], t.UInt64],
                //saleItemPrice
                ["100.0",t.UFix64]
            ];

            const { errorMessage } = await sendTransaction({
                code: sellMarketPackTransaction,
                signers: [Bob],
                args
            });

            expect(errorMessage).toBe("");
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Should be able to remove market item", async () => {
        try {
            await configureAccount(BOB);
            await sleep(5000);

            const args = [
                [mintedNftIds[1], t.UInt64]
            ];

            const { errorMessage } = await sendTransaction({
                code: removeMarketItemTransaction,
                signers: [Bob],
                args
            });

            expect(errorMessage).toBe("");
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Should be able to sell market pack", async () => {
        try {
            await configureAccount(BOB);
            await sleep(5000);

            const args = [
                //saleItemID
                [mintedNftIds[1], t.UInt64],
                //saleItemPrice
                ["100.0",t.UFix64]
            ];

            const { errorMessage } = await sendTransaction({
                code: sellMarketPackTransaction,
                signers: [Bob],
                args
            });

            expect(errorMessage).toBe("");
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Should be able to buy market item", async () => {
        try {
            await configureAccount(ALICE);
            await sleep(5000);

            const args = [
                [mintedNftIds[1], t.UInt64],
                [Bob, t.Address]
            ];

            const { errorMessage } = await sendTransaction({
                code: buyMarketItemTransaction,
                signers: [Alice],
                args
            });

            expect(errorMessage).toBe("");
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });
});

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
