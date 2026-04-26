#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const nodesPath = path.join(rootDir, "data", "world_nodes.json");
const outputDir = path.join(rootDir, "images");

const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_IMAGE_MODEL || "gpt-image-2";
const size = process.env.OPENAI_IMAGE_SIZE || "2048x1024";
const quality = process.env.OPENAI_IMAGE_QUALITY || "high";

if (!apiKey) {
  console.error("Missing OPENAI_API_KEY. Set it before running this script.");
  process.exit(1);
}

const nodes = JSON.parse(await fs.readFile(nodesPath, "utf8"));
await fs.mkdir(outputDir, { recursive: true });

for (const node of nodes) {
  const outputPath = path.join(outputDir, `${node.id}.jpg`);
  console.log(`Generating ${node.id}: ${node.title}`);

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      prompt: node.prompt,
      size,
      quality,
      output_format: "jpeg",
      response_format: "b64_json"
    })
  });

  const result = await response.json();

  if (!response.ok) {
    console.error(JSON.stringify(result, null, 2));
    process.exit(1);
  }

  const imageBase64 = result?.data?.[0]?.b64_json;
  if (!imageBase64) {
    console.error(`The API response for ${node.id} did not include b64_json.`);
    console.error("This script intentionally avoids image URLs. Check model/API support for base64 image output.");
    process.exit(1);
  }

  await fs.writeFile(outputPath, Buffer.from(imageBase64, "base64"));
  console.log(`Saved ${outputPath}`);
}

console.log("Done. Generated 10 local 2:1 panorama images in /images.");
