import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Mesh } from 'three'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Debug GUI
 */
const gui = new dat.GUI()
// gui.hide()

/**
 * Texture
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const minecraftTexture = textureLoader.load('/textures/minecraft.png')
minecraftTexture.minFilter = THREE.NearestFilter

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/3.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')
doorColorTexture.minFilter = THREE.NearestFilter

const environmentMapTexture = cubeTextureLoader.load([
    'textures/environmentMaps/0/px.jpg',
    'textures/environmentMaps/0/nx.jpg',
    'textures/environmentMaps/0/py.jpg',
    'textures/environmentMaps/0/ny.jpg',
    'textures/environmentMaps/0/pz.jpg',
    'textures/environmentMaps/0/nz.jpg',
])

/**
 * Materials
 */

// const mateiral = new THREE.MeshBasicMaterial()
// mateiral.map = doorColorTexture
// mateiral.transparent = true
// mateiral.opacity = 0.5

// const material = new THREE.MeshNormalMaterial()
// material.wireframe = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture //We can stimulate light even though there is no lights

// const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

// const material = new THREE.MeshToonMaterial()



// const material = new THREE.MeshStandardMaterial()
// material.roughness = 1
// material.metalness = 0
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// // material.aoMapIntensity = 100
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.05

// material.metalnessMap = doorMetalnessTexture //don't overload attributes when using loaded textures, ugly as hell
// material.roughnessMap = doorRoughnessTexture

// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)

// material.transparent = true
// material. alphaMap = doorAlphaTexture //Enable material's transpaency to play with alphaMap
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.2
material.metalness = 0.7
material.envMap = environmentMapTexture

gui
    .add(material, 'displacementScale')
    .min(0)
    .max(1)
    .step(0.01)
    .name('displacement Scale')

gui
    .add(material, 'aoMapIntensity')
    .min(0)
    .max(10)
    .step(0.01)
    .name('aoMapIntensity')

gui
    .add(material, 'metalness')
    .min(0)
    .max(1)
    .step(0.01)
    .name('Metalness')

gui
    .add(material, 'roughness')
    .min(0)
    .max(1)
    .step(0.01)
    .name('Roughness')

const sphere = new THREE.Mesh (
    new THREE.SphereBufferGeometry(0.5, 64,64),
    material
)
sphere.position.x += 1.5
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))

scene.add(sphere)

const plane = new THREE.Mesh (
    new THREE.PlaneBufferGeometry(1, 1, 100, 100),
    material
)
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))

scene.add(plane)


const torus = new THREE.Mesh (
    new THREE.TorusBufferGeometry(0.4, 0.1, 64, 128),
    material
)
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))

torus.position.x -= 1.5
scene.add(torus)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x  = 2
pointLight.position.y  = 3
pointLight.position.z  = 4
scene.add(pointLight)


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

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //Update objects
    sphere.rotation.y = elapsedTime * 0.2
    plane.rotation.y = elapsedTime * 0.2
    torus.rotation.y = elapsedTime * 0.2

    sphere.rotation.x = elapsedTime * 0.2
    plane.rotation.x = elapsedTime * 0.2
    torus.rotation.x = elapsedTime * 0.2

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()