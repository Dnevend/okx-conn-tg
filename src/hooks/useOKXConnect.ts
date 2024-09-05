import { Address } from "@ton/ton";
import { useEffect, useState } from "react";

export const useOKXConnect = () => {
    const [connectInfo, setConnectInfo] = useState<TonAddressItemReply | null>(null)
    const isConnected = Boolean(connectInfo);
    const address = connectInfo ? Address.parse(connectInfo.address) : null;
    const rawAddress = address?.toString({ bounceable: false });

    useEffect(() => {
        window.okxTonWallet?.tonconnect.restoreConnection();

        window.okxTonWallet?.tonconnect.listen((event) => {
            console.log(event);
            if (event.event === "connect") {
                const replay = event.payload.items[0] as TonAddressItemReply;
                setConnectInfo(replay);
            }

            if (event.event === "disconnect") {
                setConnectInfo(null);
            }
        });
    }, []);

    const connectOKX = async () => {
        await window.okxTonWallet?.tonconnect.connect(2, {
            manifestUrl: "https://okx-tg.vercel.app/tonconnect-manifest.json",
            items: [{ name: "ton_addr" }],
        });
    };

    const disconnect = () => {
        window.okxTonWallet?.tonconnect.disconnect();
    };

    return { connectOKX, disconnect, connectInfo, isConnected, address, rawAddress };
}