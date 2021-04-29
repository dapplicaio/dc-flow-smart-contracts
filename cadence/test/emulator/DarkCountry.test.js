import path from "path";

import * as t from "@onflow/types";

import { getTransactionCode, init, sendTransaction } from "flow-js-testing/dist";
import { getAccountAddress } from "flow-js-testing/dist/utils/create-account";
import { defaultsByName, getScriptCode } from "flow-js-testing/dist/utils/file";
import { executeScript } from "flow-js-testing/dist/utils/interaction";
import { deployContractByName } from "flow-js-testing/dist/utils/deploy-code";

import {
    DarkCountryPlaceholder,
    FlowTokenPlaceholder,
    FungibleTokenPlaceholder,
    NonFungibleTokenPlaceholder
} from "../constans";

const basePath = path.resolve(__dirname, "../../../cadence");

let NFTContractAddress,
    DarkCountryContractAddress,
    Alice,

    DarkCountryContract,
    NFTContract,

    createItemTemplateTransactionCode,
    mintNftTransactionCode,
    setupAccountTransactionCode,
    transferNftTransactionCode,

    readAllItemTemplatesScriptCode,
    readAssetMetadataFieldValueScriptCode,
    readCollectionIdsScriptCode,
    readCollectionLengthScriptCode,
    readNextItemTemplateIdScriptCode,
    readNftItemTemplateIdScriptCode,
    readNftMetadataScriptCode,
    readNftSupplyCode,

    itemTemplateId,
    mintedNftId

beforeAll(() => {
    init(basePath);
});

