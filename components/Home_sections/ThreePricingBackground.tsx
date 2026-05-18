"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreePricingBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Get section dimensions
    const getWidth = () => containerRef.current?.clientWidth || window.innerWidth;
    const getHeight = () => containerRef.current?.clientHeight || window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, getWidth() / getHeight(), 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(getWidth(), getHeight());
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Geometry & Material (Icosahedron for a gem/tech look)
    const geometry = new THREE.IcosahedronGeometry(2.8, 1);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ 
      color: 0x10b981, // Brand green color
      transparent: true,
      opacity: 0.12
    });
    
    const wireframe = new THREE.LineSegments(edges, material);
    scene.add(wireframe);

    // Mouse interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onDocumentMouseMove = (event: MouseEvent) => {
      // Calculate mouse position relative to center of screen
      mouseX = (event.clientX - window.innerWidth / 2);
      mouseY = (event.clientY - window.innerHeight / 2);
    };

    document.addEventListener("mousemove", onDocumentMouseMove);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Base slow ambient rotation
      const baseRotationX = elapsedTime * 0.05;
      const baseRotationY = elapsedTime * 0.1;

      // Mouse interaction lerp (smoothly follow mouse)
      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;

      // Apply combined rotation
      wireframe.rotation.y = baseRotationY + (targetX * 0.5);
      wireframe.rotation.x = baseRotationX + (targetY * 0.5);

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = getWidth();
      const newHeight = getHeight();
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", onDocumentMouseMove);
      cancelAnimationFrame(animationFrameId);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      edges.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center mix-blend-screen"
    />
  );
}
