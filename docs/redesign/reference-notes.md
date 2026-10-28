# Gate 1 — Reference notes

What was studied, which principles transfer, and what we deliberately do not take.

## Sources and how they were inspected

| Source | Method |
| --- | --- |
| basement.studio/post/new-digital-hq-pt-1 | Full article text read (May 2025 write-up of their 3D office site). |
| basement.studio | Page text read. A headless Chrome render timed out: the WebGL office does not settle without a GPU. Visual judgment of the current site is therefore from the write-up's description, not a capture. |
| old.basement.studio | Text read and rendered at 1440×900 (capture kept outside the repo; it is their work). |
| 2022.basement.studio | Text read: structure, rhythm, award table, project list. |

## Principles worth taking

1. **Constraints as the aesthetic.** They chose a PS2-era look partly because it keeps the scene light: low-poly geometry, small textures, baked lighting. For us: flat-shaded SVG isometrics with three tones per object and stepped motion at about 8 fps (study B) are both the period look and the reason the page stays fast. No WebGL is needed for any of the three studies.
2. **Bake the expensive part.** Light-maps and ambient occlusion are painted into textures instead of computed live. For us: the shading and drafting are authored once in SVG and CSS; the only runtime work is a small state machine per study.
3. **Inspectable objects carry meaning.** Their office is scattered with clickable objects that reveal culture and projects. For us, every inspectable thing explains an operation: department layers with in / does / out (A), stage lamps and the van (B), drafted fields that fill with data (C).
4. **Navigation through the scene, not a menu bolted on.** They dropped their section menu in favor of clicking through the room. For us: the hero artifact links into the story ("Explore the systems" goes to the artifact), and in B the hardware keys *are* the demo controls.
5. **Split visual layers and a wireframe placeholder.** They render the office as a wireframe while the full scene loads, and keep the 3D layer separate from 2D content. For us: every study is server-rendered and complete before JavaScript arrives. C takes the idea furthest, since its wireframe layer *is* the content: a drawing that becomes the working system.
6. **A restrained "lab" voice for experiments.** Amber-screen, DOS-like styling is reserved for their experiments section. For us: retro computing is an accent with a job (one work order in A, one terminal in B, one pointer in C), never the whole page.
7. **Type as structure** (old and 2022 sites). Oversized type is used as architecture rather than labels. We take the scale and confidence, not the letterforms.

## What we do not take

- Their typefaces: Basement Grotesque, and Geist as a display signature (Geist was co-designed by basement for Vercel). Geist appears only as UI text inside study C's application.
- Mixed solid and outlined oversized caps, RGB-split or chromatic-aberration glitching, floating wireframe polyhedra, rotated vertical side text.
- Their orange. Our `--signal #EF875C` is softer and used only for active state: the job thread, the build line, the active lamp, a review flag.
- PS2-style 3D office rooms, avatar scans, point-and-click exploration, ambient soundtracks.
- Irreverent copy ("cool shit that performs"). Our buyer runs payroll; the voice stays calm and specific.
- Client-logo walls and award tables. We have nothing comparable to show yet and will not imitate one.

## Our own vocabulary (what replaces it)

The buyer's world already has a visual language: **construction documents and dispatch offices.** Title blocks, zone markers, revision clouds, "Scale: NTS", work orders on tractor-feed paper, terminal job logs, yard maps. Those references are original to this audience, carry meaning on sight for a contractor or distributor, and are nobody's trade dress. Each study draws from that vocabulary at a different intensity:

- **A — Technical Atelier:** construction drawing set. The most editorial and the most restrained.
- **B — The Control Room:** dispatch desk hardware. The most nostalgic.
- **C — The Living Blueprint:** blueprint print plus product UI. The most directly tied to the signature interaction.
