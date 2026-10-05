# AURA HOROLOGY — 3D Exploded Luxury Watch Experience

A scroll-driven, 3D luxury watch website featuring an exploded view disassembly and reassembly sequence built with Three.js, React Three Fiber, GSAP ScrollTrigger, Lenis, and Tailwind CSS.

---

## 🌟 Features

- **Exploded View Disassembly (15% – 70% Scroll):**
  - Smoothly disassembles the watch along the Y/X/Z axes as you scroll down:
    - **Double-Domed Sapphire Crystal** (lifts upward with anti-reflective coating)
    - **Mirror-Polished Bezel Ring** (separates along +Y)
    - **Faceted Dauphine Hands & Pinion** (separate along +Y)
    - **Sunburst Guilloché Dial** (revealing sub-dials and tourbillon aperture)
    - **Calibre 3201 Mechanical Movement** (rhodium bridges, ruby jewels, rotating balance wheel, gear train, and 22K gold skeleton rotor)
    - **Exhibition Titanium Case Back** (moves downward along -Y)
    - **Knurled Winding Crown** (slides outward along +X)
    - **Hand-Stitched Alligator Straps & Lugs** (extend outwards along ±Z)
- **Interactive Detail Callouts:**
  - Dynamic glassmorphic technical spec cards with connecting pointer lines fade in and out at each stage of the exploded view.
- **Reverse Reassembly (70% – 88% Scroll):**
  - Scrolling back up (or continuing through 70%–88%) flies every component back into place with precision horological alignment.
- **Final Showcase & Acquisition (88% – 100% Scroll):**
  - Product specifications sheet, real-time finish customizer (18K Rose Gold, Grade 5 Titanium, Platinum 950), and interactive allocation reservation modal.
- **360° Free Inspection Mode:**
  - Toggle anytime from the navbar or CTA section to break out of scroll control and freely orbit/zoom around the assembled watch.
- **Synthesized 4Hz Escapement Audio:**
  - Authentic 28,800 vph Swiss lever escapement ticking synthesized in real-time with Web Audio API (zero audio file dependencies, fully toggleable).
- **Reduced Motion Support:**
  - Automatically respects `prefers-reduced-motion` with a smooth non-explosive cinematic zoom fallback.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## ⌚ How to Swap in Your Own 3D Model (`watch.glb`)

By default, the application includes a **handcrafted procedural 3D luxury watch** built with Three.js primitives, custom metallic shaders, physical sapphire glass, open tourbillon balance wheel, and realistic lighting.

To use your own 3D CAD or Blender watch model:

1. Place your GLTF / GLB file into the public directory at:
   ```
   public/models/watch.glb
   ```
2. Ensure your 3D model meshes or node groups are named according to standard naming conventions so the exploded view animations can bind to them automatically:

   | Watch Part | Recommended Node / Mesh Name in Blender/GLB |
   | :--- | :--- |
   | **Sapphire Crystal** | `crystal`, `glass`, or `sapphire` |
   | **Bezel Ring** | `bezel` |
   | **Hands & Pinion** | `hands`, `hand`, `minute_hand`, or `second_hand` |
   | **Dial & Markers** | `dial` or `face` |
   | **Calibre Movement** | `movement`, `calibre`, `engine`, or `gears` |
   | **Case Back** | `caseback`, `case_back`, or `back` |
   | **Winding Crown** | `crown` or `winder` |
   | **Straps / Bracelet**| `strap`, `strap_top`, `strap_bottom`, or `bracelet` |
   | **Oscillating Rotor**| `rotor` or `weight` |
   | **Balance Wheel** | `balance` or `tourbillon` |

3. The application automatically detects `/models/watch.glb` on startup. If found, it seamlessly switches from the procedural model to your custom GLB model, mapping each part to its corresponding exploded trajectory!

---

## 🛠️ Tech Stack Architecture

- **React 19 & TypeScript**: Core UI and type-safe state management
- **Three.js (`three`)**: 3D rendering engine and physical PBR materials
- **React Three Fiber (`@react-three/fiber`)**: Declarative 3D scene hierarchy
- **Drei (`@react-three/drei`)**: HDR environment reflections, shadows, and loading progress
- **GSAP & ScrollTrigger**: Scroll-linked physics scrubbing (`scrub: 1.2`)
- **Lenis**: Silky inertial smooth scrolling
- **Tailwind CSS**: Luxury glassmorphic styling, custom gold palettes, and typography
- **Lucide React**: Minimal horological icons
# 3D-ORA-SWISS-GENEVA-Watch
