"use client";
import React, { useEffect, useRef } from "react";

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animId: number;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      const canvas = canvasRef.current;
      if (!canvas) return;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
      camera.position.z = 6;

      // Particles
      const count = 350;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const palette = [
        new THREE.Color(0x5a5fe8),
        new THREE.Color(0x8b5cf6),
        new THREE.Color(0x06b6d4),
        new THREE.Color(0xa855f7),
      ];
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
        const c = palette[Math.floor(Math.random() * palette.length)];
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const mat = new THREE.PointsMaterial({ size: 0.055, vertexColors: true, transparent: true, opacity: 0.6 });
      const particles = new THREE.Points(geo, mat);
      scene.add(particles);

      // Grid
      const lineMat = new THREE.LineBasicMaterial({ color: 0x5a5fe8, transparent: true, opacity: 0.04 });
      for (let i = -6; i <= 6; i++) {
        const hg = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-12, i * 1.5, -3), new THREE.Vector3(12, i * 1.5, -3),
        ]);
        scene.add(new THREE.Line(hg, lineMat));
        const vg = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(i * 2, -9, -3), new THREE.Vector3(i * 2, 9, -3),
        ]);
        scene.add(new THREE.Line(vg, lineMat));
      }

      // Torus
      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(2.5, 0.012, 16, 100),
        new THREE.MeshBasicMaterial({ color: 0x5a5fe8, transparent: true, opacity: 0.08, wireframe: false })
      );
      torus.position.set(5, -1, -2);
      scene.add(torus);

      const resize = () => {
        if (!canvas) return;
        camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      };
      window.addEventListener("resize", resize);

      let t = 0;
      const loop = () => {
        animId = requestAnimationFrame(loop);
        t += 0.003;
        particles.rotation.y = t * 0.1;
        particles.rotation.x = Math.sin(t * 0.25) * 0.07;
        torus.rotation.x = t * 0.3;
        torus.rotation.z = t * 0.15;
        renderer.render(scene, camera);
      };
      loop();

      cleanup = () => {
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(animId);
        renderer.dispose();
      };
    })();

    return () => { if (cleanup) cleanup(); else cancelAnimationFrame(animId); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
