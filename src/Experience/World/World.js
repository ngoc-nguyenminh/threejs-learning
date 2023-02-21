import * as THREE from 'three'
import Experience from "../Experience.js"
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'

export default class  World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resource = this.experience.resources

        //Waiting for resource
        this.resource.on('ready', () => {
            this.fox = new Fox()
            this.floor = new Floor()
            this.environment = new Environment()
        })
    }

    update() {
        if(this.fox) {
            this.fox.update()
        }
    }
    // setEnvironmentMap() {
    //     this.environmentMap = {}
    //     this.experience.scene.background
    // }
}