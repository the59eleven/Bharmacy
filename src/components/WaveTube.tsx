import { useEffect, useRef } from "react";
import * as THREE from "three";

function createWavePath(time: number): THREE.CatmullRomCurve3 {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < 50; i++) {
    const t = i / 49;
    const angle = t * Math.PI * 4;
    const radius = 8 + Math.sin(t * Math.PI * 2 + time) * 3;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(t * Math.PI * 2 + time * 0.5) * 5;
    const z = Math.sin(angle) * radius;
    points.push(new THREE.Vector3(x, y, z));
  }
  return new THREE.CatmullRomCurve3(points);
}

export default function WaveTube() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const initialPath = createWavePath(0);
    const geometry = new THREE.TubeGeometry(initialPath, 64, 0.6, 8, false);
    const material = new THREE.MeshBasicMaterial({
      color: 0xd4a048,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const waveMesh = new THREE.Mesh(geometry, material);
    scene.add(waveMesh);
    meshRef.current = waveMesh;

    const clock = new THREE.Clock();

    function animateWave() {
      const time = clock.getElapsedTime() * 0.5;
      const newPath = createWavePath(time);
      waveMesh.geometry.dispose();
      waveMesh.geometry = new THREE.TubeGeometry(newPath, 64, 0.6, 8, false);
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animateWave);
    }
    animateWave();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        opacity: 0.15,
      }}
    />
  );
}
