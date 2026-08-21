'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function SearchCore3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    // 1. Check for WebGL support
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    };

    if (!checkWebGL()) {
      setWebGLSupported(false);
      return;
    }

    // 2. Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch (err) {
      setWebGLSupported(false);
      return;
    }

    // 3. Central Crystalline Search Core (Icosahedron + Wireframe shell)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner Core Solid
    const innerGeo = new THREE.IcosahedronGeometry(3.6, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Outer Faceted Shell
    const outerGeo = new THREE.IcosahedronGeometry(4.8, 0);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerMesh);

    // Core Center Glow Point
    const pointGeo = new THREE.SphereGeometry(1.2, 16, 16);
    const pointMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95
    });
    const centerPoint = new THREE.Mesh(pointGeo, pointMat);
    coreGroup.add(centerPoint);

    // 4. Orbital Shard Rings
    const orbitalGroup = new THREE.Group();
    scene.add(orbitalGroup);

    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.25 });
    const ringGeo1 = new THREE.TorusGeometry(8.2, 0.04, 8, 80);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 8;
    orbitalGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x818cf8, wireframe: true, transparent: true, opacity: 0.22 });
    const ringGeo2 = new THREE.TorusGeometry(11.0, 0.04, 8, 80);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 5;
    orbitalGroup.add(ring2);

    const ringMat3 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.18 });
    const ringGeo3 = new THREE.TorusGeometry(13.8, 0.03, 8, 80);
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.x = Math.PI / 6;
    ring3.rotation.y = -Math.PI / 4;
    orbitalGroup.add(ring3);

    // 5. Distributed Shard Nodes (Instanced Shards along Orbitals)
    const nodeCount = 12;
    const nodeGeo = new THREE.SphereGeometry(0.35, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const shardNodes: THREE.Mesh[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const orbitRadius = i % 3 === 0 ? 8.2 : i % 3 === 1 ? 11.0 : 13.8;
      const angle = (i / nodeCount) * Math.PI * 2;
      node.position.set(
        Math.cos(angle) * orbitRadius,
        Math.sin(angle) * (orbitRadius * 0.45),
        Math.sin(angle) * (orbitRadius * 0.75)
      );
      orbitalGroup.add(node);
      shardNodes.push(node);
    }

    // 6. Connecting Query Beams
    const beamGeo = new THREE.BufferGeometry();
    const beamPositions = new Float32Array(nodeCount * 6);
    for (let i = 0; i < nodeCount; i++) {
      beamPositions[i * 6] = 0;
      beamPositions[i * 6 + 1] = 0;
      beamPositions[i * 6 + 2] = 0;
      beamPositions[i * 6 + 3] = shardNodes[i].position.x;
      beamPositions[i * 6 + 4] = shardNodes[i].position.y;
      beamPositions[i * 6 + 5] = shardNodes[i].position.z;
    }
    beamGeo.setAttribute('position', new THREE.BufferAttribute(beamPositions, 3));
    const beamMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.2
    });
    const queryBeams = new THREE.LineSegments(beamGeo, beamMat);
    orbitalGroup.add(queryBeams);

    // 7. Ambient Particle Cloud
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 36;
      particlePositions[i + 1] = (Math.random() - 0.5) * 36;
      particlePositions[i + 2] = (Math.random() - 0.5) * 24;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      color: 0x818cf8,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 8. Mouse Parallax Damping (Lerp)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 2.5;
      targetY = -y * 2.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 9. Resize Handling
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Core subtle rotation
        coreGroup.rotation.y = elapsedTime * 0.18;
        coreGroup.rotation.x = Math.sin(elapsedTime * 0.12) * 0.2;

        // Orbital rotation
        orbitalGroup.rotation.y = -elapsedTime * 0.08;
        orbitalGroup.rotation.z = Math.cos(elapsedTime * 0.06) * 0.1;

        // Particle drift
        particles.rotation.y = elapsedTime * 0.03;

        // Breathing pulse on center glow
        const scale = 1 + Math.sin(elapsedTime * 2.5) * 0.08;
        centerPoint.scale.set(scale, scale, scale);

        // Smooth Mouse Parallax
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;
        scene.rotation.y = mouseX * 0.35;
        scene.rotation.x = -mouseY * 0.35;
      }

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animate();

    // 11. Complete Cleanup on Unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Geometries & Materials
      innerGeo.dispose();
      innerMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      pointGeo.dispose();
      pointMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      beamGeo.dispose();
      beamMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  if (!webGLSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="w-72 h-72 rounded-full border border-sky-500/20 flex items-center justify-center animate-pulse-subtle bg-radial-subtle">
          <div className="w-48 h-48 rounded-full border border-indigo-500/30 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border border-sky-400/50 flex items-center justify-center bg-sky-500/10">
              <div className="w-6 h-6 rounded-full bg-sky-400 animate-ping" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[580px] relative pointer-events-none"
      aria-label="3D Abstract Search Core Visualization"
    />
  );
}
