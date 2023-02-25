import * as THREE from 'three'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import sources from './sources.js'
import Debugger from './Debug/Debugger.js'

//We will construct this class as a singleton
//What is singleton class? It's a class that creates only one object, so whenever it's constructor is call, it will return the existed object (if already existed) 

let instance = null

export default class Experience 
{
    constructor(canvas) {
        if(instance) {
            return instance // return object if already created
        }
        instance = this

        // Setup
        window.experience = this
        this.canvas = canvas
        this.sizes = new Sizes()
        this.time = new Time()
        this.resources = new Resources(sources)
        this.scene = new THREE.Scene()
        this.debugger = new Debugger()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        
        this.sizes.on('resize', () => {
            this.resize()
        })

        this.time.on('tick', () => {
            this.update()
        })
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }
}