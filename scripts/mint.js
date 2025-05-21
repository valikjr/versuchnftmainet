require("dotenv").config();
const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0x6A247fF6409c53Df1147dcf1389dFa4504226087";
const recipient = "0x100CB390CCB307a15Caa3fe9E99CE9aE8BC8071F";
const tokenURI = "ipfs://bafybeiezrubbhs6hgjtaeu25pquyqbrhry6wc4mmbtxpl32bwpnccmxidq";

const ABI = [
  "function mintNFT(address recipient, string memory tokenURI) public returns (uint256)"
];

async function main() {
  const [signer] = await ethers.getSigners();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  const tx = await contract.mintNFT(recipient, tokenURI);
  console.log("Mint transaction sent:", tx.hash);

  const receipt = await tx.wait();
  console.log("✅ NFT Minted! Block:", receipt.blockNumber);
}

main().catch((error) => {
  console.error("Minting failed:", error);
  process.exitCode = 1;
});
