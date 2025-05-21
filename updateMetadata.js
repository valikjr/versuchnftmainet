const fs = require("fs");
const path = require("path");

const metadataFolder = "./metadata";
const imageCids = require("./image-cids.json");

imageCids.forEach(({ file, cid }) => {
  const id = path.parse(file).name; // "1.png" → "1"
  const metadataPath = path.join(metadataFolder, `${id}.json`);

  if (fs.existsSync(metadataPath)) {
    const data = JSON.parse(fs.readFileSync(metadataPath));
    data.image = cid; // вставляем ipfs://...
    fs.writeFileSync(metadataPath, JSON.stringify(data, null, 2));
    console.log(`✅ Updated metadata for ${id}.json`);
  } else {
    console.warn(`⚠️ ${id}.json not found`);
  }
});
