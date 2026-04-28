# Desert Lost Civilization 360 View

Minimal street-view style 360 view experience for a continuous ancient desert civilization journey.

This is an experiment with GPT-5.5, GPT-Image-2, and Codex as an end-to-end immersive world-building workflow: generate connected 2:1 panoramic scenes, save them as local assets, then build a browser-based 360 walkthrough around them.

Inspired by Peter Gostev's GPT image 360 Babylon walkthrough:

- https://github.com/petergpt/gpt-image-360-babylon-walkthrough

## REPRODUCTION PROMPT

Use this prompt in Codex to generate a similar project from scratch:

```text
You are an expert immersive world builder and full-stack developer.

Build a minimal but high-quality 360 walkthrough called "Desert Lost Civilization 360 View".

Use GPT-5.5 for planning, code, prompt design, and project assembly.
Use GPT-Image-2 directly from Codex for image generation.
Do not fetch images from the internet.
All panorama images must be generated locally.

Create a continuous world made of 10 connected panoramic nodes.
Each image must be 2:1 equirectangular panorama suitable for a 360 viewer.
Save final viewer assets as:

images/node_1.jpg
images/node_2.jpg
images/node_3.jpg
images/node_4.jpg
images/node_5.jpg
images/node_6.jpg
images/node_7.jpg
images/node_8.jpg
images/node_9.jpg
images/node_10.jpg

World narrative flow:

1. Distant dunes
2. Ruined archway
3. Narrow sand path
4. Broken pillars corridor
5. Open courtyard
6. Dry fountain center
7. Hidden oasis reveal
8. Inner temple entrance
9. Rooftop / elevated view
10. Final sunset overlook

The route must feel like a real walk from node 1 to node 10.
Each scene must visually remember the previous and next location.
Keep the navigation graph mostly linear with back navigation:

node_1 -> node_2
node_2 -> node_1, node_3
node_3 -> node_2, node_4
node_4 -> node_3, node_5
node_5 -> node_4, node_6
node_6 -> node_5, node_7
node_7 -> node_6, node_8
node_8 -> node_7, node_9
node_9 -> node_8, node_10
node_10 -> node_9

Visual style:

- Ancient desert civilization
- Partially buried sandstone ruins
- Wind-blown sand
- Warm gold, sandstone, orange, and soft shadow palette
- Cinematic late afternoon to sunset lighting progression
- Ultra realistic, high detail, atmospheric depth
- No modern objects
- No people
- No text
- No idols, statues, faces, humanoid carvings, animal carvings, masks, or figure-like monuments

Camera rules:

- Eye-level perspective
- Wide lens, about 24mm equivalent
- Smooth forward progression like walking
- 2:1 panoramic, equirectangular, suitable for a 360 viewer
- The scene must be continuous in all directions
- No photo frame, no border, no cropped composition

For each node, create a JSON object with:

{
  "id": "node_1",
  "title": "...",
  "connections": ["node_2"],
  "prompt": "Ultra detailed cinematic 360 degree panoramic environment of ... The scene is continuous in all directions. In front: ... To the left: ... To the right: ... Behind: ... Ground: ... Sky: ... Style: ... Camera: ... Format: 2:1 panoramic, equirectangular, suitable for 360 viewer."
}

Generate all 10 images directly using GPT-Image-2 in Codex.
Copy the generated outputs into the local images folder as node_1.jpg through node_10.jpg.

Then create a single-file HTML viewer:

- File: index.html
- No build tools
- Real 360 equirectangular projection, not a flat sliding background
- Use WebGL or Three.js
- Load images/node_1.jpg through images/node_10.jpg
- Mouse/touch drag rotates the camera horizontally and vertically like Google Street View
- Mouse wheel and +/- buttons zoom in and out by changing camera FOV
- Add forward/back waypoints and a standard bottom navigation control bar
- Add dot navigation for all 10 nodes
- Smooth fade transition between nodes
- Keep the UI minimal, readable, and non-obstructive

Also create:

- data/world_nodes.json containing all nodes, connections, and image prompts
- README.md documenting the experiment, node graph, image generation method, and viewer behavior

After implementation:

- Verify every image exists locally
- Verify every image is 2:1
- Verify the viewer loads without a blank screen
- Verify drag left/right and up/down move in the expected direction
- Verify zoom works
- Verify forward/back node navigation works
```

## WORLD NODES

The complete node definitions, navigation graph, and GPT-Image-2 prompts are in:

- `data/world_nodes.json`

Navigation graph:

```text
node_1  -> node_2
node_2  -> node_1, node_3
node_3  -> node_2, node_4
node_4  -> node_3, node_5
node_5  -> node_4, node_6
node_6  -> node_5, node_7
node_7  -> node_6, node_8
node_8  -> node_7, node_9
node_9  -> node_8, node_10
node_10 -> node_9
```

Journey order:

```text
1. Distant Dunes
2. Ruined Archway
3. Narrow Sand Path
4. Broken Pillars Corridor
5. Open Courtyard
6. Dry Fountain Center
7. Hidden Oasis Reveal
8. Inner Temple Entrance
9. Rooftop Elevated View
10. Final Sunset Overlook
```

## IMAGE GENERATION

Images were generated directly with Codex image generation using the prompts in `data/world_nodes.json`; no internet image URLs were used.

Generated local viewer assets:

```text
images/node_1.jpg
images/node_2.jpg
images/node_3.jpg
images/node_4.jpg
images/node_5.jpg
images/node_6.jpg
images/node_7.jpg
images/node_8.jpg
images/node_9.jpg
images/node_10.jpg
```

All are 2:1 JPEG panoramas at `1774x887`.

For reproducible API regeneration, `scripts/generate_images.mjs` is included. It is optional and uses `gpt-image-2`, base64 image output, and local writes to `images/node_X.jpg`.

```bash
OPENAI_API_KEY=... node scripts/generate_images.mjs
```


## HTML VIEWER

The complete single-file viewer is:

- `index.html`

It loads `images/node_1.jpg` through `images/node_10.jpg`, uses real equirectangular projection, supports horizontal and vertical camera rotation, scroll or button FOV zoom, forward/back waypoint arrows, dot navigation, and smooth fade transitions.

Open `index.html` directly in a browser from this folder.
