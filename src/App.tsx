import "./App.css";
import { useEffect, useState } from "react";
import { Address } from "@ton/ton";
import { TonConnectButton } from "@tonconnect/ui-react";

function App() {
  const [connectInfo, setConnectInfo] = useState<TonAddressItemReply | null>(
    null
  );
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

  return (
    <>
      <h1>OKX x Telegram Mini App</h1>

      <div
        className="card"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>TonConnectButton</h2>
        <TonConnectButton />
      </div>

      <br />

      <div className="card">
        <h2>CustomConnectButton</h2>
        {!isConnected && (
          <button onClick={() => connectOKX()}>Connect OKX</button>
        )}

        {isConnected && (
          <button onClick={() => disconnect()}>Disconnect</button>
        )}

        {connectInfo && (
          <>
            <p>{address?.toRawString()}</p>
            <p>{rawAddress}</p>
          </>
        )}
      </div>
    </>
  );
}

export default App;
