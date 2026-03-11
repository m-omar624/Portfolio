import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import modelUrl from "../assets/viewer/BMV/source/BMW X3 M40i.glb?url";

const textureAssets: Record<string, string> = {
  ...(import.meta.glob("../assets/viewer/BMV/textures/*.png", {
    as: "url",
    eager: true,
  }) as Record<string, string>),
  ...(import.meta.glob("../assets/viewer/BMV/textures/*.jpeg", {
    as: "url",
    eager: true,
  }) as Record<string, string>),
};

interface Props {
  onClose: () => void;
}

// Ease-in-out cubic
function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const PANEL_W = 200;
interface PanelDef {
  title: string;
  description: string;
  imageTop?: string;
  imageBottom?: string;
  video?: string;
  width?: number;
  offsetX: number;
  offsetY: number;
}
const INDICATOR_PANELS: Record<string, PanelDef[]> = {
  "door-handle": [
    {
      title: "Multi Body Dynamics Viewer (CollabSpace)",
      description: "A web based rendering engine built to visualize multi body dynamics simulation data. Provides visualization of animations, forces applied, and physical data such as torque, acceleration, position, etc.",
      video: "/MagnaWorkSamples/CollabMBDAnimation2.mp4",
      width: 600,
      offsetX: -610, offsetY: 40,
    },
    {
      title: "Automatic Conversion",
      description: "Developed alongside the MBD Viewer, the MBD Converter is in charge of automatically converting any and all multi body simulation results into viewer ready format, without the loss of any data.",
      video: "/MagnaWorkSamples/CollabMBDAnimation.mp4",
      width: 600,
      offsetX: 10, offsetY: 40,
    },
  ],
  "rear-fender": [
    {
      title: "Material Database",
      description: "A global repository for all material data and testing information.",
      imageTop: "/MagnaWorkSamples/Materials.png",
      width: 600,
      offsetX: 50, offsetY: 40,
    },
    {
      title: "Data Optimization",
      imageTop: "/MagnaWorkSamples/MBDRPD2.png",
      description: "Optimizes extremely large datasets while ensuring industry standards.",
      width: 600,
      offsetX: -600, offsetY: 150,
    },
  ],
  "front-wheel": [
    {
      title: "ETO Job Order",
      imageTop: "/MagnaWorkSamples/ETOFlowchart.png",
      description: "A web based tool to place, manage, and review EU testing orders.\n\nPerformed regular maintenance and implemented testing procedure flowchart editor to specify or create templates for a test process.",
      width: 500,
      offsetX: -700, offsetY: -400,
    },
    {
      title: "AO Management",
      imageTop: "/MagnaWorkSamples/AOManagement.png",
      description: "A desktop application to track, organize, backup, and view all analysis data for the MML division.\n\nPerformed regular maintenance.",
      width: 500,
      offsetX: -700, offsetY: -20,
    },
  ],
  "left-mirror": [
    {
      title: "CollabSpace",
      imageTop: "/MagnaWorkSamples/Collab.png",
      description: "A global platform hosted on the web for designers, engineers, and clients to view and approve ongoing analysis results or refer to historical analysis data.",
      imageBottom: "/MagnaWorkSamples/CollabComments.png",
      width: 500,
      offsetX: 500, offsetY: -240,
    },
    {
      title: "Direct Communication",
      description: "Integrated into the design process, Collab bridges the disconnect between engineers, designers, and clients, providing understandable data for everyone.\n\nDirect communication surrounding a simulation, allowing users to discuss concerns and observations all in one place.",
      width: 500,
      offsetX: 500, offsetY: 350,
    },
    {
      title: "Finite Element Analysis",
      description: "A web based rendering engine built to visualize finite element simulation results.",
      video: "/MagnaWorkSamples/CollabFEAAnimation.mp4",
      width: 600,
      offsetX: -140, offsetY:150,
    },
  ],
};

