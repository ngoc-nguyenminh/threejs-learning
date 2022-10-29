import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded'
}

gui
    .addColor(parameters, 'materialColor')


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
// scene.add(ambientLight)

const pointLight = new THREE.PointLight(0Xff9000, 1, 10)
pointLight.position.x  = 100
pointLight.position.y  = 2
pointLight.position.z  = 3
scene.add(pointLight)
// const pointLight = new THREE.DirectionalLight('#ff9000', 0.5)
// scene.add(pointLight)
const helper = new THREE.PointLightHelper(pointLight)
// scene.add(helper)
/**
 * net
const geometry = new THREE.BoxBufferGeometry(.5, .5, .5)

const boxMaterial = new THREE.MeshStandardMaterial({
    color: '#ffffff'
})

const positions = new Float32Array(21 * 21 * 3)
for (let i = 0; i <= 20; i++) {
    for (let j = 0; j <= 20; j++) {
        const col = new THREE.Mesh(
            geometry,
            boxMaterial
        )
        col.position.x = i - 10
        col.position.y = 0
        col.position.z = j - 10

        // positions[((i * 21) + j) * 3] = i - 10
        // positions[((i * 21) + j) * 3 + 1] = 0
        // positions[((i * 21) + j) * 3 + 2] = j - 10

        col.geometry.setAttribute('uv2', new THREE.BufferAttribute(col.geometry.attributes.uv.array, 2))
        col.receiveShadow = true
        scene.add(col)
    }
}
*/
const fontLoader = new FontLoader()
fontLoader.load(
    'fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'You Sucks',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )
        // textGeometry.computeBoundingBox() //Bounding box surround object to help with fustrum culling (render objects only when it needed to)
        // textGeometry.translate( //center object with bounding box in mind
        //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5
        // )
        textGeometry.center()

        const textMaterial = new THREE.MeshStandardMaterial()
        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)
    }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

document.addEventListener('mousemove', onMouseMove, false);
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
 * Mouse
 */
const mouse = new THREE.Vector2()
// window.addEventListener('mousemove', (event) => {
//     mouse.x = event.clientX / sizes.width * 2 - 1 //Cursor from -1 to 1
//     mouse.y = - (event.clientY / sizes.height * 2 - 1)
// })
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(-2, 1, 3)
camera.lookAt(new THREE.Vector3(0,0,0))
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

function onMouseMove(event) {
	event.preventDefault();
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    pointLight.position.x = mouse.x * 15
    pointLight.position.z = - mouse.y * 15


	// let vector = new THREE.Vector3(mouse.x, mouse.y, 0);
	// vector.unproject(camera);
	// let dir = vector.sub(camera.position).normalize();
	// let distance = -camera.position.z / dir.z;
	// let pos = camera.position.clone().add(dir.multiplyScalar(distance));
	// pointLight.position.copy(pos);
};

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()