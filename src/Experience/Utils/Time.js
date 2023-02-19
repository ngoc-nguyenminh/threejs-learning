import EventEmitter from "./EventEmitter.js";

export default class Time extends EventEmitter {
    constructor() {
        super()
        
        this.start = Date.now()
        // console.log(this.start)
        this.current = this.start
        this.elapsed = 0
        this.delta = 16
        // Why 16? Bcs normally, screens run at default 60fps, and the delta time between frames usually 16-ish miliseconds
        // Why not 0? They experience glitchs at the first frame using value 0
        
        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

    tick() {
        const currentTime = Date.now()
        this.delta = currentTime - this.current //Time between frames
        this.current = currentTime // Set the new current time for the next frame
        this.elapsed = this.current - this.start

        this.trigger('tick')

        window.requestAnimationFrame( () => {
            this.tick()
        })
    }
}