import * as THREE from 'three'
import Experience from './Experience.js'

export default class Renderer {
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera
        this.canvas = this.experience.canvas
        this.scene = this.experience.scene

        this.setInstance()
    }

    setInstance() {
        this. instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true // Remove staircase effect
        })
        // console.log(this.instance)
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
        this.instance.toneMappingExposure = 1.75
        this.instance.setClearColor('#211d20')
        this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = THREE.sRGBEncoding
        this.instance.toneMapping = THREE.ReinhardToneMapping
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }
    
    update() {
        this.instance.render(this.scene, this.camera.instance)
    }
}