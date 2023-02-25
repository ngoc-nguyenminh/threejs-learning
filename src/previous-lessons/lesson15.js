import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DirectionalLight, Mesh } from 'three'
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

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4
// material.wireframe = true

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, .5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0X00fffc, 0.3)
directionalLight.position.set(1, 1, 2)
scene.add(directionalLight)

const hemisphereLight = new THREE.HemisphereLight(0x0000FF, 0XFF0000, 0.3)
scene.add(hemisphereLight)

const pointLight = new THREE.PointLight(0Xff9000, 0.3)
pointLight.position.x  = 1
pointLight.position.y  = 2
pointLight.position.z  = 3
scene.add(pointLight)

const rectAreaLight = new THREE.RectAreaLight(0X4e00ff, 3, 3, 2)
rectAreaLight.position.set(1.5, -0.5, 1.5)
rectAreaLight.lookAt(new THREE.Vector3())
scene.add(rectAreaLight)

const spotLight = new THREE.SpotLight(0X78ff00, 1, 6, Math.PI/10, 0.25, 1)
spotLight.position.set(0,2,3)

spotLight.target.position.x = -0.75 //Change spotlight's target, BUT
scene.add(spotLight.target) //We have to add the target (which is a 3DObject class)

scene.add(spotLight)
/**
 * Be mindful that too much lights are bad for performance, so try to use as less as possible.
 * Some of the cost lights:
 * minimum cost lights: AmbientLight and HemisphereLight
 * Moderate cost lights: DirectionalLight and PointLight
 * High cost: SpotLight and RectAreaLight
 */


/**
 * Objects
 */

/**
 * @const sphere
 */
const sphere = new THREE.Mesh (
    new THREE.SphereBufferGeometry(0.5, 32, 32),
    material
)
sphere.position.x += 1.5
scene.add(sphere)

const cube = new THREE.Mesh (
    new THREE.BoxBufferGeometry(0.7, 0.7, 0.7, 2, 2, 2),
    material
)
scene.add(cube)

const torus = new THREE.Mesh (
    new THREE.TorusBufferGeometry(0.3, 0.2, 64, 128),
    material
)
torus.position.x -= 1.5
scene.add(torus)

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(5, 5, 100, 100),
    material
)
plane.rotation.x = - Math.PI/2
plane.position.y = -1
scene.add(plane)
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
    cube.rotation.y = elapsedTime * 0.2
    torus.rotation.y = elapsedTime * 0.2

    sphere.rotation.x = elapsedTime * 0.2
    cube.rotation.x = elapsedTime * 0.2
    torus.rotation.x = elapsedTime * 0.2

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
