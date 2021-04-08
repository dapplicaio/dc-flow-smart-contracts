import { getTransactionCode } from "flow-js-testing/dist";
import { getScriptCode } from "flow-js-testing/dist/utils/file";

import {
    DarkCountryMarketPlaceholder,
    DarkCountryPlaceholder,
    FlowTokenPlaceholder,
    FungibleTokenPlaceholder,
    NonFungibleTokenPlaceholder
} from "../../constans";

const replaceImports = (code) => {
    return code
        .replace(`"${FungibleTokenPlaceholder}"`, process.env.FUNGIBLE_TOKEN_ADDRESS)
        .replace(`"${FlowTokenPlaceholder}"`, process.env.FLOW_TOKEN_ADDRESS)
        .replace(`"${NonFungibleTokenPlaceholder}"`, process.env.NON_FUNGIBLE_TOKEN_ADDRESS)
        .replace(`"${DarkCountryPlaceholder}"`, process.env.DARK_COUNTRY_ADDRESS)
        .replace(`"${DarkCountryMarketPlaceholder}"`, process.env.DARK_COUNTRY_MARKET_ADDRESS);
}

export const getTransactionCodeByName = async ({ name }) => {
    let transactionCode = await getTransactionCode({ name });

    transactionCode = replaceImports(transactionCode);

    return transactionCode;
}

export const getScriptCodeByName = async ({ name }) => {
    let scriptCode = await getScriptCode({ name });

    scriptCode = replaceImports(scriptCode);

    return scriptCode;
}
