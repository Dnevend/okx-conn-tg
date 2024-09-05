import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import "./App.css";
import { Address, toNano } from "@ton/ton";
import { useState } from "react";
import toast from "react-hot-toast";

function App() {
  const wallet = useTonWallet();
  const [connectUi] = useTonConnectUI();
  const rawAddress = wallet
    ? Address.parse(wallet?.account.address).toString({ bounceable: false })
    : null;

  const [txAddress, setTxAddress] = useState<string>("");
  const [txAmount, setTxAmount] = useState<number>(0.01);
  const [txRes, setTxRes] = useState<string>("");

  const sendTransaction = async () => {
    if (!txAddress) {
      toast.error("Please input target address!");
      return;
    }
    if (!txAmount) {
      toast.error("Please input tx amount!");
      return;
    }

    const res = await connectUi.sendTransaction({
      // The transaction is valid for 10 minutes from now, in unix epoch seconds.
      validUntil: Math.floor(Date.now() / 1000) + 600,
      messages: [
        {
          address: txAddress,
          amount: toNano(txAmount).toString(),
        },
      ],
    });
    toast.success("Transaction sent!");
    setTxRes(JSON.stringify(res));
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
        {wallet ? (
          <button onClick={() => connectUi.disconnect()}>Disconnect</button>
        ) : (
          <button
            onClick={() => connectUi.openSingleWalletModal("okxTonWallet")}
          >
            Connect OKX
          </button>
        )}
        {wallet && (
          <>
            <p>{rawAddress}</p>
            <button onClick={() => sendTransaction()}>Send Transaction</button>
            <br />
            <input
              placeholder="Receive Address"
              value={txAddress}
              onChange={(e) => setTxAddress(e.target.value)}
            />
            <br />
            <input
              type="number"
              placeholder="Amount"
              value={txAmount}
              onChange={(e) => setTxAmount(Number(e.target.value))}
            />
          </>
        )}
        <pre style={{ wordBreak: "break-all" }}>{txRes}</pre>
      </div>
    </>
  );
}

export default App;
