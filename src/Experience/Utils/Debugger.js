import * as dat from 'dat.gui'
import Experience from '../Experience.js'

export default class Debugger {
    constructor() {
        this.active = window.location.hash === '#debug'
        if(this.active) {
            this.gui = new dat.GUI(/*{closed: true}*/)
            this.experience = new Experience()
            this.scene = this.experience.scene
            // this.scene.add(this.gui)
        }
    }
}