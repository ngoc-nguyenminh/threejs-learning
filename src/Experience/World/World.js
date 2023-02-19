import * as THREE from 'three'
import Experience from "../Experience.js"
import Environment from './Environment.js'

export default class  World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resource = this.experience.resources
        
        const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                // wireframe: true,
            })
        )
        this.scene.add(testMesh)

        //Environment
        this.environment = new Environment()
        
        //Waiting for resource
        this.resource.on('ready', () => {
            // this.setEnvironmentMap()
            this.environment = new Environment()
        })
    }

    // setEnvironmentMap() {
    //     this.environmentMap = {}
    //     this.experience.scene.background
    // }
}