import { ethers } from "ethers";

/*
 * connects to a wallet to provide funds
 */
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL as string);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);
export default wallet;
