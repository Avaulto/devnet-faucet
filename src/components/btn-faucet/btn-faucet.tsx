import React, { FC } from 'react'
import { keypairIdentity, Metaplex } from "@metaplex-foundation/js";
import { BlockheightBasedTransactionConfirmationStrategy, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionBlockhashCtor } from '@solana/web3.js';
import { Box, Button } from '@mui/material';
import { MINT_SIZE, TOKEN_PROGRAM_ID, getMinimumBalanceForRentExemptMint, createInitializeMintInstruction, createMint } from '@solana/spl-token';



interface BtnFaucetProps {
    walletAddress: string;
    isValid: boolean;
    connection: Connection
    setAlertConfig: Function;
}

const BtnFaucet: FC<BtnFaucetProps> = ({ walletAddress, connection, setAlertConfig, isValid }) => {

    const confirmAndFinalize = async (signature: string) => {
        const { lastValidBlockHeight, blockhash } = await connection.getLatestBlockhash();
        const config: BlockheightBasedTransactionConfirmationStrategy = {
            signature, blockhash, lastValidBlockHeight//.lastValidBlockHeight
        }
        const confim = await connection.confirmTransaction(config, 'finalized');
        console.log(confim)
    }
    const requestAirdrop = async (address: string) => {
        try {
            const signature = await connection.requestAirdrop(
                new PublicKey(address),
                LAMPORTS_PER_SOL
            );

            await confirmAndFinalize(signature);
            setAlertConfig({ open: true, message: 'Airdrop sol to account' });
        } catch (err: any) {
            console.error(err)

        }
    }
    const handleAirdrop = () => {
        requestAirdrop(walletAddress)
    }
    const createDemoAccount = () => {
        const keypair = Keypair.generate();
        return keypair;
    };
    const requestNft = async () => {
        // create middleware account
        const feePayer = createDemoAccount()
        // airdrop this account
        await requestAirdrop(feePayer.publicKey.toBase58())

        // init metaplex instance
        const mx = new Metaplex(connection);
        mx.use(keypairIdentity(feePayer));
        const { nft } = await mx
            .nfts()
            .create({
                tokenOwner: new PublicKey(walletAddress),
                isCollection: true,
                uri: "https://yyuf64d3dxl7pzwpyvwb24vqgztrxci5w3rvubbogt5s2d2m3weq.arweave.net/xihfcHsd1_fmz8VsHXKwNmcbiR2241oELjT7LQ9M3Yk",
                name: "Avaulto faucet NFT",
                sellerFeeBasisPoints: 500, // Represents 5.00%.
            })
        console.log(nft)
        setAlertConfig({ open: true, message: 'Airdrop NFT to account' });
    }

    const mintSPL = async () => {
        // create middleware account
        const feePayer = createDemoAccount();

        // airdrop this account
        await requestAirdrop(feePayer.publicKey.toBase58())

        const mint = Keypair.generate();
        console.log(`mint: ${mint.publicKey.toBase58()}`);
        const { lastValidBlockHeight, blockhash } = await connection.getLatestBlockhash();
        const txArgs: TransactionBlockhashCtor = { feePayer: feePayer.publicKey, blockhash, lastValidBlockHeight: lastValidBlockHeight }

        // 1) use build-in function
        let mintPubkey = await createMint(
            connection, // conneciton
            feePayer, // fee payer
            new PublicKey(walletAddress), // mint authority
            new PublicKey(walletAddress), // freeze authority (you can use `null` to disable it. when you disable it, you can't turn it on again)
            8 // decimals
        );
        console.log(`mint: ${mintPubkey.toBase58()}`);

        setAlertConfig({ open: true, message: 'Airdrop SPL to account' });
    }
    return (
        <>
            <Box style={{display:'flex', justifyContent:'space-between'}} sx={{ m:4, p: 2, border: '1px dashed grey' }}>
                <Button onClick={handleAirdrop} disabled={!isValid} color={'success'} variant="contained">Get 1 SOL</Button>
                <Button onClick={requestNft} disabled={!isValid} color={'secondary'} variant="contained">Get 1 NFT</Button>
                <Button onClick={mintSPL} disabled={!isValid} color={'primary'} variant="contained">Mint & get SPL</Button>
            </Box>

        </>
    )
}

export default BtnFaucet