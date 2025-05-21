require("dotenv").config();
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const PINATA_JWT = process.env.PINATA_JWT;
const METADATA_FOLDER = "./metadata";

async function uploadMetadata(filePath) {
  const json = JSON.parse(fs.readFileSync(filePath));
  const fileName = path.basename(filePath);

  const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", json, {
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`,
      "Content-Type": "application/json"
    }
  });

  return { file: fileName, cid: res.data.IpfsHash };
}

async function main() {
  const files = fs.readdirSync(METADATA_FOLDER).filter(f => f.endsWith(".json"));
  const results = [];

  for (const file of files) {
    const fullPath = path.join(METADATA_FOLDER, file);
    const { file: f, cid } = await uploadMetadata(fullPath);
    console.log(`✅ Uploaded ${f} → ipfs://${cid}`);
    results.push({ file: f, cid: `ipfs://${cid}` });
  }

  fs.writeFileSync("cid-map.json", JSON.stringify(results, null, 2));
  console.log("📝 Saved to cid-map.json");
}

main().catch(console.error);
