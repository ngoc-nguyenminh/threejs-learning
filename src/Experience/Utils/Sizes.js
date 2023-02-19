import EventEmitter from "./EventEmitter.js"
//Why using this class when we can use addEventListener? the addEventListener can only listen to default events, with this class, we can create and handle more events

export default class Sizes extends EventEmitter {
    constructor() {
        super()
        //Set up
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        //Add resizing
        window.addEventListener('resize', () => {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            
            this.trigger('resize')
        })
    }
}