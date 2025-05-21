require("dotenv").config();
const { ethers } = require("hardhat");
const fs = require("fs");

const CONTRACT_ADDRESS = "0x2cFB960445C4b707739E1C694F9f046b5832b882"; // твой адрес контракта
const WALLET_ADDRESS = "0x100CB390CCB307a15Caa3fe9E99CE9aE8BC8071F"; // адрес получателя
const cidMap = require("./cid-map.json");

async function main() {
  const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contract = await ethers.getContractAt("MySamuraiNFT", CONTRACT_ADDRESS, wallet);

  for (const item of cidMap) {
    const tokenURI = `ipfs://${item.cid}`;
    const tx = await contract.mintNFT(WALLET_ADDRESS, tokenURI);
    await tx.wait();
    console.log(`✅ Minted NFT with URI: ${tokenURI}`);
  }
}

main().catch(console.error);
