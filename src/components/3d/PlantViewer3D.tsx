import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, RefreshCw, Sun, Eye, Layers } from 'lucide-react';

interface PlantViewer3DProps {
  selectedCrop?: string;
  growthStage?: string;
}

export const PlantViewer3D: React.FC<PlantViewer3DProps> = ({
  selectedCrop = 'Wheat',
  growthStage = 'Yielding'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeCrop, setActiveCrop] = useState<string>(selectedCrop);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [stageScale, setStageScale] = useState<number>(1);

  // Synchronize internal activeCrop when prop updates
  useEffect(() => {
    if (selectedCrop) {
      setActiveCrop(selectedCrop);
    }
  }, [selectedCrop]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent scene

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3, 7);
    camera.lookAt(0, 1.5, 0);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Clear existing canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5cc, 2.0);
    sunLight.position.set(5, 10, 7);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    const greenGlow = new THREE.PointLight(0x22c55e, 3, 10);
    greenGlow.position.set(-2, 2, 2);
    scene.add(greenGlow);

    const goldGlow = new THREE.PointLight(0xeab308, 2, 8);
    goldGlow.position.set(2, 4, -2);
    scene.add(goldGlow);

    // 5. Soil Pot / Base Pedestal with glowing ring
    const group = new THREE.Group();
    scene.add(group);

    // Pedestal
    const potGeo = new THREE.CylinderGeometry(1.6, 1.2, 0.6, 32);
    const potMat = new THREE.MeshStandardMaterial({
      color: 0x1c2b20,
      roughness: 0.3,
      metalness: 0.8,
    });
    const pot = new THREE.Mesh(potGeo, potMat);
    pot.position.y = -0.3;
    pot.receiveShadow = true;
    group.add(pot);

    // Soil Top
    const soilGeo = new THREE.CylinderGeometry(1.55, 1.55, 0.05, 32);
    const soilMat = new THREE.MeshStandardMaterial({
      color: 0x3d2712,
      roughness: 0.9,
    });
    const soil = new THREE.Mesh(soilGeo, soilMat);
    soil.position.y = 0.01;
    group.add(soil);

    // Holographic Base Ring
    const ringGeo = new THREE.TorusGeometry(1.7, 0.03, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x4ade80, wireframe: true });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -0.3;
    group.add(ring);

    // 6. Procedural Plant Generation based on activeCrop
    const plantGroup = new THREE.Group();
    group.add(plantGroup);

    // Plant Stem Material
    const stemMat = new THREE.MeshStandardMaterial({
      color: activeCrop === 'Wheat' ? 0xd97706 : 0x16a34a,
      roughness: 0.4,
      metalness: 0.1,
    });

    const leafMat = new THREE.MeshStandardMaterial({
      color: activeCrop === 'Corn / Maize' ? 0x22c55e : (activeCrop === 'Wheat' ? 0xeab308 : 0x4ade80),
      side: THREE.DoubleSide,
      roughness: 0.3,
    });

    const fruitMat = new THREE.MeshStandardMaterial({
      color: activeCrop === 'Tomato' ? 0xef4444 : (activeCrop === 'Onion' ? 0xc084fc : 0xfacc15),
      roughness: 0.2,
      metalness: 0.2,
    });

    // Generate Stems & Foliage
    const stemCount = activeCrop === 'Wheat' ? 7 : 3;
    const leavesList: THREE.Mesh[] = [];

    for (let i = 0; i < stemCount; i++) {
      const stemHeight = 2.2 + Math.random() * 0.5;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3((Math.random() - 0.5) * 0.4, stemHeight * 0.5, (Math.random() - 0.5) * 0.4),
        new THREE.Vector3((Math.random() - 0.5) * 0.6, stemHeight, (Math.random() - 0.5) * 0.6),
      ]);

      const stemGeo = new THREE.TubeGeometry(curve, 20, 0.04, 8, false);
      const stemMesh = new THREE.Mesh(stemGeo, stemMat);
      stemMesh.castShadow = true;
      plantGroup.add(stemMesh);

      // Leaves along stem
      for (let j = 1; j <= 4; j++) {
        const leafGeo = new THREE.ConeGeometry(0.2, 0.9, 5);
        leafGeo.rotateX(Math.PI / 3);
        const leafMesh = new THREE.Mesh(leafGeo, leafMat);
        const pos = curve.getPoint(j / 5);
        leafMesh.position.copy(pos);
        leafMesh.rotation.y = (j * Math.PI) / 2 + i * 0.8;
        leafMesh.rotation.z = (Math.random() - 0.5) * 0.5;
        leafMesh.castShadow = true;
        plantGroup.add(leafMesh);
        leavesList.push(leafMesh);
      }

      // Ears / Fruit at top
      if (activeCrop === 'Wheat') {
        const earGeo = new THREE.CylinderGeometry(0.08, 0.12, 0.8, 8);
        const earMesh = new THREE.Mesh(earGeo, leafMat);
        earMesh.position.copy(curve.getPoint(1));
        earMesh.position.y += 0.3;
        plantGroup.add(earMesh);
      } else if (activeCrop === 'Tomato') {
        if (i % 2 === 0) {
          const tomatoGeo = new THREE.SphereGeometry(0.25, 16, 16);
          const tomatoMesh = new THREE.Mesh(tomatoGeo, fruitMat);
          const pos = curve.getPoint(0.7);
          tomatoMesh.position.copy(pos);
          tomatoMesh.position.x += 0.2;
          plantGroup.add(tomatoMesh);
        }
      } else if (activeCrop === 'Corn / Maize') {
        const cobGeo = new THREE.CylinderGeometry(0.18, 0.15, 0.9, 12);
        const cobMesh = new THREE.Mesh(cobGeo, fruitMat);
        const pos = curve.getPoint(0.6);
        cobMesh.position.copy(pos);
        cobMesh.rotation.z = -Math.PI / 6;
        plantGroup.add(cobMesh);
      }
    }

    // 7. Floating Pollen Particle System
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePositions[p] = (Math.random() - 0.5) * 4;
      particlePositions[p + 1] = Math.random() * 4;
      particlePositions[p + 2] = (Math.random() - 0.5) * 4;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x86efac,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Swaying leaf movement
      plantGroup.children.forEach((child, index) => {
        child.rotation.z = Math.sin(elapsedTime * 1.5 + index) * 0.03;
      });

      // Ring rotation
      ring.rotation.z = elapsedTime * 0.5;

      // Particles rising gently
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += 0.005;
        if (positions[i] > 4) positions[i] = 0;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Group Auto Rotation
      if (autoRotate) {
        group.rotation.y = elapsedTime * 0.4;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeCrop, autoRotate]);

  return (
    <div className="relative w-full h-[420px] rounded-3xl bg-gradient-to-b from-agro-900/40 via-black/60 to-agro-dark border border-emerald-500/30 overflow-hidden shadow-2xl backdrop-blur-xl group">
      {/* 3D Glass Header */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center space-x-2 bg-emerald-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-500/40 shadow-lg pointer-events-auto">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">
            3D Bio-Sim: {activeCrop}
          </span>
        </div>

        <div className="flex items-center space-x-2 pointer-events-auto">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2 rounded-full border text-xs font-medium transition-all ${
              autoRotate
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                : 'bg-black/60 border-gray-700 text-gray-400'
            }`}
            title="Toggle 3D Rotation"
          >
            <RefreshCw className={`w-4 h-4 ${autoRotate ? 'animate-spin-slow' : ''}`} />
          </button>
        </div>
      </div>

      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Control Bar at Bottom */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 bg-emerald-950/80 backdrop-blur-md p-2.5 rounded-2xl border border-emerald-500/30">
        <div className="flex items-center space-x-1 text-xs text-gray-300">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Switch Crop:</span>
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
          {['Wheat', 'Corn / Maize', 'Tomato', 'Onion'].map((crop) => (
            <button
              key={crop}
              onClick={() => setActiveCrop(crop)}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                activeCrop === crop
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-black font-semibold shadow-md shadow-emerald-500/20'
                  : 'bg-black/40 text-gray-300 hover:bg-emerald-900/40'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
