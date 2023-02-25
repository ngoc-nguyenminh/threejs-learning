import './style.css'
import * as THREE from 'three';
import gsap from 'gsap'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { MirroredRepeatWrapping } from 'three';

const scene = new THREE.Scene()
const canvas = document.querySelector('canvas.webgl')

//Texture
const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
    console.log('onStart')
}

loadingManager.onLoad= () => {
    console.log('onLoad')
}

loadingManager.onProgress= () => {
    console.log('onProgress')
}

loadingManager.onError= () => {
    console.log('onError')
}
const textureLoader = new THREE.TextureLoader(loadingManager)

const colorTexture = textureLoader.load('/textures/minecraft.png')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3

// colorTexture.wrapS = MirroredRepeatWrapping
// colorTexture.wrapT = MirroredRepeatWrapping

// colorTexture.offset.x = 0.5

// colorTexture.rotation = 1

colorTexture.generateMipmaps = false //Gain performance when bcause u dont have to make mip maps when u only need nearest filter
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

//Debug
const gui = new dat.GUI({closed: true})
gui.hide()

const parameter = {
    color: 0xff0000,
    spin: () => {
        gsap.to(mesh.rotation, {duration: 100, y: mesh.rotation.y + 10})
    }
}
gui
    .addColor(parameter, 'color')
    .onChange(() => {
        material.color.set(parameter.color)
    })

gui
    .add(parameter, 'spin')

//Cursor
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
})

// Box
const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 2, 2, 2)

// const geometry = new THREE.BufferGeometry()

// const count = 500


// const positionsArray = new Float32Array(count * 3 * 3)
// for (let i = 0; i < count * 3 * 3; i++) {
//     positionsArray[i] = (Math.random() - 0.5) * 4
// }

// const positionsAttibute = new THREE.BufferAttribute(positionsArray, 3)

// geometry.setAttribute('position', positionsAttibute)

const material = new THREE.MeshBasicMaterial({ 
    map: colorTexture
    // color: parameter.color,
    // wireframe: true
})
const mesh = new THREE.Mesh(
    geometry, material
)
scene.add(mesh)
gui
    .add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('elevation')

gui
    .add(mesh, 'visible')
gui
    .add(material, 'wireframe')

// sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    //update size
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) //Helps when user change to another monitor
})

//Handle fullscreen
const fullscreenElement = document.fullscreenElement || document.webktiFullscreenElement
window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        }
        else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }
})

// Camera
const aspectRatio = sizes.width / sizes.height
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, .1, 100)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

//Orbit Control
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//Axes Helper
const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

//Rotation
// mesh.rotation.reorder('YXZ')

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
// gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 })

//Clock

const clock = new THREE.Clock()

// Animation
const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    // console.log(elapsedTime)

    //Update camera
    // camera.position.x = Math.sin(cursor.x * 2 * Math.PI) * 3
    // camera.position.z = Math.cos(cursor.x * 2 * Math.PI) * 3
    // camera.position.y = cursor.y *3
    // camera.lookAt(mesh.position)

    // mesh.rotation.y = elapsedTime

    //Renderer
    controls.update() //Must use when using damping
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()