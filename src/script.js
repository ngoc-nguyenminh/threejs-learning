import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Texture loader
 */
const textureLoader = new THREE.TextureLoader()
const bakedTexture = textureLoader.load('textures/bakedShadow.jpg')
const simpleShadow = textureLoader.load('textures/simpleShadow.jpg')

/**
 * Lights
 * 
 * We have to enable lights to cast shadows, but only pointlight, directionalLight and spotLight can cast shadows
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(2, 2, - 1)
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(directionalLight)

directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024,1024)
//Add shadow camera helpler
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.camera.left = -2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.near = 0.01
directionalLight.shadow.camera.far = 6
const directionalShadowCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(directionalShadowCameraHelper)

const spotLight = new THREE.SpotLight(0xffffff, 0.5, 10, Math.PI / 5, 0.3, 1)
spotLight.position.set(1, 4, 3)
spotLight.castShadow = true
spotLight.shadow.mapSize.set(1024,1024)
spotLight.shadow.camera.fov = 30


spotLight.shadow.camera.top = 2
spotLight.shadow.camera.bottom = -2
spotLight.shadow.camera.left = -2
spotLight.shadow.camera.right = 2
spotLight.shadow.camera.near = 0.01
spotLight.shadow.camera.far = 6

const spotShadowCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
scene.add(spotLight, spotLight.target)
/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7
gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

/**
 * Objects
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.castShadow = true

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.5
plane.receiveShadow = true

scene.add(sphere, plane)

const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({
        transparent: true,
        color: 0X000000,
        alphaMap: simpleShadow
    })
)
shadowPlane.rotation.x = - Math.PI / 2
shadowPlane.position.y = - 0.4999
scene.add(shadowPlane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = false //Enable renderer to cast shadows
renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    sphere.position.x = Math.sin(elapsedTime) * 2
    sphere.position.z = Math.cos(elapsedTime) * 2
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3))

    shadowPlane.position.x = Math.sin(elapsedTime) * 2
    shadowPlane.position.z = Math.cos(elapsedTime) * 2
    shadowPlane.material.opacity = 1.1 - Math.abs(Math.sin(elapsedTime * 3))
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()