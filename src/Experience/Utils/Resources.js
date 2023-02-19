import * as THREE from 'three'
import EventEmitter from './EventEmitter.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class Resources extends EventEmitter {
    constructor(sources) {
        super()

        // Options
        this.sources = sources

        // Set up
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders() {
        this.loader = {}
        this.textureLoader = new THREE.TextureLoader()
        this.cubeTextureLoader = new THREE.CubeTextureLoader()
        this.gltfLoader = new GLTFLoader()
    }

    startLoading() {
        // Load each sources
        for (const source of this.sources) {
            if(source.type === 'gltfModel') {
                this.gltfLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }

            if(source.type === 'texture') {
                this.textureLoader.load(
                    source.path, 
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }

            if(source.type === 'cubeTexture') {
                this.cubeTextureLoader.load(
                    source.path, 
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file) {
        this.items[source.name] = file
        this.loaded ++

        if(this.loaded === this.toLoad) {
            this.trigger('ready')
        }
    }
}