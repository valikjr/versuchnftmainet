const fs = require("fs");
const path = require("path");

const cids = require("./image-cids.json");
const metadataDir = path.join(__dirname, "metadata");

if (!fs.existsSync(metadataDir)) {
  fs.mkdirSync(metadataDir);
}

cids.forEach((item, index) => {
  if (!item || !item.name || !item.cid) {
    console.warn(`⚠️ Пропущен элемент №${index + 1} (неполный объект)`);
    return;
  }

  const name = item.name.split(".")[0]; // без .jpeg
  const metadata = {
    name: name,
    description: "My Samurai NFT",
    image: `ipfs://${item.cid}`
  };

  const filePath = path.join(metadataDir, `${name}.json`);
  fs.writeFileSync(filePath, JSON.stringify(metadata, null, 2));
  console.log(`✅ Created ${name}.json`);
});

console.log("🎉 All metadata created.");