export default function InteractiveDemo({ onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [opaque, setOpaque] = useState(false);
  const [sceneActive, setSceneActive] = useState(false);
  const [closing, setClosing] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [pickerMode, setPickerMode] = useState(false);
  const [pickerInfo, setPickerInfo] = useState<string | null>(null);
  const [indicatorDefs, setIndicatorDefs] = useState<{ id: string; label: string }[]>([]);
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [openPanelAnchor, setOpenPanelAnchor] = useState<{ x: number; y: number } | null>(null);

  // ── Refs shared with the render loop ────────────────────────────────────
  const lightPhaseRef = useRef<"dark" | "scene">("dark");
  const sceneRevealStartRef = useRef<number | null>(null);
  const introPhaseRef = useRef<"idle" | "spinning" | "done">("idle");
  const introStartRef = useRef<number | null>(null);
  const pickerModeRef = useRef(false);
  const indicatorsRef = useRef<THREE.Vector3[]>([]);
  const indicatorDomRefs = useRef<(HTMLDivElement | null)[]>([]);
  const indicatorDefsRef = useRef<{ id: string; label: string }[]>([]);
  const openPanelRef = useRef<string | null>(null);
  const svgLineStartRefs = useRef<(SVGLineElement | null)[]>([]);

  // Intro orbit parameters, written once when the model loads
  const introCamRef = useRef<{
    startRadius: number;
    endRadius: number;
    camY: number;
    target: THREE.Vector3;
    startTheta: number;
    endTheta: number;
    groundY: number;
  } | null>(null);

  // Lighting refs, populated once model loads
  const lightsRevealRef = useRef<{
    ambient: THREE.AmbientLight;
    key: THREE.DirectionalLight;
    fill: THREE.DirectionalLight;
    rim: THREE.DirectionalLight;
    headLights: THREE.SpotLight[];
    tailLights: THREE.SpotLight[];
    bgDark: THREE.Color;
    bgBright: THREE.Color;
    scene: THREE.Scene;
    gridObjects: THREE.Object3D[];
  } | null>(null);

  // Keep pickerModeRef in sync with React state
  useEffect(() => {
    pickerModeRef.current = pickerMode;
  }, [pickerMode]);
  useEffect(() => { openPanelRef.current = openPanel; }, [openPanel]);

  // ── 1. Fade-in on mount ──────────────────────────────────────────────────
  useEffect(() => {
    const r = requestAnimationFrame(() =>
      requestAnimationFrame(() => setOpaque(true))
    );
    return () => cancelAnimationFrame(r);
  }, []);

  // ── 2. Close handler ─────────────────────────────────────────────────────
  const handleClose = () => {
    setClosing(true);
    setOpaque(false);
  };

  // ── 3. Opacity transition end ────────────────────────────────────────────
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== "opacity") return;
    if (closing) {
      onClose();
    } else {
      setSceneActive(true);
    }
  };

  // ── 4. Three.js lifecycle ────────────────────────────────────────────────
  useEffect(() => {
    if (!sceneActive || !canvasRef.current) return;

    const canvas = canvasRef.current;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setClearColor(0x000000, 1); // prevent white flash before first frame
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // ── Scene – starts pitch black ─────────────────────────────────────────
    const scene = new THREE.Scene();
    const bgDark = new THREE.Color(0x000000);
    const bgBright = new THREE.Color(0x080b14); // deep dark blue-black for atmosphere
    scene.background = bgDark.clone();
    scene.fog = new THREE.FogExp2(0x080b14, 0.018);

    // ── Camera ─────────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    );
    camera.position.set(0, 2, -8); // placeholder; overwritten by intro

    // ── Scene lights (all start at intensity 0) ──────────────────────────
    const ambient = new THREE.AmbientLight(0xffffff, 0);

    const keyLight = new THREE.DirectionalLight(0xfff5e0, 0); // warm key
    keyLight.position.set(5, 10, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);

    const fillLight = new THREE.DirectionalLight(0x9aaeff, 0); // cool blue fill
    fillLight.position.set(-6, 3, -4);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0); // back rim
    rimLight.position.set(0, 6, -8);

    scene.add(ambient, keyLight, fillLight, rimLight);

    // Car headlight / taillight spot lights (added after model loads)
    const headLights: THREE.SpotLight[] = [];
    const tailLights: THREE.SpotLight[] = [];

    lightsRevealRef.current = {
      ambient,
      key: keyLight,
      fill: fillLight,
      rim: rimLight,
      headLights,
      tailLights,
      bgDark,
      bgBright,
      scene,
      gridObjects: [],
    };

    // ── URL remapping for textures ─────────────────────────────────────────
    const manager = new THREE.LoadingManager();
    manager.setURLModifier((url) => {
      const filename = decodeURIComponent(
        url.split("/").pop()?.split("?")[0] ?? ""
      );
      const match = Object.entries(textureAssets).find(
        ([k]) => k.endsWith(`/${filename}`) || k.endsWith(`\\${filename}`)
      );
      return match ? match[1] : url;
    });

    // ── Load model ─────────────────────────────────────────────────────────
    const loader = new GLTFLoader(manager);

    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;

        // Scale + centre
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4 / maxDim;

        model.scale.setScalar(scale);
        model.position.copy(center.clone().multiplyScalar(-scale));

        // ── Tint body panels orange ──────────────────────────────────────
        // Keep all maps (normal, roughness, AO, etc.) intact; only override color.
        // Exclude clearly non-body parts by mesh/material name.
        const NON_BODY = /glass|window|windshield|wiper|lens|light|lamp|turn|indicator|chrome|trim|grill|grille|badge|emblem|logo|rubber|tyre|tire|wheel|rim|spoke|brake|rotor|caliper|seat|interior|cabin|dashboard|dash|carpet|headliner|steering|pedal|mirror_glass|plastic|gasket/i;
        const orangeColor = new THREE.Color(0xff6a00);
        const tintedMats = new Set<THREE.MeshStandardMaterial>();

        model.traverse((c) => {
          if (!(c instanceof THREE.Mesh)) return;
          c.castShadow = true;
          const meshName = c.name ?? "";
          const mats = Array.isArray(c.material) ? c.material : [c.material];
          mats.forEach((mat) => {
            if (!(mat instanceof THREE.MeshStandardMaterial)) return;
            if (tintedMats.has(mat)) return; // already processed
            const matName = mat.name ?? "";
            if (!NON_BODY.test(meshName) && !NON_BODY.test(matName)) {
              mat.color.copy(orangeColor);
              tintedMats.add(mat);
            }
          });
        });

        scene.add(model);

        // Recompute world bbox after transform
        const wb = new THREE.Box3().setFromObject(model);
        const groundY = wb.min.y;
        const carHeight = wb.max.y - wb.min.y;
        const carWidth = wb.max.x - wb.min.x;
        // Car faces -Z (front = min.z), rear = max.z
        const frontZ = wb.min.z;
        const rearZ = wb.max.z;
        const leftX = wb.min.x;
        const rightX = wb.max.x;

        // ── SpotLights at headlight / taillight positions ──────────────────
        const lightY = groundY + carHeight * 0.35;
        const lat = carWidth * 0.28; // lateral inset from edge

        // Headlights: front of car at +Z (rearZ = wb.max.z), beams shine forward in +Z
        const hl = new THREE.SpotLight(0xfff8e7, 0, 20, Math.PI / 9, 0.3, 1.5);
        hl.position.set(leftX + lat, lightY, rearZ - 0.1);
        hl.target.position.set(leftX + lat, lightY - 0.8, rearZ + 12);
        const hr = new THREE.SpotLight(0xfff8e7, 0, 20, Math.PI / 9, 0.3, 1.5);
        hr.position.set(rightX - lat, lightY, rearZ - 0.1);
        hr.target.position.set(rightX - lat, lightY - 0.8, rearZ + 12);
        headLights.push(hl, hr);
        scene.add(hl, hl.target, hr, hr.target);

        // Taillights: rear of car at -Z (frontZ = wb.min.z), beams shine backward in -Z
        const tl = new THREE.SpotLight(0xff1500, 0, 12, Math.PI / 8, 0.4, 1.5);
        tl.position.set(leftX + lat, lightY, frontZ + 0.1);
        tl.target.position.set(leftX + lat, lightY, frontZ - 8);
        const tr = new THREE.SpotLight(0xff1500, 0, 12, Math.PI / 8, 0.4, 1.5);
        tr.position.set(rightX - lat, lightY, frontZ + 0.1);
        tr.target.position.set(rightX - lat, lightY, frontZ - 8);
        tailLights.push(tl, tr);
        scene.add(tl, tl.target, tr, tr.target);

        // ── Grid floor ────────────────────────────────────────────────────
        const grid = new THREE.GridHelper(40, 60, 0x3a3a3a, 0x272727);
        grid.position.y = groundY;
        scene.add(grid);

        // Shadow-receiving ground plane
        const groundMesh = new THREE.Mesh(
          new THREE.PlaneGeometry(40, 40),
          new THREE.ShadowMaterial({ opacity: 0.3 })
        );
        groundMesh.rotation.x = -Math.PI / 2;
        groundMesh.position.y = groundY - 0.001;
        groundMesh.receiveShadow = true;
        scene.add(groundMesh);

        // Reflective dark floor for atmosphere
        const reflectFloor = new THREE.Mesh(
          new THREE.PlaneGeometry(40, 40),
          new THREE.MeshStandardMaterial({ color: 0x050810, roughness: 0.1, metalness: 0.95 })
        );
        reflectFloor.rotation.x = -Math.PI / 2;
        reflectFloor.position.y = groundY - 0.003;
        scene.add(reflectFloor);

        // Floating dust / atmosphere particles
        const particleCount = 320;
        const pPos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
          pPos[i * 3]     = (Math.random() - 0.5) * 30;
          pPos[i * 3 + 1] = groundY + 0.2 + Math.random() * 8;
          pPos[i * 3 + 2] = (Math.random() - 0.5) * 30;
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
        const pMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.032, transparent: true, opacity: 0.18, sizeAttenuation: true });
        const dustParticles = new THREE.Points(pGeo, pMat);
        scene.add(dustParticles);

        grid.visible = false;
        groundMesh.visible = false;
        reflectFloor.visible = false;
        dustParticles.visible = false;
        lightsRevealRef.current!.gridObjects.push(grid, groundMesh, reflectFloor, dustParticles);

        // ── Intro camera parameters ───────────────────────────────────────
        // Camera faces the front of the car (-Z side) at theta = π,
        // spins 270° clockwise (decreasing theta) to end at theta = −π/2.
        const carCenterY = groundY + carHeight * 0.3;
        const orbitR =
          Math.max(size.x, size.z) * scale * 0.8;
        introCamRef.current = {
          startRadius: orbitR,
          endRadius: Math.max(size.x, size.z) * scale * 1.8,
          camY: groundY + carHeight * 0.2,
          target: new THREE.Vector3(0, carCenterY, 0),
          startTheta: 0,                           // front of car (+Z side)
          endTheta: -(3 * Math.PI) / 2,            // 270° clockwise
          groundY,
        };

        // ── MAGNA backdrop text ─────────────────────────────────────────
        // After the 270° spin the camera rests on the +X side looking toward -X,
        // so the text sits far along -X, rotated to face +X (toward the camera).
        const textCanvas = document.createElement("canvas");
        textCanvas.width = 2048;
        textCanvas.height = 512;
        const tctx = textCanvas.getContext("2d")!;
        tctx.clearRect(0, 0, 2048, 512);
        tctx.font = "bold 500px 'Arial Black', Arial, sans-serif";
        tctx.textAlign = "center";
        tctx.textBaseline = "middle";
        const tgrad = tctx.createLinearGradient(0, 0, 2048, 0);
        tgrad.addColorStop(0,   "rgba(255,255,255,0.05)");
        tgrad.addColorStop(0.5, "rgba(255,255,255,0.55)");
        tgrad.addColorStop(1,   "rgba(255,255,255,0.05)");
        tctx.fillStyle = tgrad;
        tctx.fillText("MAGNA", 1024, 256);
        const textTex = new THREE.CanvasTexture(textCanvas);
        const textMesh = new THREE.Mesh(
          new THREE.PlaneGeometry(55, 14),
          new THREE.MeshBasicMaterial({ map: textTex, transparent: true, depthWrite: false, side: THREE.DoubleSide })
        );
        // Place far on -X, centred on the car height, facing +X (toward camera)
        textMesh.position.set(-30, groundY + carHeight * 2.5, 0);
        textMesh.rotation.y = Math.PI / 2; // face toward +X = toward camera end position
        scene.add(textMesh);

        // ── Interactive indicator world positions ────────────────────────
        // Camera ends at +X side looking toward -X; rightX (+X face) is visible.
        indicatorsRef.current = [
          new THREE.Vector3(rightX, groundY + carHeight * 0.45, 0),
          new THREE.Vector3(rightX, groundY + carHeight * 0.38, frontZ + 0.45),
          new THREE.Vector3(rightX, groundY + carHeight * 0.18, rearZ - 0.6),
          new THREE.Vector3(rightX - 0.05, groundY + carHeight * 0.7, frontZ + 2.5),
        ];
        const defs = [
          { id: "door-handle",  label: "Multi Body Dynamics Viewer" },
          { id: "rear-fender",  label: "Material Database" },
          { id: "front-wheel",  label: "ETO Job Order" },
          { id: "left-mirror",  label: "Collab Space" },
        ];
        indicatorDefsRef.current = defs;
        setIndicatorDefs(defs);

        setModelLoaded(true);

        // Darkness pause, then scene lights + spin begin together
        setTimeout(() => {
          lightPhaseRef.current = "scene";
          introPhaseRef.current = "spinning";
        }, 2000);
      },
      undefined,
      (err) => {
        console.error("[InteractiveDemo] model load error:", err);
      }
    );

    // ── Mouse-based camera tilt (post-intro) ────────────────────────────────
    const mouseSmooth = { x: 0, y: 0 };
    const mouseTgt    = { x: 0, y: 0 };
    let baseCam: { theta: number; phi: number; radius: number; target: THREE.Vector3; groundY: number } | null = null;

    // ── Raycaster for position picker ──────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const handleClick = (e: MouseEvent) => {
      if (!pickerModeRef.current) return;
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(scene.children, true);
      if (hits.length > 0) {
        const p = hits[0].point;
        const meshName =
          hits[0].object instanceof THREE.Mesh ? hits[0].object.name : "?";
        setPickerInfo(
          `mesh: "${meshName}" | x: ${p.x.toFixed(3)}, y: ${p.y.toFixed(3)}, z: ${p.z.toFixed(3)}`
        );
      }
    };
    canvas.addEventListener("click", handleClick);

    const handleMouseMove = (e: MouseEvent) => {
      mouseTgt.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTgt.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    // ── Resize ─────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Render loop ────────────────────────────────────────────────────────
    const SCENE_TARGET = {
      ambient: 0.32, key: 1.9, fill: 0.75, rim: 0.65, headLight: 8, tailLight: 5,
    };
    const SCENE_DURATION = 4000;  // ms – scene lights fade in during spin
    const INTRO_DURATION = 5000;  // ms – 270° spin
    const D12 = THREE.MathUtils.degToRad(12);

    let rafId: number;

    const animate = (time: number) => {
      rafId = requestAnimationFrame(animate);

      const cam = introCamRef.current;
      const phase = introPhaseRef.current;

      // ── Intro camera spin ──────────────────────────────────────────────
      if (phase === "spinning" && cam) {
        if (introStartRef.current === null) introStartRef.current = time;
        const elapsed = time - introStartRef.current;
        const t = Math.min(elapsed / INTRO_DURATION, 1);
        const eased = easeInOut(t);
        const theta =
          cam.startTheta + (cam.endTheta - cam.startTheta) * eased;
        const radius = cam.startRadius + (cam.endRadius - cam.startRadius) * eased;

        camera.position.set(
          radius * Math.sin(theta),
          cam.camY,
          radius * Math.cos(theta)
        );
        camera.lookAt(cam.target);

        if (t >= 1) {
          introPhaseRef.current = "done";
          const sp = new THREE.Spherical().setFromVector3(
            camera.position.clone().sub(cam.target)
          );
          baseCam = { theta: sp.theta, phi: sp.phi, radius: sp.radius, target: cam.target.clone(), groundY: cam.groundY };
        }
      } else if (phase === "done" && baseCam) {
        // Smooth mouse → tilt camera ±12° around rest position
        mouseSmooth.x += (mouseTgt.x - mouseSmooth.x) * 0.04;
        mouseSmooth.y += (mouseTgt.y - mouseSmooth.y) * 0.04;
        const theta = baseCam.theta + mouseSmooth.x * D12;
        // Clamp phi so camera stays above ground
        const cosFloor = (baseCam.groundY + 0.15 - baseCam.target.y) / baseCam.radius;
        const maxPhi = Math.acos(Math.max(-1, Math.min(1, cosFloor)));
        const phi = Math.max(0.1, Math.min(maxPhi, baseCam.phi - mouseSmooth.y * D12));
        const sinPhi = Math.sin(phi);
        camera.position.set(
          baseCam.target.x + baseCam.radius * sinPhi * Math.sin(theta),
          baseCam.target.y + baseCam.radius * Math.cos(phi),
          baseCam.target.z + baseCam.radius * sinPhi * Math.cos(theta)
        );
        camera.lookAt(baseCam.target);
      }

      // ── Scene lights fade in as camera spins ─────────────────────────
      const L = lightsRevealRef.current;
      if (L && lightPhaseRef.current === "scene") {
        if (sceneRevealStartRef.current === null) {
          sceneRevealStartRef.current = time;
          L.gridObjects.forEach((o) => { o.visible = true; });
        }
        const ts = Math.min((time - sceneRevealStartRef.current) / SCENE_DURATION, 1);
        const es = 1 - Math.pow(1 - ts, 3);
        L.ambient.intensity = es * SCENE_TARGET.ambient;
        L.key.intensity     = es * SCENE_TARGET.key;
        L.fill.intensity    = es * SCENE_TARGET.fill;
        L.rim.intensity     = es * SCENE_TARGET.rim;
        L.headLights.forEach((pl) => { pl.intensity = es * SCENE_TARGET.headLight; });
        L.tailLights.forEach((pl) => { pl.intensity = es * SCENE_TARGET.tailLight; });
        L.scene.background = L.bgDark.clone().lerp(L.bgBright, es);
      }

      // ── Project indicator positions to screen ──────────────────────────
      indicatorsRef.current.forEach((wp, i) => {
        const el = indicatorDomRefs.current[i];
        if (!el) return;
        const proj = wp.clone().project(camera);
        if (proj.z >= 1) {
          el.style.opacity = "0";
          el.style.pointerEvents = "none";
          return;
        }
        el.style.opacity = "1";
        el.style.pointerEvents = "auto";
        const sx = (proj.x * 0.5 + 0.5) * window.innerWidth;
        const sy = (-proj.y * 0.5 + 0.5) * window.innerHeight;
        el.style.left = `${sx}px`;
        el.style.top = `${sy}px`;
        if (indicatorDefsRef.current[i]?.id === openPanelRef.current) {
          svgLineStartRefs.current.forEach(line => {
            if (line) {
              line.setAttribute("x1", String(sx));
              line.setAttribute("y1", String(sy));
            }
          });
        }
      });

      renderer.render(scene, camera);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("mousemove", handleMouseMove);
      lightPhaseRef.current = "dark";
      sceneRevealStartRef.current = null;
      lightsRevealRef.current = null;
      introPhaseRef.current = "idle";
      introStartRef.current = null;
      introCamRef.current = null;
      renderer.dispose();
    };
  }, [sceneActive]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        opacity: opaque ? 1 : 0,
        transition: "opacity 0.8s ease",
        zIndex: 9999,
        overflow: "hidden",
      }}
      onTransitionEnd={handleTransitionEnd}
    >
      <style>{`
        @keyframes indicatorPulse {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50% { transform: scale(1.6); opacity: 0.1; }
        }
        @keyframes drawLine {
          from { stroke-dashoffset: 600; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes panelIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      {sceneActive && (
        <canvas
          ref={canvasRef}
          style={{ display: "block", width: "100%", height: "100%", background: "#000" }}
        />
      )}

      {/* Atmosphere overlays */}
      {sceneActive && (
        <>
          {/* Vignette */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 50% 75%, transparent 30%, rgba(0,0,6,0.72) 100%)",
            pointerEvents: "none", zIndex: 2,
          }} />
          {/* Top edge fade */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 180,
            background: "linear-gradient(to bottom, rgba(0,0,8,0.75) 0%, transparent 100%)",
            pointerEvents: "none", zIndex: 2,
          }} />
          {/* Bottom edge fade */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 130,
            background: "linear-gradient(to top, rgba(0,0,8,0.65) 0%, transparent 100%)",
            pointerEvents: "none", zIndex: 2,
          }} />
          {/* Subtle scanlines */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.025) 3px, rgba(0,0,0,0.025) 4px)",
            pointerEvents: "none", zIndex: 3,
          }} />
        </>
      )}

      {/* Hint */}
      {modelLoaded && (
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(255,255,255,0.3)",
            fontSize: 11,
            letterSpacing: "2px",
            textTransform: "uppercase",
            pointerEvents: "none",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          Move mouse to rotate
        </div>
      )}

      {/* Indicator dots – positions updated each frame via indicatorDomRefs */}
      {indicatorDefs.map((def, i) => (
        <div
          key={def.id}
          ref={(el) => { indicatorDomRefs.current[i] = el; }}
          onClick={() => {
            if (openPanel === def.id) {
              setOpenPanel(null);
              openPanelRef.current = null;
              setOpenPanelAnchor(null);
              svgLineStartRefs.current = [];
            } else {
              svgLineStartRefs.current = [];
              setOpenPanel(def.id);
              openPanelRef.current = def.id;
              const dotEl = indicatorDomRefs.current[i];
              const x = dotEl ? (parseFloat(dotEl.style.left) || 0) : 0;
              const y = dotEl ? (parseFloat(dotEl.style.top) || 0) : 0;
              setOpenPanelAnchor({ x, y });
            }
          }}
          style={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            width: 24,
            height: 24,
            cursor: "pointer",
            transition: "opacity 0.3s",
            opacity: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.5)",
              animation:
                openPanel === def.id
                  ? "none"
                  : "indicatorPulse 2.2s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: openPanel === def.id ? "#ffffff" : "rgba(255,255,255,0.9)",
              boxShadow: "0 0 6px rgba(255,255,255,0.5)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              marginTop: 5,
              whiteSpace: "nowrap",
              color: "rgba(255,255,255,0.55)",
              fontSize: 8,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              pointerEvents: "none",
            }}
          >
          </div>
        </div>
      ))}

      {/* SVG line overlay */}
      {openPanel !== null && openPanelAnchor && (
        <svg
          style={{
            position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
            pointerEvents: "none", zIndex: 8, overflow: "visible",
          }}
        >
          {(INDICATOR_PANELS[openPanel] ?? []).map((panel, pi) => (
            <line
              key={`${openPanel}-${pi}`}
              ref={(el: SVGLineElement | null) => { svgLineStartRefs.current[pi] = el; }}
              x1={openPanelAnchor.x}
              y1={openPanelAnchor.y}
              x2={openPanelAnchor.x + panel.offsetX + PANEL_W / 2}
              y2={openPanelAnchor.y + panel.offsetY + 55}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={1}
              strokeDasharray={600}
              style={{ animation: `drawLine 500ms ease ${pi * 90}ms both` }}
            />
          ))}
        </svg>
      )}

      {/* Feature panels */}
      {openPanel !== null && openPanelAnchor && (INDICATOR_PANELS[openPanel] ?? []).map((panel, pi) => (
        <div
          key={`${openPanel}-${pi}`}
          style={{
            position: "absolute",
            left: openPanelAnchor.x + panel.offsetX,
            top: openPanelAnchor.y + panel.offsetY,
            width: panel.width ?? PANEL_W,
            background: "rgba(0,0,0,0.88)",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "16px 18px",
            color: "rgba(255,255,255,0.85)",
            zIndex: 10,
            animation: `panelIn 400ms cubic-bezier(0.2,0.9,0.18,1) ${pi * 90}ms both`,
          }}
        >
          {pi === 0 && (
            <button
              onClick={() => {
                setOpenPanel(null);
                openPanelRef.current = null;
                setOpenPanelAnchor(null);
                svgLineStartRefs.current = [];
              }}
              style={{
                position: "absolute", top: 10, right: 10,
                background: "transparent", border: "none",
                color: "rgba(255,255,255,0.4)", cursor: "pointer",
                fontSize: 16, padding: "2px 6px", lineHeight: 1,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
            >×</button>
          )}
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.3px" }}>
            {panel.title}
          </div>
          {panel.imageTop && (
            <img
              src={panel.imageTop}
              alt=""
              style={{ width: "100%", borderRadius: 4, marginBottom: 10, display: "block", objectFit: "cover" }}
            />
          )}
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, whiteSpace: "pre-line" }}>
            {panel.description}
          </div>
          {panel.imageBottom && (
            <img
              src={panel.imageBottom}
              alt=""
              style={{ width: "100%", borderRadius: 4, marginTop: 10, display: "block", objectFit: "cover" }}
            />
          )}
          {panel.video && (
            <video
              src={panel.video}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", borderRadius: 4, marginTop: 10, display: "block" }}
            />
          )}
        </div>
      ))}

      {/* Picker toggle */}
      {modelLoaded && (
        <button
          onClick={() => {
            setPickerMode((p) => !p);
            setPickerInfo(null);
          }}
          style={{
            position: "absolute",
            top: 24,
            right: 112,
            background: pickerMode ? "rgba(255,85,0,0.18)" : "transparent",
            border: `1px solid ${pickerMode ? "rgba(255,85,0,0.8)" : "rgba(255,255,255,0.3)"}`,
            color: pickerMode ? "#ff7733" : "rgba(255,255,255,0.8)",
            padding: "10px 22px",
            cursor: "pointer",
            fontSize: 11,
            letterSpacing: "2px",
            textTransform: "uppercase",
            transition: "all 0.2s ease",
          }}
        >
          Picker
        </button>
      )}

      {/* Picker info panel */}
      {pickerMode && (
        <div
          style={{
            position: "absolute",
            top: 70,
            right: 24,
            background: "rgba(0,0,0,0.78)",
            border: "1px solid rgba(255,85,0,0.35)",
            color: "rgba(255,255,255,0.85)",
            fontSize: 11,
            letterSpacing: "1px",
            padding: "14px 18px",
            maxWidth: 400,
            lineHeight: 1.9,
          }}
        >
          <div
            style={{
              color: "#ff7733",
              marginBottom: 6,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Position Picker
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.45)",
              marginBottom: 10,
              fontSize: 10,
            }}
          >
            Click any surface on the model to get its world-space position.
            <br />
            Share the coords to place headlight / taillight point-lights.
          </div>
          {pickerInfo ? (
            <div style={{ fontFamily: "monospace", color: "#ff9955" }}>
              {pickerInfo}
            </div>
          ) : (
            <div
              style={{
                color: "rgba(255,255,255,0.3)",
                fontStyle: "italic",
              }}
            >
              awaiting click…
            </div>
          )}
        </div>
      )}

      {/* Exit */}
      <button
        onClick={handleClose}
        style={{
          position: "absolute",
          top: 24,
          right: 24,
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.3)",
          color: "rgba(255,255,255,0.8)",
          padding: "10px 22px",
          cursor: "pointer",
          fontSize: 11,
          letterSpacing: "2px",
          textTransform: "uppercase",
          transition: "border-color 0.2s ease, color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.8)";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
          e.currentTarget.style.color = "rgba(255,255,255,0.8)";
        }}
      >
        Exit
      </button>
    </div>
  );
}
