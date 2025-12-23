const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 animate-gradient" />
      
      {/* Animated Medical Cross Pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-x-0 top-1/2 h-2 bg-primary transform -translate-y-1/2" />
              <div className="absolute inset-y-0 left-1/2 w-2 bg-primary transform -translate-x-1/2" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Floating Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>
    </div>
  );
};
export default AnimatedBackground;

// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

// const AnimatedBackgroundWithGLBAnd3DUI = () => {
//   const mountRef = useRef<HTMLDivElement>(null);
//   const uiContainerRef = useRef<HTMLDivElement>(null);
//   const sceneRef = useRef<THREE.Scene>();
//   const cssSceneRef = useRef<THREE.Scene>();
//   const rendererRef = useRef<THREE.WebGLRenderer>();
//   const cssRendererRef = useRef<CSS3DRenderer>();
//   const cameraRef = useRef<THREE.PerspectiveCamera>();
//   const controlsRef = useRef<OrbitControls>();
//   const modelRef = useRef<THREE.Group | null>(null);
//   const textureRef = useRef<THREE.Texture | null>(null);
//   const uiObjectRef = useRef<CSS3DObject | null>(null);

//   useEffect(() => {
//     if (!mountRef.current || !uiContainerRef.current) return;

//     // WebGL Scene for GLB and HDR
//     const scene = new THREE.Scene();
//     sceneRef.current = scene;

//     const cssScene = new THREE.Scene();
//     cssSceneRef.current = cssScene;

//     // Shared Camera
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.set(0, 0, 5); // Start zoomed out, looking at origin
//     cameraRef.current = camera;

//     // WebGL Renderer
//     const renderer = new THREE.WebGLRenderer({ 
//       alpha: true, 
//       antialias: true 
//     });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(0x000000, 0);
//     mountRef.current.appendChild(renderer.domElement);
//     rendererRef.current = renderer;

//     // CSS3D Renderer (for UI)
//     const cssRenderer = new CSS3DRenderer();
//     cssRenderer.setSize(window.innerWidth, window.innerHeight);
//     cssRenderer.domElement.style.position = 'absolute';
//     cssRenderer.domElement.style.top = '0';
//     cssRenderer.domElement.style.pointerEvents = 'none'; // Let UI handle its own events
//     mountRef.current.appendChild(cssRenderer.domElement);
//     cssRendererRef.current = cssRenderer;

//     // Load HDR
//     const hdrLoader = new RGBELoader();
//     hdrLoader.load(
//       '/path/to/your-medical-hdr.hdr',
//       (texture) => {
//         texture.mapping = THREE.EquirectangularReflectionMapping;
//         scene.background = texture;
//         scene.environment = texture;
//         textureRef.current = texture;
//       },
//       undefined,
//       (error) => console.error('HDR error:', error)
//     );

//     // Load GLB Model (at origin)
//     const gltfLoader = new GLTFLoader();
//     gltfLoader.load(
//       '/path/to/your-model.glb',
//       (gltf) => {
//         const model = gltf.scene;
//         model.scale.set(1, 1, 1);
//         model.position.set(0, 0, 0);
//         scene.add(model);
//         modelRef.current = model;
//       },
//       undefined,
//       (error) => console.error('GLB error:', error)
//     );

//     // Add UI as 3D Object
//     const uiElement = uiContainerRef.current;
//     uiObjectRef.current = new CSS3DObject(uiElement);
//     uiObjectRef.current.position.set(0, 0, 0); // Position UI at model center; adjust as needed (e.g., (2, 1, 0) for offset)
//     uiObjectRef.current.scale.set(1, 1, 1);
//     cssScene.add(uiObjectRef.current);

//     // Hide the original UI container (it's now rendered in 3D)
//     uiElement.style.display = 'none';

//     // Ambient Light
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
//     scene.add(ambientLight);

//     // OrbitControls (shared camera - moves model AND UI together)
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.05;
//     controls.enableZoom = true;
//     controls.enablePan = true; // Enables panning
//     controls.minDistance = 1;
//     controls.maxDistance = 10;
//     controls.target.set(0, 0, 0); // Orbit around model/UI center
//     controlsRef.current = controls;

//     // Resize Handler
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       cssRenderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener('resize', handleResize);

//     // Animation Loop
//     const animate = () => {
//       requestAnimationFrame(animate);
      
//       // Rotate model gently (UI stays fixed relative to model)
//       if (modelRef.current) {
//         modelRef.current.rotation.y += 0.002; // Slower for stability
//       }
      
//       // Update controls
//       controls.update();
      
//       // Render both scenes with shared camera
//       renderer.render(scene, camera);
//       cssRenderer.render(cssScene, camera);
//     };
//     animate();

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       if (controls) controls.dispose();
//       if (renderer) {
//         renderer.dispose();
//       }
//       // CSS3DRenderer doesn't have dispose() - just clean up DOM
//       if (mountRef.current) {
//         if (renderer.domElement && mountRef.current.contains(renderer.domElement)) {
//           mountRef.current.removeChild(renderer.domElement);
//         }
//         if (cssRenderer.domElement && mountRef.current.contains(cssRenderer.domElement)) {
//           mountRef.current.removeChild(cssRenderer.domElement);
//         }
//       }
//       // Restore UI visibility
//       if (uiElement) uiElement.style.display = 'block';
//       if (uiObjectRef.current && cssScene) {
//         cssScene.remove(uiObjectRef.current);
//       }
//       // Dispose HDR texture if loaded
//       if (textureRef.current) {
//         textureRef.current.dispose();
//       }
//     };
//   }, []);

//   return (
//     <>
//       {/* 3D Canvas Container */}
//       <div ref={mountRef} className="fixed inset-0 -z-10 overflow-hidden" />
      
//       {/* UI Container - This will be embedded in 3D */}
//       <div ref={uiContainerRef} className="min-h-screen bg-transparent text-white p-8">
//         {/* Your entire website content here - it will move with the GLB! */}
//         {/* Example: Navigation, Login, Dashboard, etc. */}
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-4xl font-bold mb-4">Hospital Management System</h1>
//           <p className="text-lg mb-4">Orbit, pan, and zoom the mouse to move the 3D model. The entire UI moves with it!</p>
//           {/* Embed your <LoginPage />, <Dashboard />, etc. here */}
//           {/* For example: <LoginPage onLogin={...} /> */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AnimatedBackgroundWithGLBAnd3DUI;