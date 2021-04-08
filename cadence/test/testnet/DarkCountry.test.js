require('dotenv').config();
import path from "path";

import * as t from "@onflow/types";

import { sendTransaction, init } from "flow-js-testing/dist";
import { executeScript } from "flow-js-testing/dist/utils/interaction";

import {
    DARK_COUNTRY,
    ALICE
} from "../constans";
import {
    configureAccount,
    getTransactionCodeByName,
    getScriptCodeByName
} from "./helpers";

const basePath = path.resolve(__dirname, "../../../cadence");

let DarkCountryContractAddress,
    Alice,

    setupAccountTransactionCode,
    createAssetTypeTransactionCode,
    mintNftTransactionCode,
    transferNftTransactionCode,

    readAllAssetTypesScriptCode,
    readAssetMetadataFieldValueScriptCode,
    readCollectionIdsScriptCode,
    readCollectionLengthScriptCode,
    readNextAssetTypeIdScriptCode,
    readNftAssetTypeIdScriptCode,
    readNftMetadataScriptCode,
    readNftSupplyCode,

    assetTypeId,
    mintedNftId

beforeAll(() => {
    init(basePath);
    jest.setTimeout(25000);
});

describe("DarkCountry Tests", () => {
    test("Get test accounts", () => {
        DarkCountryContractAddress = process.env.DARK_COUNTRY_ADDRESS;
        Alice = process.env.Alice_ADDRESS;

        expect(DarkCountryContractAddress).toBeTruthy();
        expect(Alice).toBeTruthy();
    });

    test("Get setupAccount transaction code", async () => {
        setupAccountTransactionCode = await getTransactionCodeByName({
            name: "DarkCountry/setup_account"
        });

        expect(setupAccountTransactionCode).toBeTruthy();
    });

    test("Get create asset type transaction code", async () => {
        createAssetTypeTransactionCode = await getTransactionCodeByName({
            name: "DarkCountry/create_asset_type"
        });

        expect(createAssetTypeTransactionCode).toBeTruthy();
    });

    test("Get mint nft transaction code", async () => {
        mintNftTransactionCode = await getTransactionCodeByName({
            name: "DarkCountry/mint_nft"
        });

        expect(mintNftTransactionCode).toBeTruthy();
    });

    test("Get transfer nfr transaction code", async () => {
        transferNftTransactionCode = await getTransactionCodeByName({
            name: "DarkCountry/transfer_nft"
        });

        expect(transferNftTransactionCode).toBeTruthy();
    });

    test("Get readAllAssetTypes script code", async () => {
        readAllAssetTypesScriptCode = await getScriptCodeByName({
            name: "DarkCountry/read_all_asset_types"
        });

        expect(readAllAssetTypesScriptCode).toBeTruthy();
    });

    test("Get readAssetMetadataFieldValue script code", async () => {
        readAssetMetadataFieldValueScriptCode = await getScriptCodeByName({
            name: "DarkCountry/read_asset_metadata_field_value"
        });

        expect(readAssetMetadataFieldValueScriptCode).toBeTruthy();
    });

    test("Get readCollectionIds script code", async () => {
        readCollectionIdsScriptCode = await getScriptCodeByName({
            name: "DarkCountry/read_collection_ids"
        });

        expect(readCollectionIdsScriptCode).toBeTruthy();
    });

    test("Get readCollectionLength script code", async () => {
        readCollectionLengthScriptCode = await getScriptCodeByName({
            name: "DarkCountry/read_collection_length"
        });

        expect(readCollectionLengthScriptCode).toBeTruthy();
    });

    test("Get readNextAssetTypeId script code", async () => {
        readNextAssetTypeIdScriptCode = await getScriptCodeByName({
            name: "DarkCountry/read_nextAssetTypeID"
        });

        expect(readNextAssetTypeIdScriptCode).toBeTruthy();
    });

    test("Get readNftAssetTypeId script code", async () => {
        readNftAssetTypeIdScriptCode = await getScriptCodeByName({
            name: "DarkCountry/read_nft_assettype_id"
        });

        expect(readNftAssetTypeIdScriptCode).toBeTruthy();
    });

    test("Get readNftMetadata script code", async () => {
        readNftMetadataScriptCode = await getScriptCodeByName({
            name: "DarkCountry/read_nft_metadata"
        });

        expect(readNftMetadataScriptCode).toBeTruthy();
    });

    test("Get readNftSupply script code", async () => {
        readNftSupplyCode = await getScriptCodeByName({
            name: "DarkCountry/read_nfts_supply"
        });

        expect(readNftSupplyCode).toBeTruthy();
    });

    test("Setup DarkCountry account", async () => {
        try {
            await configureAccount(DARK_COUNTRY);
            await sleep(5000);

            const { errorMessage } = await sendTransaction({
                code: setupAccountTransactionCode,
                signers: [DarkCountryContractAddress]
            });

            expect(errorMessage).toBe("");
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Setup Alice account", async () => {
        try {
            await configureAccount(ALICE);
            await sleep(5000);

            const { errorMessage } = await sendTransaction({
                code: setupAccountTransactionCode,
                signers: [Alice]
            });

            expect(errorMessage).toBe("");
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
                code: createAssetTypeTransactionCode,
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
                code: mintNftTransactionCode,
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

            const args = [
                //recipient
                [DarkCountryContractAddress, t.Address],
                //assetTypeID
                [assetTypeId, t.UInt64],
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
            await configureAccount(DARK_COUNTRY);
            await sleep(5000);

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
            await configureAccount(DARK_COUNTRY);
            await sleep(5000);

            const args = [
                //recipient
                [Alice, t.Address],
                //nftId
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
                code: readAllAssetTypesScriptCode
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
            await sleep(10000);

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

    test("Read next asset type id", async () => {
        try {
            const scriptResult = await executeScript({
                code: readNextAssetTypeIdScriptCode
            });

            expect(scriptResult).not.toBeNull();
            expect(scriptResult).not.toBeUndefined();
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Read nft asset type id", async () => {
        try {
            const args = [
                //account
                [Alice, t.Address],
                //itemID
                [mintedNftId, t.UInt64]
            ];

            const scriptResult = await executeScript({
                code: readNftAssetTypeIdScriptCode,
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

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
