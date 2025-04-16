import { address, createSolanaRpc } from "@solana/kit";
import { getWhirlpoolAddress } from "@orca-so/whirlpools-client";
import { sqrtPriceToPrice } from "@orca-so/whirlpools-core";
import { fetchConcentratedLiquidityPool, fetchWhirlpoolsByTokenPair, setWhirlpoolsConfig } from "@orca-so/whirlpools";

import dotenv from "dotenv";

dotenv.config();

async function main() {
    // RPC에 연결을 초기화
    const rpc = createSolanaRpc(process.env.RPC_ENDPOINT_URL);
    await setWhirlpoolsConfig("solanaDevnet");

    // 토큰 정의
    // devToken specification
    // https://everlastingsong.github.io/nebula/
    const devSAMO = { mint: address("Jd4M8bfJG3sAkd82RsGWyEXoaBXQP7njFzBwEaCTuDa"), decimals: 9 };
    const devUSDC = { mint: address("BRjpCHtyQLNCo8gqRUr8jtdAj5AjPYQaoqbvcZiHok1k"), decimals: 6 };

    // devSAMO/devUSDC 풀 로드
    const whirlpools = await fetchWhirlpoolsByTokenPair(
        rpc,
        devSAMO.mint,
        devUSDC.mint,
    );

    // 풀의 현재 가격을 조회
    whirlpools.forEach(whirlpool => {
        const isInitialized = whirlpool.initialized;
        console.log("Whirlpool:", whirlpool.address);
        console.log("  - tickSpacing:", whirlpool.tickSpacing);
        console.log("  - isInitialized:", isInitialized);
        if (isInitialized) {
            console.log("  - Whirlpool data:")
            console.log("      sqrtPrice_x64:", whirlpool.sqrtPrice);
            console.log("      price: ", whirlpool.price);
        }
    })
}

main().catch(e => console.error("error:", e));
