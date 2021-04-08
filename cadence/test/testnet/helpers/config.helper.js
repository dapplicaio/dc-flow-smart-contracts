import { config } from "@onflow/config";

import { ALICE, BOB, DARK_COUNTRY, DARK_COUNTRY_MARKET } from "../../constans";

const setPrivateKeyAndAddressToConfig = async ({ address, privateKey }) => {
    await config().put("SERVICE_ADDRESS", address);
    await config().put("PRIVATE_KEY", privateKey);
}

export const configureAccount = async (name) => {
    switch (name) {
        case ALICE:
            return await setPrivateKeyAndAddressToConfig({
                address: process.env.Alice_ADDRESS,
                privateKey: process.env.Alice_PK
            });

        case BOB:
            return await setPrivateKeyAndAddressToConfig({
                address: process.env.Bob_ADDRESS,
                privateKey: process.env.Bob_PK
            });

        case DARK_COUNTRY:
            return await setPrivateKeyAndAddressToConfig({
                address: process.env.DARK_COUNTRY_ADDRESS,
                privateKey: process.env.DARK_COUNTRY_PK
            });

        case DARK_COUNTRY_MARKET:
            return await setPrivateKeyAndAddressToConfig({
                address: process.env.DARK_COUNTRY_MARKET_ADDRESS,
                privateKey: process.env.DARK_COUNTRY_MARKET_PK
            });
    }
}
