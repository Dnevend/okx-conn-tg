interface TonConnectBridge {
    deviceInfo: DeviceInfo;
    walletInfo?: WalletInfo;
    protocolVersion: number;
    connect(protocolVersion: number, message: ConnectRequest): Promise<ConnectEvent>;
    disconnect(): Promise<void>;
    restoreConnection(): Promise<ConnectEvent>;
    send(message: AppRequest): Promise<WalletResponse>;
    listen(callback: (event: WalletEvent) => void): () => void;
}

interface Window {
    okxTonWallet?: {
        tonconnect: TonConnectBridge
    };
}

