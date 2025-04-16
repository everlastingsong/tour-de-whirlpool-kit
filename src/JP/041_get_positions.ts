import { createKeyPairSignerFromBytes, createSolanaRpc } from "@solana/kit";
import { fetchPositionsForOwner } from "@orca-so/whirlpools";

import dotenv from "dotenv";
import secret from "../../wallet.json";

dotenv.config();

async function main() {
    // RPC へのコネクション作成
    const rpc = createSolanaRpc(process.env.RPC_ENDPOINT_URL);
    const signer = await createKeyPairSignerFromBytes(new Uint8Array(secret));
    console.log('wallet address:', signer.address);

    // ポジションのアドレスを出力
    const positions = await fetchPositionsForOwner(rpc, signer.address);
    console.log("positions:", positions);
}

main().catch(console.error);
