import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function VialScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const vial = new THREE.Group();

    // Glass body
    const glassGeo = new THREE.CylinderGeometry(0.6, 0.6, 2.5, 32, 1, true);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0,
      transmission: 0.95,
      thickness: 0.5,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    vial.add(glass);

    // Liquid inside
    const liquidGeo = new THREE.CylinderGeometry(0.52, 0.52, 2.0, 32);
    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: 0xd4a048,
      metalness: 0.1,
      roughness: 0.2,
      transparent: true,
      opacity: 0.7,
      emissive: 0xd4a048,
      emissiveIntensity: 0.15,
    });
    const liquid = new THREE.Mesh(liquidGeo, liquidMat);
    liquid.position.y = -0.15;
    vial.add(liquid);

    // Cap
    const capGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.4, 32);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0x888888,
      metalness: 0.9,
      roughness: 0.3,
    });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = 1.35;
    vial.add(cap);

    // Rim ring
    const rimGeo = new THREE.TorusGeometry(0.62, 0.03, 16, 32);
    const rim = new THREE.Mesh(rimGeo, capMat);
    rim.position.y = 1.15;
    rim.rotation.x = Math.PI / 2;
    vial.add(rim);

    // Add vial to scene
    scene.add(vial);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 5, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xd4a048, 2, 10);
    pointLight.position.set(-3, 2, 3);
    scene.add(pointLight);

    // Dust particles
    const dustCount = 100;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = Math.random() * 3 - 1.5;
      dustPositions[i * 3 + 1] = Math.random() * 3 - 1.5;
      dustPositions[i * 3 + 2] = Math.random() * 3 - 1.5;
    }
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      color: 0xd4a048,
      size: 0.015,
      transparent: true,
      opacity: 0.4,
    });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);

    const clock = new THREE.Clock();

    function animate() {
      const time = clock.getElapsedTime();
      vial.rotation.y = time * 0.3;
      vial.position.y = Math.sin(time * 0.5) * 0.1;
      dust.rotation.y = time * 0.05;
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    }
    animate();

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
      glassGeo.dispose();
      glassMat.dispose();
      liquidGeo.dispose();
      liquidMat.dispose();
      capGeo.dispose();
      capMat.dispose();
      rimGeo.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
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
        zIndex: 1,
      }}
    />
  );
}
