import path from "path";

import * as t from "@onflow/types";

import { deployContractByName, init, getTransactionCode, sendTransaction } from "flow-js-testing/dist";
import { getAccountAddress } from "flow-js-testing/dist/utils/create-account";
import { defaultsByName } from "flow-js-testing/dist/utils/file";

import {
    DarkCountryMarketPlaceholder,
    DarkCountryPlaceholder,
    FlowTokenPlaceholder,
    FungibleTokenPlaceholder,
    NonFungibleTokenPlaceholder
} from "../constans";

const basePath = path.resolve(__dirname, "../../../cadence");

let NFTContractAddress,
    DarkCountryContractAddress,
    DarkCountryMarketContractAddress,
    FlowTokenContractAddress,
    Alice,
    Bob,

    NFTContract,
    DarkCountryContract,
    DarkCountryMarketContract,

    createItemTemplateTransaction,
    mintNftTransaction,
    buyMarketItemTransaction,
    sellMarketPackTransaction,
    setupDarkCountryAccountTransaction,
    setupDarkCountryMarketAccountTransaction,
    mintFLowTokensTransaction,
    adminSetBeneficiaryTransaction,
    adminSetCutPercentageTransaction,
    adminSetPreOrdersForUserTransaction,
    removeMarketItemTransaction,
    sellMarketPackPreOrderedTransaction,

    itemTemplateId

const mintedNftIds = [];

beforeAll(() => {
    init(basePath);
});

