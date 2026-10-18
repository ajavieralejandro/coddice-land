import { useEffect, useRef } from 'react';
import type { BufferGeometry, Material, WebGLRenderer } from 'three';

const COLORS = [0xf54927, 0xcc8978, 0xb6cc78, 0x78c9cc, 0xc1cc78];
const POSITIONS: Array<[number, number, number]> = [
  [0, 0, 0],
  [-1.5, -1.4, 0.1],
  [-1.6, 1.2, -0.3],
  [0.5, 1.9, -0.7],
  [1.1, -1.8, -0.3],
];

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return false;
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function Scene3D() {
  const hostRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const fallback = fallbackRef.current;
    if (!host || !fallback) return;

    const pointer = { x: 0, y: 0 };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const geometries: BufferGeometry[] = [];
    const materials: Material[] = [];
    let frame = 0;
    let renderer: WebGLRenderer | null = null;
    let observer: ResizeObserver | null = null;
    let disposed = false;

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
      pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
    };

    const release = () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      observer = null;
      host.removeEventListener('pointermove', onPointerMove);
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      geometries.length = 0;
      materials.length = 0;
      if (!renderer) return;
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
      renderer = null;
      fallback.style.display = '';
    };

    const mount = async () => {
      if (!canUseWebGL()) return;

      let THREE: typeof import('three');
      try {
        THREE = await import('three');
      } catch {
        return;
      }
      if (disposed) return;

      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        return;
      }

      if (disposed || !renderer.getContext()) {
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
        renderer = null;
        return;
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.setAttribute('aria-hidden', 'true');
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(6, 5, 9);
      camera.lookAt(0, 0, 0);

      scene.add(new THREE.HemisphereLight(0xffffff, 0x8b917f, 3));
      const light = new THREE.DirectionalLight(0xffffff, 4);
      light.position.set(3, 7, 6);
      scene.add(light);

      const group = new THREE.Group();
      scene.add(group);

      POSITIONS.forEach((position, index) => {
        const geometry = new THREE.BoxGeometry(1.25, 1.25, 1.25, 1, 1, 1);
        const material = new THREE.MeshStandardMaterial({
          color: COLORS[index],
          roughness: 0.3,
          metalness: 0.05,
        });
        geometries.push(geometry);
        materials.push(material);

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(position[0], position[1], position[2]);
        mesh.rotation.set(0.1 * index, 0.22 * index, 0.12);
        group.add(mesh);

        if (index === 0) return;

        const target = new THREE.Vector3(position[0], position[1], position[2]);
        const direction = target.clone();
        const lineGeometry = new THREE.CylinderGeometry(0.018, 0.018, direction.length(), 12);
        const lineMaterial = new THREE.MeshStandardMaterial({ color: 0xcbd0c3 });
        geometries.push(lineGeometry);
        materials.push(lineMaterial);

        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        line.position.copy(target.clone().multiplyScalar(0.5));
        line.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
        group.add(line);
      });

      const resize = () => {
        if (!renderer) return;
        const width = host.clientWidth;
        const height = host.clientHeight;
        if (!width || !height) return;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      observer = new ResizeObserver(resize);
      observer.observe(host);
      resize();
      host.addEventListener('pointermove', onPointerMove);

      const tick = (time: number) => {
        if (disposed || !renderer) return;
        const reduced = reducedMotion.matches;
        group.rotation.y = reduced ? 0.3 : Math.sin(time * 0.0002) * 0.3 + pointer.x * 0.25;
        group.rotation.x = pointer.y * 0.1;
        group.position.y = reduced ? 0 : Math.sin(time * 0.0007) * 0.12;
        renderer.render(scene, camera);
        frame = requestAnimationFrame(tick);
      };

      try {
        renderer.render(scene, camera);
      } catch {
        release();
        return;
      }

      if (disposed) {
        release();
        return;
      }

      fallback.style.display = 'none';
      frame = requestAnimationFrame(tick);
    };

    void mount();

    return () => {
      disposed = true;
      release();
    };
  }, []);

  return (
    <div
      className="scene"
      ref={hostRef}
      aria-label="Escultura animada de módulos de colores conectados"
    >
      <div className="sculpture" ref={fallbackRef} aria-hidden="true">
        <div className="block" />
        <div className="block" />
        <div className="block" />
        <div className="block" />
        <div className="block" />
      </div>
      <span className="scene-label">FIG. 01 — SISTEMAS EN CONEXIÓN</span>
    </div>
  );
}
