import createElement from './Elements/createElement'

export default class OMLParser {
  /**
   * @constructor
   * @param {THREE.Scene} scene
   */
  constructor(scene) {
    this.scene = scene
  }
  /**
   * setOML
   * @param {OMLData} OML
   */
  setOML(OML) {
    if(this.element) {
      this.element.destroy()
    }
    switch(typeof(OML)) {
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
    this.scene.add(this.element.obj3d)
  }
}