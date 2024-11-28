import { Eip1193Provider } from "ethers";

export * from "./useAddKaonNetworkToWallet";
export * from "./useConnectedAccount";

declare global {
  interface Window {
    ethereum?: Eip1193Provider;
  }
}
