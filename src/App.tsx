import { Alert, Box, CircularProgress, Container, Snackbar } from '@mui/material';

import { clusterApiUrl, Connection } from '@solana/web3.js';
import { FC, useState } from 'react';
import BtnFaucet from './components/btn-faucet/btn-faucet';
import WalletInput from './components/wallet-input/wallet-input';
import logo from './assets/solanahub-logo.svg';
import Plausible from 'plausible-tracker';
const { trackPageview ,enableAutoPageviews } = Plausible()
trackPageview()
enableAutoPageviews();

require('./App.css');
const App: FC = () => {
    const [address, setAddress] = useState<any>("");
    const connection = new Connection(clusterApiUrl('devnet'));

    const [alertConfig, setAlertConfig] = useState({ open: false, message: null });
    const [isValid, setIsValid] = useState<boolean | any>();

    return (
        <div className="App">
            <Container maxWidth="sm">

                <h1>SOL ALL-IN Devnet Faucet</h1>
                <WalletInput address={address} setAddress={setAddress} setIsValid={setIsValid} />
                {isValid == false && <Alert severity="error">Invalid address</Alert>}
                <BtnFaucet walletAddress={address} isValid={isValid} connection={connection} setAlertConfig={setAlertConfig} />
                <Snackbar open={alertConfig.open} autoHideDuration={6000} onClose={() => setAlertConfig({ open: false, message: null })}>
                    <Alert severity="success" sx={{ width: '100%' }}>
                        {alertConfig.message}
                    </Alert>
                </Snackbar>
            </Container>
      <span id="love">built with Love by <a href="https://www.SolanaHub.app" target="_blank">
        <span id="logo">SolanaHub</span>
        <img src={logo} alt="solanhub logo"/></a>
      </span>
        </div>
    );
};
export default App;



