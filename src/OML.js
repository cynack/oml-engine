import * as THREE from 'three'
import OrbitControls from 'three-orbit-controls'
import WebVR from './WebVR'
import OMLParser from './OMLParser'
import skyboxEast from './img/skybox_east.jpg'
import skyboxWest from './img/skybox_west.jpg'
import skyboxUp from './img/skybox_up.jpg'
import skyboxDown from './img/skybox_down.jpg'
import skyboxNorth from './img/skybox_north.jpg'
import skyboxSouth from './img/skybox_south.jpg'
const _OrbitControll = new OrbitControls(THREE)

/**
 * @class OML
 */
class OML {
  /**
   * @constructor
   * @param {HTMLDivElement} container
   * @returns {OML}
   */
  constructor (container, OMLData) {
    this.skyboxSize = 100
    this.container = container

    this.renderer = new THREE.WebGLRenderer({antialias: true})
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.vr.enabled = true
    this.renderer.shadowMap.enabled = true
    this.requestAnimationFrame = (...args) => {
      window.requestAnimationFrame(...args)
    }
    this.webvr = new WebVR(this.renderer)
    this.VRinitialized = this.webvr.init().then(() => {
      return this.webvr.getRequestAnimationFrame()
    }).then((requestAnimationFrame) => {
      if (requestAnimationFrame) {
        this.requestAnimationFrame = requestAnimationFrame
      }
    })
    container.appendChild(this.renderer.domElement)
    container.style.overflow = 'hidden'
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
    this.camera.position.set(0, 0, 0.1)
    this.scene.add(this.camera)
    // eslint-disable-next-line no-new
    new _OrbitControll(this.camera)

    this.light = new THREE.DirectionalLight(0xffffff, 0.7)
    /*
    this.light.castShadow = true
    this.light.shadow.camera.near = 0
    this.light.shadow.camera.far = 128
    this.light.shadow.camera.top = 64
    this.light.shadow.camera.bottom = -64
    this.light.shadow.camera.right = 64
    this.light.shadow.camera.left = -64
    this.light.shadow.mapSize.width = 8192
    this.light.shadow.mapSize.height = 8192
    */
    this.scene.add(this.light)
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    this.scene.add(this.ambientLight)
    this._setLight([60, 30, 0])

    const cubeLoader = new THREE.CubeTextureLoader()
    cubeLoader.load([skyboxEast, skyboxWest, skyboxUp, skyboxDown, skyboxNorth, skyboxSouth], (cubeTexture) => {
      const cubeShader = THREE.ShaderLib[ 'cube' ]
      cubeShader.uniforms[ 'tCube' ].value = cubeTexture
      cubeShader.uniforms[ 'tFlip' ].value = 1
      const skyBoxMaterial = new THREE.ShaderMaterial({
        fragmentShader: cubeShader.fragmentShader,
        vertexShader: cubeShader.vertexShader,
        uniforms: cubeShader.uniforms,
        depthWrite: false,
        side: THREE.BackSide
      })
      const skyMesh = new THREE.Mesh(new THREE.BoxGeometry(this.skyboxSize, this.skyboxSize, this.skyboxSize, 1, 1, 1), skyBoxMaterial)
      this.scene.add(skyMesh)
    })

    window.addEventListener('resize', () => {
      this._onResize(this)
    }, false)

    this.parser = new OMLParser(this.scene)
    if (OMLData) {
      console.warn('Calling constractor with OMLData is deprecated.\nPlease use setOML(OMLData)')
      this.setOML(OMLData)
    }
    this._animate()
  }

  /**
   * enterVR
   * @returns {Promise.<null>}
   */
  enterVR () {
    return this.VRinitialized.then(() => {
      return this.webvr.enterVR()
    })
  }

  /**
   * setOML
   * @param {OMLData} OMLData
   * @returns {Promise.<null>}
   */
  setOML (OMLData) {
    try {
      this.parser.setOML(OMLData)
      return Promise.resolve()
    } catch (e) {
      return Promise.reject(e)
    }
  }

  _onResize () {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
  }

  _setLight (params) {
    const lightVector = new THREE.Vector3(0, 0, 1)
    if (params.length === 3) {
      const eu = new THREE.Euler(-Math.PI * params[0] / 180, -Math.PI * params[1] / 180, Math.PI * params[2] / 180, 'XYZ')
      lightVector.applyEuler(eu)
    }
    if (params.length === 4) {
      const qt = new THREE.Quaternion(params[0], params[1], -params[2], Math.PI * params[3] / 180)
      lightVector.applyQuaternion(qt)
    }
    this.light.position.set(lightVector.x, lightVector.y, lightVector.z)
    this.ambientLight.position.set(lightVector.x, lightVector.y, lightVector.z)
  }

  _animate () {
    this.renderer.render(this.scene, this.camera)
    this.requestAnimationFrame(() => {
      this._animate()
    })
  }
}

export default OML
