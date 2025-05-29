const { ethers } = require("hardhat");
const fs = require("fs");
require("dotenv").config();

async function main() {
  const contractAddress = "0x2cFB960445C4b707739E1C694F9f046b5832b882"; // твой контракт
  const walletAddress = "0x100CB390CCB307a15Caa3fe9E99CE9aE8BC8071F"; // твой кошелёк

  const contract = await ethers.getContractAt("MySamuraiNFT", contractAddress);

  const cidMap = JSON.parse(fs.readFileSync("cid-map.json", "utf8"));

  for (const item of cidMap) {
    const metadataURI = `ipfs://${item.cid}`;
    const tx = await contract.mintNFT(walletAddress, metadataURI);
    await tx.wait();
    console.log(`✅ Minted ${item.file} → ${metadataURI}`);
  }

  console.log("🏁 All NFTs minted!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
