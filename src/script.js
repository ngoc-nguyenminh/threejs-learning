import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import * as CANNON from 'cannon-es'
import { MeshStandardMaterial } from 'three'

/**
 * Debug
 */
const gui = new dat.GUI()
const debugObjects = {}

debugObjects.createSphere = () => {
    createSphere(
        Math.random(), 
        new THREE.Vector3(
            (Math.random() -0.5) * 3, 
            3, 
            (Math.random() -0.5) * 3
        )
    )
}
debugObjects.createBox = () => {
    createBox(
        Math.random() * 3,
        Math.random() * 3,
        Math.random() * 3, 
        new THREE.Vector3(
            (Math.random() -0.5) * 3, 
            3, 
            (Math.random() -0.5) * 3
        )
    )
}

debugObjects.reset = () => { 
    for (const object of objectsToUpdate) {
        //Remove physical world
        object.body.removeEventListener('collide', playHitSound)
        world.removeBody(object.body)
        
        //remove meshes
        scene.remove(object.mesh)
    }
    
}

gui.add(debugObjects, 'createSphere')
gui.add(debugObjects, 'createBox')
gui.add(debugObjects, 'reset')

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sounds
 */
const hitSound = new Audio('/sounds/hit.mp3')

const playHitSound = (collision) => {
    if (collision.contact.getImpactVelocityAlongNormal() > 1.5) {
        hitSound.volume = Math.random()
        hitSound.currentTime = 0    //Dont have to wait for the previpous collision sound to finish
        hitSound.play()
    }
}

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.png',
    '/textures/environmentMaps/0/nx.png',
    '/textures/environmentMaps/0/py.png',
    '/textures/environmentMaps/0/ny.png',
    '/textures/environmentMaps/0/pz.png',
    '/textures/environmentMaps/0/nz.png'
])

/**Physics
 * 
 */
//World
const world = new CANNON.World()
world.broadphase = new CANNON.SAPBroadphase(world) //Default broadphase is naive broadphase, when 1 object test their collison with all other objects
world.allowSleep = true //Sleep objects mean no moving, no affected, only waken up by foreign force
world.gravity.set(0, -9.82, 0)

// Material
const defaultMaterial = new CANNON.Material('default')
const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: 0.8,
        restitution: 0.7
    }
)
world.addContactMaterial(defaultContactMaterial)
world.defaultContactMaterial = defaultContactMaterial


// Floor
const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body()
floorBody.addShape(floorShape)
floorBody.mass = 0
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), - Math.PI / 2)
world.addBody(floorBody)


/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#777777',
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5,
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

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
 * Utils
 */
const objectsToUpdate = []

const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20)
const boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1)
const sphereMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture
})

const createSphere = (radius, position) => {
    //Three.js Mesh
    const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
    mesh.scale.set(radius, radius, radius)
    mesh.castShadow = true
    mesh.position.copy(position)
    scene.add(mesh)

    //Cannon body
    const shape = new CANNON.Sphere(radius)
    const body = new CANNON.Body({
        mass: 1,
        shape,
        material: defaultMaterial
    })
    body.position.copy(position)
    world.addBody(body)

    //Save objects to update
    objectsToUpdate.push(
        {
            mesh: mesh,
            body: body
        }
    )
}

const createBox = (width, height, depth, position) => {
    //Three.js Mesh
    const mesh = new THREE.Mesh(boxGeometry, sphereMaterial)
    mesh.scale.set(width, height, depth)
    mesh.castShadow = true
    mesh.position.copy(position)
    scene.add(mesh)

    //Cannon body
    const shape = new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5))
    const body = new CANNON.Body({
        mass: 1,
        shape,
        material: defaultMaterial
    })
    body.position.copy(position)
    body.addEventListener('collide', playHitSound)
    world.addBody(body)

    //Save objects to update
    objectsToUpdate.push(
        {
            mesh: mesh,
            body: body
        }
    )
}

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(- 3, 3, 3)
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
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let oldElapsedTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime

    // Update world physics
    world.step(1 / 60, deltaTime, 3)
    for (const object of objectsToUpdate) {
        object.mesh.position.copy(object.body.position)
        object.mesh.quaternion.copy(object.body.quaternion)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()