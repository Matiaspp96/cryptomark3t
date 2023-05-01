import { Client } from "wagmi";

export const getUserInfo = async (client: Client) => {
    return await client.connectors[0].options.web3AuthInstance.getUserInfo();
}