describe("DarkCountry Tests", () => {
    test("Get test accounts", async () => {
        NFTContractAddress = await getAccountAddress("NFTContractAddress");
        DarkCountryContractAddress = await getAccountAddress("DarkCountryContractAddress");
        Alice = await getAccountAddress("Alice");

        expect(NFTContractAddress).toBeTruthy();
        expect(DarkCountryContractAddress).toBeTruthy();
        expect(Alice).toBeTruthy();
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

    test("Get setupAccount transaction code", async () => {
        setupAccountTransactionCode = replaceImports(
            await getTransactionCode({
                name: "DarkCountry/setup_account"
            })
        );

        expect(setupAccountTransactionCode).toBeTruthy();
    });

    test("Get create item template transaction code", async () => {
        createItemTemplateTransactionCode = replaceImports(
            await getTransactionCode({
                name: "DarkCountry/create_item_template"
            })
        );

        expect(createItemTemplateTransactionCode).toBeTruthy();
    });

    test("Get mint nft transaction code", async () => {
        mintNftTransactionCode = replaceImports(
            await getTransactionCode({
                name: "DarkCountry/mint_nft"
            })
        );

        expect(mintNftTransactionCode).toBeTruthy();
    });

    test("Get transfer nfr transaction code", async () => {
        transferNftTransactionCode = replaceImports(
            await getTransactionCode({
                name: "DarkCountry/transfer_nft"
            })
        );

        expect(transferNftTransactionCode).toBeTruthy();
    });

    test("Get readAllItemTemplates script code", async () => {
        readAllItemTemplatesScriptCode = replaceImports(
            await getScriptCode({
                name: "DarkCountry/read_all_item_templates"
            })
        );

        expect(readAllItemTemplatesScriptCode).toBeTruthy();
    });

    test("Get readItemMetadataFieldValue script code", async () => {
        readAssetMetadataFieldValueScriptCode = replaceImports(
            await getScriptCode({
                name: "DarkCountry/read_item_metadata_field_value"
            })
        );

        expect(readAssetMetadataFieldValueScriptCode).toBeTruthy();
    });

    test("Get readCollectionIds script code", async () => {
        readCollectionIdsScriptCode = replaceImports(
            await getScriptCode({
                name: "DarkCountry/read_collection_ids"
            })
        );

        expect(readCollectionIdsScriptCode).toBeTruthy();
    });

    test("Get readCollectionLength script code", async () => {
        readCollectionLengthScriptCode = replaceImports(
            await getScriptCode({
                name: "DarkCountry/read_collection_length"
            })
        );

        expect(readCollectionLengthScriptCode).toBeTruthy();
    });

    test("Get readNextItemTemplateId script code", async () => {
        readNextItemTemplateIdScriptCode = replaceImports(
            await getScriptCode({
                name: "DarkCountry/read_nextItemTemplateID"
            })
        );

        expect(readNextItemTemplateIdScriptCode).toBeTruthy();
    });

    test("Get readNftItemTemplateId script code", async () => {
        readNftItemTemplateIdScriptCode = replaceImports(
            await getScriptCode({
                name: "DarkCountry/read_nft_itemtemplate_id"
            })
        );

        expect(readNftItemTemplateIdScriptCode).toBeTruthy();
    });

    test("Get readNftMetadata script code", async () => {
        readNftMetadataScriptCode = replaceImports(
            await getScriptCode({
                name: "DarkCountry/read_nft_metadata"
            })
        );

        expect(readNftMetadataScriptCode).toBeTruthy();
    });

    test("Get readNftSupply script code", async () => {
        readNftSupplyCode = replaceImports(
            await getScriptCode({
                name: "DarkCountry/read_nfts_supply"
            })
        );

        expect(readNftSupplyCode).toBeTruthy();
    });

    test("Setup accounts", async () => {
        try {
            const accounts = [
                DarkCountryContractAddress,
                Alice
            ];

            for (const account of accounts) {
                const { errorMessage } = await sendTransaction({
                    code: setupAccountTransactionCode,
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
                code: createItemTemplateTransactionCode,
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

    test("Shouldn't be able to mint nft with incorrect nft minter", async () => {
        try {
            const args = [
                //recipient
                [DarkCountryContractAddress, t.Address],
                //ItemTemplateID
                [itemTemplateId, t.UInt64],
            ];

            await sendTransaction({
                code: mintNftTransactionCode,
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
                //incorrect ItemTemplateID
                [999, t.UInt64],
            ];

            await sendTransaction({
                code: mintNftTransactionCode,
                signers: [DarkCountryContractAddress],
                args
            });
        } catch (e) {
            expect(e).toContain("Cannot mintNFT: itemTemplate doesn't exist.");
        }
    });

    test("Should be able to mint nft", async () => {
        try {
            const args = [
                //recipient
                [DarkCountryContractAddress, t.Address],
                //ItemTemplateID
                [itemTemplateId, t.UInt64],
            ];

            const { errorMessage, events } = await sendTransaction({
                code: mintNftTransactionCode,
                signers: [DarkCountryContractAddress],
                args
            });

            mintedNftId = events.find(data => !!data).data.id;

            expect(mintedNftId).not.toBeUndefined();
            expect(errorMessage).toBe("");
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Shouldn't be able to transfer non-existent nft", async () => {
        try {
            const args = [
                //recipient
                [Alice, t.Address],
                //nft id
                [999, t.UInt64],
            ];

            await sendTransaction({
                code: transferNftTransactionCode,
                signers: [DarkCountryContractAddress],
                args
            });
        } catch (e) {
            expect(e).toContain("missing NFT");
        }
    });

    test("Should be able to transfer nft", async () => {
        try {
            const args = [
                //recipient
                [Alice, t.Address],
                //nft id
                [mintedNftId, t.UInt64],
            ];

            const { errorMessage } = await sendTransaction({
                code: transferNftTransactionCode,
                signers: [DarkCountryContractAddress],
                args
            });

            expect(errorMessage).toBe("");
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Read all asset types", async () => {
        try {
            const scriptResult = await executeScript({
                code: readAllItemTemplatesScriptCode
            });

            expect(scriptResult).not.toBeNull();
            expect(scriptResult).not.toBeUndefined();
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Read asset metadata field value", async () => {
        try {
            const args = [
                //account
                [Alice, t.Address],
                //itemID
                [mintedNftId, t.UInt64],
                //fieldToSearch
                ["Name", t.String]
            ];

            const scriptResult = await executeScript({
                code: readAssetMetadataFieldValueScriptCode,
                args
            });

            expect(scriptResult).not.toBeNull();
            expect(scriptResult).not.toBeUndefined();
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Read collection ids", async () => {
        try {
            const args = [
                [DarkCountryContractAddress, t.Address]
            ];

            const scriptResult = await executeScript({
                code: readCollectionIdsScriptCode,
                args
            });

            expect(scriptResult).not.toBeNull();
            expect(scriptResult).not.toBeUndefined();
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Read collection length", async () => {
        try {
            const args = [
                [DarkCountryContractAddress, t.Address]
            ];

            const scriptResult = await executeScript({
                code: readCollectionLengthScriptCode,
                args
            });

            expect(scriptResult).not.toBeNull();
            expect(scriptResult).not.toBeUndefined();
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Read next item template id", async () => {
        try {
            const scriptResult = await executeScript({
                code: readNextItemTemplateIdScriptCode
            });

            expect(scriptResult).not.toBeNull();
            expect(scriptResult).not.toBeUndefined();
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Read nft item template id", async () => {
        try {
            const args = [
                //account
                [Alice, t.Address],
                //itemID
                [mintedNftId, t.UInt64]
            ];

            const scriptResult = await executeScript({
                code: readNftItemTemplateIdScriptCode,
                args
            });

            expect(scriptResult).not.toBeNull();
            expect(scriptResult).not.toBeUndefined();
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Read nft metadata", async () => {
        try {
            const args = [
                //address
                [Alice, t.Address],
                //itemID
                [mintedNftId, t.UInt64],
            ];

            const scriptResult = await executeScript({
                code: readNftMetadataScriptCode,
                args
            });

            expect(scriptResult).not.toBeNull();
            expect(scriptResult).not.toBeUndefined();
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Read nft supply", async () => {
        try {
            const scriptResult = await executeScript({
                code: readNftSupplyCode
            });

            expect(scriptResult).toBeTruthy();
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
}
