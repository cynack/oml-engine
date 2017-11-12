import OMLElement from './OMLElement'

export default class OMLParser {
  constructor(scene) {
    this.scene = scene
  }
  viewOML(OML) {
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
    new OMLElement(OML, this.scene)
  }
}