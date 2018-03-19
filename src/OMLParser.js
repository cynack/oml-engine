import createElement from './Elements/createElement'
import * as THREE from 'three'

export default class OMLParser {
  /**
   * @constructor
   * @param {THREE.Scene} scene
   */
  constructor (scene) {
    this.scene = scene
    this.obj3d = new THREE.Group()
    this.obj3d.position.set(0, -1.7, 0)
    this.scene.add(this.obj3d)
  }
  /**
   * setOML
   * @param {OMLData} OML
   */
  setOML (OML) {
    if (this.element) {
      this.element.destroy()
    }
    switch (typeof (OML)) {
      case 'string': {
        OML = JSON.parse(OML)
        break
      }
      case 'object': {
        break
      }
      default: {
        throw new TypeError()
      }
    }
    this.element = createElement(OML)
    this.obj3d.add(this.element.obj3d)
  }
}
