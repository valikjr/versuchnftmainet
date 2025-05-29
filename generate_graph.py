import json
import matplotlib.pyplot as plt
from collections import Counter

# Загрузка JSON
with open("analytics/traitFrequency.json", "r") as f:
    data = json.load(f)

trait_data = data["traitFrequency"]
flat_counter = Counter()
for trait_type, values in trait_data.items():
    for value, count in values.items():
        flat_counter[f"{trait_type}: {value}"] = count

top_traits = flat_counter.most_common(10)
labels = [item[0] for item in top_traits]
counts = [item[1] for item in top_traits]

# График
plt.figure(figsize=(10, 6))
plt.barh(labels, counts)
plt.xlabel("Количество")
plt.title("Топ 10 признаков в NFT-коллекции")
plt.gca().invert_yaxis()
plt.tight_layout()
plt.grid(axis='x')
plt.savefig("analytics/traitFrequency.png")
print("✅ График сохранён как analytics/traitFrequency.png")
