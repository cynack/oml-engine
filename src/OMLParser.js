import OMLElement from './OMLElement'

export default class OMLParser {
  constructor(scene) {
    this.scene = scene
  }
  setOML(OML) {
    if(this.elements) {
      this.elements.destroy()
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
    this.elements = new OMLElement(OML, this.scene)
  }
}