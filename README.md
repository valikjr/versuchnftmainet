# MySamuraiNFT: Automated NFT Minting Pipeline

This project showcases an end-to-end pipeline for generating, uploading, and minting NFTs on the **Base Mainnet** using JavaScript, Hardhat, and Pinata/IPFS. The workflow includes metadata generation, image upload, contract deployment, minting, and privacy-protected deployment.

## 📦 Project Structure

```
my-nft-project/
├── contracts/                # Smart contracts (MySamuraiNFT.sol)
├── imagespinatauno/         # JPEG images to be minted
├── metadata/                # Metadata files (auto-generated)
├── node_modules/            # Node dependencies (ignored in repo)
├── scripts/                 # Deployment and minting scripts
├── .env                     # Stores private JWT (ignored)
├── .gitignore               # Prevents uploading secrets and node_modules
├── cid-map.json             # Maps metadata filenames to CID
├── image-cids.json          # Maps images to IPFS CIDs
├── hardhat.config.js        # Hardhat setup
├── package.json             # Dependencies and scripts
```

## 🚀 Features

* ✅ Upload images to IPFS (Pinata)
* ✅ Generate matching metadata for each image
* ✅ Upload metadata to IPFS
* ✅ Mint all NFTs to a wallet on Base Mainnet
* ✅ Protect your API secrets with `.env`

## 🔧 Installation

```bash
git clone https://github.com/valikjr/versuchnftmainet.git
cd versuchnftmainet
npm install
```

## 🔐 Setup `.env`

Create a file named `.env` and add your Pinata JWT:

```
PINATA_JWT=your_pinata_jwt_token
```

## 🧪 Usage

### 1. Upload Images to IPFS

Place your `.jpeg` files inside `imagespinatauno/`, then run:

```bash
node uploadImages.js
```

### 2. Generate Metadata

```bash
node generateMetadata.js
```

### 3. Upload Metadata to IPFS

```bash
node uploadToPinata.js
```

### 4. Deploy Smart Contract to Base

```bash
npx hardhat run scripts/deploy.js --network base
```

### 5. Mint All NFTs

Edit your contract address in `mint.js`, then run:

```bash
node scripts/mint.js
```

## ⚠️ Security

Sensitive files like `.env` and `node_modules/` are excluded via `.gitignore` to ensure no secrets are uploaded to GitHub.

## 📄 License

MIT

## 📊 NFT Trait Analyse

Der Ordner [`analytics/`](./analytics) enthält:

- `traitFrequency.json` — Statistik der Merkmale aus den NFT-Metadaten
- `traitFrequency.png` — Balkendiagramm mit den Top 10 der häufigsten Merkmale

Die Analyse wird automatisch generiert durch:

- `analyzeMetadata.js` — zählt die Häufigkeit der Merkmale
- `generate_graph.py` — erstellt und speichert das Diagramm als PNG


---

