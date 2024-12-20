import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Kaon Faucet",
        short_name: "Kaon Faucet",
        start_url: "/",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        description: "Official Kaon Testnet Faucet: Obtain test tokens by entering your MetaMask wallet address and specifying the desired amount. The interface also displays your Kaon UTXO format address corresponding to your Ethereum address, helping you seamlessly test and explore the Kaon network.",
        icons: [
            {
                "src": "icons/android-chrome-36x36.png",
                "sizes": "36x36",
                "type": "image/png"
            },
            {
                "src": "icons/android-chrome-48x48.png",
                "sizes": "48x48",
                "type": "image/png"
            },
            {
                "src": "icons/android-chrome-72x72.png",
                "sizes": "72x72",
                "type": "image/png"
            },
            {
                "src": "icons/android-chrome-96x96.png",
                "sizes": "96x96",
                "type": "image/png"
            },
            {
                "src": "icons/android-chrome-144x144.png",
                "sizes": "144x144",
                "type": "image/png"
            },
            {
                "src": "icons/android-chrome-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "icons/android-chrome-256x256.png",
                "sizes": "256x256",
                "type": "image/png"
            },
            {
                "src": "icons/android-chrome-384x384.png",
                "sizes": "384x384",
                "type": "image/png"
            },
            {
                "src": "icons/android-chrome-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ],
    }
}