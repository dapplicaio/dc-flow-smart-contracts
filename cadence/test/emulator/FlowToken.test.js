import path from "path";

import * as t from "@onflow/types";

import { deployContractByName, init, sendTransaction } from "flow-js-testing/dist";
import { getTransactionCode } from "flow-js-testing/dist/utils/file";
import { defaultsByName } from "flow-js-testing/dist/utils/file";
import { getAccountAddress } from "flow-js-testing/dist/utils/create-account";

import {
    DarkCountryPlaceholder,
    FlowTokenPlaceholder,
    FungibleTokenPlaceholder,
    NonFungibleTokenPlaceholder
} from "../constans";

const basePath = path.resolve(__dirname, "../../../cadence");

beforeAll(() => {
    init(basePath);
});

let DarkCountryContractAddress,
    NFTContractAddress,
    FlowTokenContractAddress,
    Alice,
    Bob,

    NFTContract,
    DarkCountryContract,

    transferTokensTransactionCode,
    setupAccountTransactionCode,
    mintFLowTokensTransactionCode

describe("Flow Token Tests", () => {
    test("Get test accounts", async () => {
        DarkCountryContractAddress = await getAccountAddress("DarkCountryContractAddress");
        NFTContractAddress = await getAccountAddress("NFTContractAddress");
        Alice = await getAccountAddress("Alice");
        Bob = await getAccountAddress("Bob");

        expect(DarkCountryContractAddress).toBeTruthy();
        expect(NFTContractAddress).toBeTruthy();
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

    test("Get setupAccount transaction code", async () => {
        setupAccountTransactionCode = replaceImports(
            await getTransactionCode({
                name: "DarkCountry/setup_account"
            })
        );

        expect(setupAccountTransactionCode).toBeTruthy();
    });

    test("Get mintFlowTokens transaction code", async () => {
        mintFLowTokensTransactionCode = replaceImports(
            await getTransactionCode({
                name: "flowToken/mint_flow_tokens"
            })
        );

        expect(mintFLowTokensTransactionCode).toBeTruthy();
    });

    test("Get transferTokens transaction code", async () => {
        transferTokensTransactionCode = replaceImports(
            await getTransactionCode({
                name: "flowToken/transfer_tokens"
            })
        );

        expect(transferTokensTransactionCode).toBeTruthy();
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

    test("Shouldn't be able to mint flow tokens", async () => {
        try {
            const args = [
                //recipient
                [Alice, t.Address],
                //amount
                ["1000.0", t.UFix64],
            ];

           await sendTransaction({
                code: mintFLowTokensTransactionCode,
                signers: [Bob],
                args
            });
        } catch (e) {
            expect(e).toContain("Signer is not the token admin");
        }
    });

    test("Should be able to mint flow tokens", async () => {
        try {
            const args = [
                //recipient
                [Alice, t.Address],
                //amount
                ["1000.0", t.UFix64],
            ];

            const { errorMessage } = await sendTransaction({
                code: mintFLowTokensTransactionCode,
                signers: [FlowTokenContractAddress],
                args
            });
        } catch (e) {
            console.log(e);
            expect(e).not.toBeTruthy();
        }
    });

    test("Shouldn't be able to withdraw more than the balance of the Vault", async () => {
        try {
            const args = [
                //amount
                ["30000.0", t.UFix64],
                //to
                [Alice, t.Address]
            ];

            await sendTransaction({
                code: transferTokensTransactionCode,
                signers: [Bob],
                args
            });
        } catch (e) {
            expect(e).toContain("Amount withdrawn must be less than or equal than the balance of the Vault");
        }
    });

    test("Should be able to withdraw more than the balance of the Vault", async () => {
        try {
            const args = [
                //amount
                ["100.0", t.UFix64],
                //to
                [Bob, t.Address]
            ];

            const { errorMessage, events } = await sendTransaction({
                code: transferTokensTransactionCode,
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
}
