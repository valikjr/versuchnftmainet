const fs = require('fs');
const path = require('path');

const metadataDir = path.resolve(__dirname, '../metadata');
const outputFile = path.join(__dirname, 'traitFrequency.json');

const traitCounts = {};
let totalNFTs = 0;

fs.readdir(metadataDir, (err, files) => {
  if (err) {
    console.error('❌ Ошибка при чтении директории:', err.message);
    return;
  }

  files.forEach(file => {
    const filePath = path.join(metadataDir, file);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const metadata = JSON.parse(content);

      // проверка на наличие атрибутов
      if (!metadata.attributes || !Array.isArray(metadata.attributes)) {
        console.warn(`⚠️ Пропущен файл без attributes: ${file}`);
        return;
      }

      totalNFTs++;

      metadata.attributes.forEach(attr => {
        const traitType = attr.trait_type;
        const value = attr.value;

        if (!traitCounts[traitType]) {
          traitCounts[traitType] = {};
        }

        if (!traitCounts[traitType][value]) {
          traitCounts[traitType][value] = 0;
        }

        traitCounts[traitType][value]++;
      });
    } catch (e) {
      console.error(`❌ Ошибка в файле ${file}: ${e.message}`);
    }
  });

  const result = {
    totalNFTs,
    traitFrequency: traitCounts
  };

  fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
  console.log('✅ Статистика сохранена в:', outputFile);
});
