import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Kaon Faucet",
        short_name: "Kaon Faucet",
        start_url: "/",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        description: "Kaon is a Bitcoin and UTXO native blockchain with cross-chain composability. Our mission is to create a stronger fidelity of on-chain transfers of Bitcoin assets. The result is a decentralized consensus layer that not only offers the first cryptographically secure mirrored BTC, but is also bridge-less and oracle-less to make Bitcoin ecosystem interoperability secure, composable and scalable.",
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