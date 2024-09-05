import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TonConnectUIProvider
      manifestUrl="https://okx-tg.vercel.app/tonconnect-manifest.json"
      walletsListConfiguration={{
        includeWallets: [
          {
            appName: "okxTonWallet",
            name: "New OKX Wallet",
            imageUrl:
              "https://static.okx.com/cdn/assets/imgs/247/58E63FEA47A2B7D7.png",
            aboutUrl: "https://www.okx.com/web3",
            universalLink:
              "https://www.okx.com/download?appendQuery=true&deeplink=okx://web3/wallet/tonconnect",
            // bridgeUrl: storedValue,
            jsBridgeKey: "okxTonWallet",
            platforms: ["chrome", "safari", "firefox", "ios", "android"],
          },
        ],
      }}
    >
      <App />
    </TonConnectUIProvider>
  </StrictMode>
);
