import React, { useState } from "react";
import Head from "next/head";

const Createbarang = () => {
  // For Dismiss Button with Alert
  const [visible, setVisible] = useState(true);

  const onDismiss = () => {
    setVisible(false);
  };

  return (
    <div>
      <Head>
        <title>Olah Data</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="bi bi-emoji-smile-fill" />
      </Head>
        <div>
        </div>
    </div>
  );
};


export default Createbarang;

