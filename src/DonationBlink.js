import React, { useState } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

const DONATION_WALLET = new PublicKey("ELZpXiKPTp4AMcd1ZCe46wttNCUfgUy3wZUe1o2EjvRt");

const DonationBlink = () => {
  const [amount, setAmount] = useState('');

  const handleDonation = async () => {
    try {
      const connection = new Connection("https://api.mainnet-beta.solana.com");
      const fromWallet = window.solana; // Kullanıcının Phantom cüzdanı (örneğin, Phantom Wallet)

      if (!fromWallet) {
        alert("Lütfen Phantom cüzdanınızı bağlayın!");
        return;
      }

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromWallet.publicKey,
          toPubkey: DONATION_WALLET,
          lamports: amount * 1e9, // SOL -> Lamports çevirimi
        })
      );

      const { signature } = await fromWallet.signAndSendTransaction(transaction);
      console.log(`İşlem başarıyla gönderildi: ${signature}`);
    } catch (error) {
      console.error("Bağış sırasında hata oluştu:", error);
    }
  };

  return (
    <div>
      <h1>Bağış Yap</h1>
      <input
        type="number"
        placeholder="Bağış Miktarı (SOL)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleDonation}>Bağış Yap</button>
    </div>
  );
};

export default DonationBlink;
