"use client";
import { useEffect, useRef } from "react";
import type * as THREE_TYPES from "three";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animId: number;
    let renderer: any;
    let onMouse: (e: MouseEvent) => void;
    let onResize: () => void;
    let disposed = false;

    import("three").then((THREE) => {
      if (disposed) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
      camera.position.set(0, 0, 5);

      // --- 1. Plexus (Points + Lines) ---
      const count = 70;
      const positions = new Float32Array(count * 3);
      const velocities: { x: number; y: number; z: number }[] = [];
      
      for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 12;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
        velocities.push({
          x: (Math.random() - 0.5) * 0.005,
          y: (Math.random() - 0.5) * 0.005,
          z: (Math.random() - 0.5) * 0.005
        });
      }

      const pointsGeo = new THREE.BufferGeometry();
      pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const pointsMat = new THREE.PointsMaterial({
        color: 0x6063ee,
        size: 0.045,
        transparent: true,
        opacity: 0.4,
        sizeAttenuation: true,
      });
      const points = new THREE.Points(pointsGeo, pointsMat);
      scene.add(points);

      // Lines for plexus
      const lineMat = new THREE.LineBasicMaterial({ color: 0x6063ee, transparent: true, opacity: 0.08 });
      const lineGeo = new THREE.BufferGeometry();
      const linePositions = new Float32Array(count * count * 6);
      lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
      const lines = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(lines);

      // --- 2. Floating soft spheres ---
      const sphereGeo = new THREE.SphereGeometry(0.1, 16, 16);
      const spheres: { mesh: any; phase: number; }[] = [];
      for (let i = 0; i < 4; i++) {
        const sphereMat = new THREE.MeshBasicMaterial({ 
          color: i % 2 === 0 ? 0x6063ee : 0xa855f7,
          transparent: true,
          opacity: 0.05
        });
        const s = new THREE.Mesh(sphereGeo, sphereMat);
        const scale = 2 + Math.random() * 4;
        s.scale.set(scale, scale, scale);
        s.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, -2);
        scene.add(s);
        spheres.push({ mesh: s, phase: Math.random() * Math.PI * 2 });
      }

      let mouse = { x: 0, y: 0 };
      onMouse = (e: MouseEvent) => {
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.4;
        mouse.y = (e.clientY / window.innerHeight - 0.5) * -0.3;
      };
      window.addEventListener("mousemove", onMouse);

      onResize = () => {
        if (!canvas) return;
        const w = canvas.offsetWidth, h = canvas.offsetHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);

      let t = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        t += 0.005;

        // Animate positions
        const posArray = pointsGeo.attributes.position.array as Float32Array;
        let lineIdx = 0;

        for (let i = 0; i < count; i++) {
          posArray[i * 3]     += velocities[i].x;
          posArray[i * 3 + 1] += velocities[i].y;
          posArray[i * 3 + 2] += velocities[i].z;

          // Bounds check — reflect when position exceeds boundaries
          if (Math.abs(posArray[i * 3])     > 6) velocities[i].x *= -1;
          if (Math.abs(posArray[i * 3 + 1]) > 4) velocities[i].y *= -1;
          if (Math.abs(posArray[i * 3 + 2]) > 2) velocities[i].z *= -1;

          // Connect lines
          for (let j = i + 1; j < count; j++) {
            const dx = posArray[i * 3] - posArray[j * 3];
            const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
            const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
            const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

            if (dist < 2.5) {
              linePositions[lineIdx++] = posArray[i * 3];
              linePositions[lineIdx++] = posArray[i * 3 + 1];
              linePositions[lineIdx++] = posArray[i * 3 + 2];
              linePositions[lineIdx++] = posArray[j * 3];
              linePositions[lineIdx++] = posArray[j * 3 + 1];
              linePositions[lineIdx++] = posArray[j * 3 + 2];
            }
          }
        }
        pointsGeo.attributes.position.needsUpdate = true;
        lineGeo.attributes.position.needsUpdate = true;
        lineGeo.setDrawRange(0, lineIdx / 3);

        // Soft spheres drift
        spheres.forEach(s => {
          s.mesh.position.y += Math.sin(t + s.phase) * 0.005;
          s.mesh.position.x += Math.cos(t + s.phase) * 0.003;
        });

        // Camera drift
        camera.position.x += (mouse.x - camera.position.x) * 0.02;
        camera.position.y += (mouse.y - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };
      animate();
    });

    return () => {
      disposed = true;
      if (onMouse) window.removeEventListener("mousemove", onMouse);
      if (onResize) window.removeEventListener("resize", onResize);
      if (animId) cancelAnimationFrame(animId);
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="hero-canvas"
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0, zIndex: 0 }}
    />
  );
}
