require("dotenv").config();
const { ethers } = require("ethers");

const RPC_URL = "https://sepolia.base.org";
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = "0xd9145CCE52D386f254917e481eB44e9943F39138";
const ABI = [
  "function mintNFT(address recipient) public returns (uint256)"
];

async function main() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

  const recipient = wallet.address;
  const tx = await contract.mintNFT(recipient);
  console.log("Transaction sent:", tx.hash);

  const receipt = await tx.wait();
  console.log("NFT Minted. Transaction hash:", receipt.transactionHash);
}

main().catch((error) => {
  console.error("Error:", error);
});
