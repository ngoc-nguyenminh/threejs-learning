import './style.css'
// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
// import * as CANNON from 'cannon-es'
// import { ACESFilmicToneMapping, MeshStandardMaterial, NoToneMapping, sRGBEncoding } from 'three'
// import { Sphere } from 'cannon-es'


// /**
//  * Base
//  */
// // Debug
// const gui = new dat.GUI()
// const debugObjects = {}

// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()

// //Loaders
// const gltfLoader = new GLTFLoader()
// const cubeTextureLoader = new THREE.CubeTextureLoader()

// const environmentMap = cubeTextureLoader.load([
//   'textures/environmentMaps/2/px.png',
//   'textures/environmentMaps/2/nx.png',
//   'textures/environmentMaps/2/py.png',
//   'textures/environmentMaps/2/ny.png',
//   'textures/environmentMaps/2/pz.png',
//   'textures/environmentMaps/2/nz.png',
// ])
// environmentMap.encoding = THREE.sRGBEncoding
// scene.background = environmentMap
// scene.environment = environmentMap

// const updateAllMaterial = () => {
//   scene.traverse((child) => {
//     if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
//       // child.material.envMap = environmentMap
//       child.material.envMapIntensity = debugObjects.envMapIntensity
//       child.castShadow = true
//       child.receiveShadow = true
//       child.material.needsUpdate = true
//     }
//   })
// }

// gltfLoader.load(
//   // '/models/FlightHelmet/glTF/FlightHelmet.gltf',
//   '/models/hamburger.glb',
//   (gltf) => {
//     scene.add(gltf.scene)
//     gltf.scene.scale.set(5, 5, 5)
//     gltf.scene.position.set(0, -1, 0)
//     // gltf.scene.position.set(0, -2, 0)
//     gltf.scene.scale.set(0.3, 0.3, 0.3)
//     gui.add(gltf.scene.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.001).name('rotation')
//     updateAllMaterial()
//   }
// )


// debugObjects.envMapIntensity = 5
// gui.add(debugObjects, 'envMapIntensity').min(0).max(10).step(0.001).onChange(updateAllMaterial)

// /**
//  * Models
//  */

// /**
//  * Floor
//  */

// /**
//  * Lights
//  */
// const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
// directionalLight.position.set(0.25, 3, -2.25)
// directionalLight.shadow.camera.far = 15
// directionalLight.shadow.mapSize.set(1024, 1024)
// directionalLight.castShadow = true
// directionalLight.shadow.normalBias = 0.00001 // Remove the weird grid-like shadows on the material (shadow acne)
// scene.add(directionalLight)

// // const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// // scene.add(directionalLightCameraHelper)

// gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('Light Intensity')
// gui.add(directionalLight.position, 'x').min(-10).max(10).step(0.001).name('Light posX')
// gui.add(directionalLight.position, 'y').min(-10).max(10).step(0.001).name('Light posY')
// gui.add(directionalLight.position, 'z').min(-10).max(10).step(0.001).name('Light posZ')
// gui.add(directionalLight.shadow, 'normalBias').min(0).max(0.1).step(0.000001)

// /**
//  * Sizes
//  */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.set(2, 2, 2)
// scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// // controls.target.set(0, 0.75, 0)
// controls.enableDamping = true

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas,
//     antialias: true //remove staircase effect
// })
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.physicallyCorrectLights = true
// renderer.outputEncoding = THREE.sRGBEncoding
// renderer.toneMapping = THREE.ReinhardToneMapping
// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap

// gui.add(renderer, 'toneMapping', { //Read more about tone mapping, which involve dynamic range
//   No: THREE.NoToneMapping,
//   ACESFilmic: THREE.ACESFilmicToneMapping,
//   Linear: THREE.LinearToneMapping,
//   Reinhard: THREE.ReinhardToneMapping,
//   Cineon: THREE.CineonToneMapping
// })
// .onFinishChange(() => {
//   renderer.toneMapping = Number(renderer.toneMapping)
//   updateAllMaterial()
// })

// /**
//  * Animate
//  */
// const clock = new THREE.Clock()
// let previousTime = 0

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()
//     const deltaTime = elapsedTime - previousTime
//     previousTime = elapsedTime

//     // Update controls
//     controls.update()

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()
import Experience from "./Experience/Experience.js";

const experience = new Experience(document.querySelector('canvas.webgl'))