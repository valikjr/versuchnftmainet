require("dotenv").config();
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");

const PINATA_JWT = process.env.PINATA_JWT;
const FOLDER = "./imagespinatauno";

async function uploadImage(filePath) {
  const form = new FormData();
  form.append("file", fs.createReadStream(filePath));

  const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", form, {
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`,
      ...form.getHeaders()
    }
  });

  return res.data.IpfsHash;
}

async function main() {
  const files = fs.readdirSync(FOLDER).filter(f => f.endsWith(".png") || f.endsWith(".jpg"));
  const result = [];

  for (const file of files) {
    const fullPath = path.join(FOLDER, file);
    const cid = await uploadImage(fullPath);
    console.log(`✅ Uploaded ${file} → ipfs://${cid}`);
    result.push({ file, cid: `ipfs://${cid}` });
  }

  fs.writeFileSync("image-cids.json", JSON.stringify(result, null, 2));
  console.log("📝 Saved to image-cids.json");
}

main().catch(console.error);
