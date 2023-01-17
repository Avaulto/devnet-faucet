import { PublicKey } from '@solana/web3.js';
import React, { FC, useEffect, useState } from 'react'
import { Alert, Input } from '@mui/material';
interface WalletInputProps {
    address: string;
    setAddress: Function;
    setIsValid: Function;
}
const WalletInput: FC<WalletInputProps> = ({ address, setAddress, setIsValid }) => {

    const validateSolanaAddress = (addrs: string) => {
        let publicKey: PublicKey;
        try {
            publicKey = new PublicKey(addrs);
            return PublicKey.isOnCurve(publicKey.toBytes());
        } catch (err) {
            console.error(err);
            return false;
        }
    };
    useEffect(() => {
        if (address) {
            const isValid = validateSolanaAddress(address);
            setIsValid(isValid);
            console.log(isValid)
        }
    }, [address]);
    return (
        <Input color='secondary' placeholder='Wallet address' fullWidth onChange={value => { console.log(value); setAddress(value.target.value) }} />
    )
}

export default WalletInput