describe("DarkCountryMarket Tests", () => {
    test("Get test accounts", async () => {
        DarkCountryContractAddress = await getAccountAddress("DarkCountry");
        NFTContractAddress = await getAccountAddress("NonFungibleToken");
        DarkCountryMarketContractAddress = await getAccountAddress("DarkCountryMarket");
        Alice = await getAccountAddress("Alice");
        Bob = await getAccountAddress("Bob");

        expect(DarkCountryContractAddress).toBeTruthy();
        expect(NFTContractAddress).toBeTruthy();
        expect(DarkCountryMarketContractAddress).toBeTruthy();
        expect(Alice).toBeTruthy();
        expect(Bob).toBeTruthy();
    });

    test("Deploy NFT contract", async () => {
        try {
            NFTContract = await deployContractByName({
                to: NFTContractAddress,
                name: 'NonFungibleToken'
            });
        } catch (e) {
            console.log(e);
        }

        expect(NFTContract).toBeTruthy();
    });

    test("Deploy DarkCountry contract", async () => {
        try {
            const addressMap = {
                NonFungibleToken: NFTContractAddress
            };

            DarkCountryContract = await deployContractByName({
                to: DarkCountryContractAddress,
                name: 'DarkCountry',
                addressMap
            });
        } catch (e) {
            console.log(e);
        }

        expect(DarkCountryContract).toBeTruthy();
    });

    test("Deploy DarkCountryMarket contract", async () => {
        try {
            const addressMap = {
                ...defaultsByName,
                DarkCountry: DarkCountryContractAddress,
                NonFungibleToken: NFTContractAddress
            };

            DarkCountryMarketContract = await deployContractByName({
                to: DarkCountryMarketContractAddress,
                name: "DarkCountryMarket",
                addressMap
            });
        } catch (e) {
            console.log(e);
        }

        expect(DarkCountryMarketContract).toBeTruthy();
    });

    test("Get DarkCountry setupAccount transaction code", async () => {
        setupDarkCountryAccountTransaction = replaceImports(
            await getTransactionCode({
                name: "DarkCountry/setup_account"
            })
        );

        expect(setupDarkCountryAccountTransaction).toBeTruthy();
    });

    test("Get DarkCountryMarket setupAccount transaction code", async () => {
        setupDarkCountryMarketAccountTransaction = replaceImports(
            await getTransactionCode({
                name: "DarkCountryMarket/setup_account"
            })
        );

        expect(setupDarkCountryMarketAccountTransaction).toBeTruthy();
    });

    test("Get create item template transaction code", async () => {
        createItemTemplateTransaction = replaceImports(
            await getTransactionCode({
                name: "DarkCountry/create_item_template"
            })
        );

        expect(createItemTemplateTransaction).toBeTruthy();
    });

    test("Get mintFlowTokens transaction code", async () => {
        mintFLowTokensTransaction = replaceImports(
            await getTransactionCode({
                name: "flowToken/mint_flow_tokens"
            })
        );

        expect(mintFLowTokensTransaction).toBeTruthy();
    });

    test("Get mintNft transaction code", async () => {
        mintNftTransaction = replaceImports(
            await getTransactionCode({
                name: "DarkCountry/mint_nft"
            })
        );

        expect(mintNftTransaction).toBeTruthy();
    });

    test("Get adminSetBeneficiary transaction code", async () => {
        adminSetBeneficiaryTransaction = replaceImports(
            await getTransactionCode({
                name: "DarkCountryMarket/admin_set_beneficiary"
            })
        );

        expect(adminSetBeneficiaryTransaction).toBeTruthy();
    });

    test("Get adminSetPreOrdersForUser transaction code", async () => {
        adminSetPreOrdersForUserTransaction = replaceImports(
            await getTransactionCode({
                name: "DarkCountryMarket/admin_set_pre_orders_for_user"
            })
        );

        expect(adminSetPreOrdersForUserTransaction).toBeTruthy();
    });

    test("Get sellMarketPackPreOrdered transaction code", async () => {
        sellMarketPackPreOrderedTransaction = replaceImports(
            await getTransactionCode({
                name: "DarkCountryMarket/sell_market_pack_pre_ordered"
            })
        );

        expect(sellMarketPackPreOrderedTransaction).toBeTruthy();
    });

    test("Get buyMarketItem transaction code", async () => {
        buyMarketItemTransaction = replaceImports(
            await getTransactionCode({
                name: "DarkCountryMarket/buy_market_item"
            })
        );

        expect(buyMarketItemTransaction).toBeTruthy();
    });

    test("Get removeMarketItem transaction code", async () => {
        removeMarketItemTransaction = replaceImports(
            await getTransactionCode({
                name: "DarkCountryMarket/remove_market_item"
            })
        );

        expect(removeMarketItemTransaction).toBeTruthy();
    });

    test("Get sellMarketPack transaction code", async () => {
        sellMarketPackTransaction = replaceImports(
            await getTransactionCode({
                name: "DarkCountryMarket/sell_market_pack"
            })
        );

        expect(sellMarketPackTransaction).toBeTruthy();
    });

    test("Get adminSetCutPercentage transaction code", async () => {
        adminSetCutPercentageTransaction = replaceImports(
            await getTransactionCode({
                name: "DarkCountryMarket/admin_set_cut_percentage"
            })
        );

        expect(adminSetCutPercentageTransaction).toBeTruthy();
    });

    test("Setup DarkCountry accounts", async () => {
        try {
            const accounts = [
                DarkCountryContractAddress,
                DarkCountryMarketContractAddress,
                Alice,
                Bob
            ];

            for (const account of accounts) {
                const { errorMessage } = await sendTransaction({
                    code: setupDarkCountryAccountTransaction,
                    signers: [account]
                });

                expect(errorMessage).toBe("");
            }
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Setup DarkCountryMarket accounts", async () => {
        try {
            const accounts = [
                Alice,
                Bob,
                DarkCountryMarketContractAddress
            ];

            for (const account of accounts) {
                const { errorMessage } = await sendTransaction({
                    code: setupDarkCountryMarketAccountTransaction,
                    signers: [account]
                });

                expect(errorMessage).toBe("");
            }
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Should be able to create item template", async () => {
        try {
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
                code: createItemTemplateTransaction,
                signers: [DarkCountryContractAddress],
                args
            });

            itemTemplateId = events.find(data => !!data).data.id;

            expect(itemTemplateId).toBeTruthy();
            expect(errorMessage).toBe("");
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Should be able to mint flow tokens", async () => {
        try {
            const users = [
                Bob,
                Alice,
                DarkCountryMarketContractAddress
            ];

            for (const user of users) {
                const args = [
                    //recipient
                    [user, t.Address],
                    //amount
                    ["1000.0", t.UFix64],
                ];

                const { errorMessage } = await sendTransaction({
                    code: mintFLowTokensTransaction,
                    signers: [FlowTokenContractAddress],
                    args
                });

                expect(errorMessage).toBe("");
            }
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Shouldn't be able to mint nft with incorrect nft minter", async () => {
        try {
            const args = [
                //recipient
                [DarkCountryContractAddress, t.Address],
                //ItemTemplateID
                [itemTemplateId, t.UInt64],
            ];

            await sendTransaction({
                code: mintNftTransaction,
                //NFT minter
                signers: [NFTContractAddress],
                args
            });
        } catch (e) {
            expect(e).toContain("Could not borrow a reference to the NFT minter");
        }
    });

    test("Shouldn't be able to mint nft with incorrect ItemTemplateID", async () => {
        try {
            const args = [
                //recipient
                [DarkCountryContractAddress, t.Address],
                //ItemTemplateID
                [999, t.UInt64],
            ];

            await sendTransaction({
                code: mintNftTransaction,
                signers: [DarkCountryContractAddress],
                args
            });
        } catch (e) {
            expect(e).toContain("Cannot mintNFT: itemTemplate doesn't exist.");
        }
    });

    test("Should be able to mint nft", async () => {
        try {
            const users = [
                Alice,
                DarkCountryMarketContractAddress,
                DarkCountryMarketContractAddress
            ];

            for (const user of users) {
                const args = [
                    //recipient
                    [user, t.Address],
                    //ItemTemplateID
                    [itemTemplateId, t.UInt64],
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
            const args = [
                //userAddress
                [Alice, t.Address],
                //preOrders
                [
                    { key: itemTemplateId, value: 1 },
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
            const args = [
                //userAddress
                [Bob, t.Address],
                //preOrders
                [
                    { key: itemTemplateId, value: 1 },
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
            expect(e).toContain("Could not find pre ordered items");
        }
    });

    test("Should be able to buy pre ordered market item", async () => {
        try {
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
            expect(e).toContain("Could not find pre ordered items");
        }
    });

    test("Should be able to sell market pack", async () => {
        try {
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

function replaceImports(code) {
    return code
        .replace(`"${FungibleTokenPlaceholder}"`, defaultsByName.FungibleToken)
        .replace(`"${FlowTokenPlaceholder}"`, defaultsByName.FlowToken)
        .replace(`"${NonFungibleTokenPlaceholder}"`, NFTContractAddress)
        .replace(`"${DarkCountryPlaceholder}"`, DarkCountryContractAddress)
        .replace(`"${DarkCountryMarketPlaceholder}"`, DarkCountryMarketContractAddress);
}
