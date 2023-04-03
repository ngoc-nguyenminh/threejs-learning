import Experience from '../Experience.js'
import * as THREE from 'three'
import testVertexShader from '~/src/shaders/test/vertex.glsl'
import testFragmentShader from '~/src/shaders/test/fragment.glsl'

export default class Floor {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resource = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debugger
        
        this.setGeometry()
        this.setTexture()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
        this.geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32)
        const count = this.geometry.attributes.position.count
        const randoms = new Float32Array(count)
        
        for (let i = 0; i < count; i++) {
            randoms[i] = Math.random()
        }
        
        this.geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
    }

    setMaterial() {
        this.material = new THREE.ShaderMaterial({
            vertexShader: testVertexShader,
            fragmentShader: testFragmentShader,
            uniforms: {
                uFrequency: { value: new THREE.Vector2(10, 5) },
                uTime: { value: 0 },
                uColor: { value: new THREE.Color('orange') },
                uTexture: { value: this.textures.color }
            },
            map: this.textures.color ,
            // wireframe: true
        })
        if(this.debug.active) {
            // this.debug.gui.add(this.geometry.position.value, 'x').max(20).min(0).step(0.001)
            this.debug.gui.add(this.material.uniforms.uFrequency.value, 'y').max(20).min(0).step(0.001)
        }
    }

    setTexture() {
        this.textures = {}

        this.textures.color = this.resource.items.flagColorTexture
        // this.textures.color = this.resource.items.grassColorTexture
        // this.textures.color.encoding = THREE.sRGBEncoding
        // this.textures.color.repeat.set(1.5, 1.5)
        // this.textures.color.wrapS = THREE.RepeatWrapping
        // this.textures.color.wrapT = THREE.RepeatWrapping

        // this.textures.normal = this.resource.items.grassNormalTexture
        // this.textures.normal.repeat.set(1.5, 1.5)
        // this.textures.normal.wrapS = THREE.RepeatWrapping
        // this.textures.normal.wrapT = THREE.RepeatWrapping
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }

    update() {
        this.material.uniforms.uTime.value = this.time.elapsed
    }
}
