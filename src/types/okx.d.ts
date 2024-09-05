/* eslint-disable @typescript-eslint/no-explicit-any */
interface AppRequest {
    method: string;
    params: string[];
    id: string;
}

interface WalletEvent {
    event: WalletEventName;
    id: number; // 递增的事件计数器
    payload: any; // 每个事件特定的载荷
}

type WalletEventName = 'connect' | 'connect_error' | 'disconnect';

type ConnectRequest = {
    manifestUrl: string;
    items: ConnectItem[], // 与应用共享的数据项
}

type ConnectItem = TonAddressItem | TonProofItem

type TonAddressItem = {
    name: "ton_addr";
}

type TonProofItem = {
    name: "ton_proof";
    payload: string; // 任意载荷，例如 nonce + 过期时间戳。
}



type ConnectEvent = ConnectEventSuccess | ConnectEventError;

type ConnectEventSuccess = {
    event: "connect";
    id: number; // 递增的事件计数器
    payload: {
        items: ConnectItemReply[];
        device: DeviceInfo;
    }
}

type ConnectEventError = {
    event: "connect_error",
    id: number; // 递增的事件计数器
    payload: {
        code: number;
        message: string;
    }
}

// 与 window.okxTonWallet.tonconnect 对象上的 deviceInfo 完全相同
type DeviceInfo = {
    platform: "iphone" | "ipad" | "android" | "windows" | "mac" | "linux";
    appName: string;
    appVersion: string;
    maxProtocolVersion: number;
    features: Feature[];
}

type Feature = { name: 'SendTransaction', maxMessages: number } // `maxMessages` 是钱包支持的一次 `SendTransaction` 中的最大消息数

type ConnectItemReply = TonAddressItemReply | TonProofItemReply;

// 由钱包返回的不受信任的数据。
// 如果您需要保证用户拥有此地址和公钥，您需要额外请求 ton_proof。
type TonAddressItemReply = {
    name: "ton_addr";
    address: string; // TON 地址原始 (`0:<hex>`)
    network: NETWORK; // 网络 global_id
    publicKey: string; // HEX 字符串，不带 0x
    walletStateInit: string; // Base64（不安全 URL）编码的钱包合约的 stateinit cell
}

type TonProofItemReply = {
    name: "ton_proof";
    proof: {
        timestamp: string; // 签名操作的 64 位 unix epoch 时间（秒）
        domain: {
            lengthBytes: number; // AppDomain 长度
            value: string;  // 应用域名（作为 url 部分，无编码）
        };
        signature: string; // base64 编码的签名
        payload: string; // 请求中的载荷
    }
}

// 目前仅支持主网
enum NETWORK {
    MAINNET = '-239',
    TESTNET = '-3'
}