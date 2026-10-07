# New asset provenance and validation

The four new atlases were created with the built-in image-generation tool on 3 October 2026. The original Cinder atlas was supplied as a pixel-style and six-pose arrangement reference. No franchise image, insignia or character design was supplied. The original six atlas bytes are unchanged.

Project-bound outputs:
- `public/assets/sprites/shadowlurker-atlas.png`
- `public/assets/sprites/votive-atlas.png`
- `public/assets/sprites/pitjack-atlas.png`
- `public/assets/sprites/ironhaul-atlas.png`

## Prompt set

Shared brief: create a new 1536×1024 RGBA sprite atlas in the established crisp retro industrial pixel style, stepped dark outlines and restrained shading. Six separated poses: portrait, idle, strike across the top; block, hit, defeat across the bottom. Combat poses face right. Keep the entire character and weapon within each intended region, consistent physical scale, clear transparent gaps, no labels, grid, backdrop, floor, shadows, insignia, watermark, painterly texture, 3D or anime treatment. Request real alpha transparency.

- Shadowlurker: slender assassin in charcoal fitted work leathers, short slate shoulder cowl and cloth collar, narrow teal visor, dull brass belt, short steel knife. A targeted second pass removed the long robe, exposed separate slim trouser legs and replaced the hooked blade with a forearm-length straight dagger. This distinguishes its silhouette from Cinder.
- Votive: shaved-headed industrial preacher, cream canvas long work vest, dark plum trousers, copper cuffs, plain brass belt bell, heavy bronze geometric stamping staff. No cross, faction or religious insignia.
- Pitjack: stocky veteran worker, amber hard hat and square lamp, moss-green shirt, brown work overalls, steel boots, beard, two-handed industrial digging pick with chisel and pointed ends.
- Ironhaul: massive augmented industrial human laborer, small bare head with gray hair, broad steel-blue harness, one large hydraulic prosthetic arm, exposed pistons, dark trousers, orange work boots and rectangular piston hammer. No skulls or faction symbols.

## Metadata and quality checks

All four are 1536×1024 RGBA and more than 50% fully transparent. The SHA-256 hashes and measured alpha-zero fractions are in ASSET_MANIFEST.json. No source PNG was resized, painted over or recompressed during integration.

`scripts/manifest-new-atlases.py` measures connected foreground components and exact nonuniform bounding rectangles. Votive and Ironhaul have overlapping bounding rectangles in the hit/defeat regions; convex polygon masks remove neighboring components without clipping any target opaque pixels. The 24-frame validation report records zero neighboring opaque pixels after masking and zero own opaque pixels removed.

Pitjack's idle pick extends below the boot soles. Its pivot is anchored to the actual source foot plane, y=480, instead of mechanically using the bottom of the rectangle. The existing renderer already supports this local pivot; no renderer behavior was changed.

The diagnostic contact sheet now renders 10×6=60 frames and was inspected. Automated tests cover source hashes, dimensions, mask bounds, pivots, right-facing/mirrored rendering and arena geometry at 320/390/768/1280 widths. Real browser screenshots and interaction results must be assessed separately from these numerical checks.
