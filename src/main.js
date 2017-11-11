/*global window*/
import OMLElement from './OMLElement'
import * as THREE from 'three'

class OML {
  constructor(container, OML) {
    this.skyboxSize = 100
    this.container = container

    this.renderer = new THREE.WebGLRenderer({antialias: true})
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.vr.enabled = true
    this.renderer.shadowMap.enabled = true
    container.appendChild(this.renderer.domElement)
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, container.clientWidth/container.clientHeight, 0.1, 1000)
    this.cameraCtl = new THREE.Group()
    this.cameraCtl.quaternion.set(0, 0, 0, 1)
    this.cameraCtl.add(this.camera)
    this.scene.add(this.cameraCtl)

    this.light = new THREE.DirectionalLight(0xffffff, 0.7)
    this.light.castShadow = true
    this.light.shadow.camera.near = 0
    this.light.shadow.camera.far = 128
    this.light.shadow.camera.top = 64
    this.light.shadow.camera.bottom = -64
    this.light.shadow.camera.right = 64
    this.light.shadow.camera.left = -64
    this.light.shadow.mapSize.width = 8192
    this.light.shadow.mapSize.height = 8192
    this.scene.add(this.light)
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    this.scene.add(this.ambientLight)
    this._setLight([60, 30, 0])

    const cubeLoader = new THREE.CubeTextureLoader()
    cubeLoader.load([
      'img/skybox_east.jpg',
      'img/skybox_west.jpg',
      'img/skybox_up.jpg',
      'img/skybox_down.jpg',
      'img/skybox_north.jpg',
      'img/skybox_south.jpg'
    ], (cubeTexture)=>{
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

    window.addEventListener('resize', ()=>{this.onResize.call(this)}, false)
    this.renderer.animate(()=>{this._animate.call(this)})

    if(OML) {
      this.viewOML(OML)
    }
  }


  onResize() {
    this.camera.aspect = this.container.clientWidth/this.container.clientHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
  }

  viewOML(OML) {
  }


  _setLight(params) {
    var lightVector = new THREE.Vector3(0, 0, 1)
    if(params.length == 3) {
      var eu = new THREE.Euler(-Math.PI*params[0]/180, -Math.PI*params[1]/180, Math.PI*params[2]/180, 'XYZ')
      lightVector.applyEuler(eu)
    }
    if(params.length==4) {
      var qt = new THREE.Quaternion(params[0], params[1], -params[2], Math.PI*params[3]/180)
      lightVector.applyQuaternion(qt)
    }
    this.light.position.set(lightVector.x, lightVector.y, lightVector.z)
    this.ambientLight.position.set(lightVector.x, lightVector.y, lightVector.z)
  }


  _animate() {
    this.renderer.render(this.scene, this.camera)
  }
}

window.OML = OML