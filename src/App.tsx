import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [address, setAddress] = useState<string>();
  const isConnected = Boolean(address);

  useEffect(() => {
    window.okxTonWallet.tonconnect.restoreConnection();

    window.okxTonWallet.tonconnect.listen((event) => {
      console.log(event);
      if (event.event === "connect") {
        const address = (event.payload.items[0] as TonAddressItemReply).address;
        setAddress(address);
      }

      if (event.event === "disconnect") {
        setAddress("");
      }
    });
  }, []);

  const connectOKX = async () => {
    await window.okxTonWallet.tonconnect.connect(2, {
      manifestUrl: "https://okx-conn-tg.vercel.app/tonconnect-manifest.json",
      items: [{ name: "ton_addr" }],
    });
  };

  const disconnect = () => {
    window.okxTonWallet.tonconnect.disconnect();
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {!isConnected && (
          <button onClick={() => connectOKX()}>Connect OKX</button>
        )}

        {isConnected && (
          <button onClick={() => disconnect()}>Disconnect</button>
        )}

        <p>{address}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
