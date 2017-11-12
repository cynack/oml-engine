import * as THREE from 'three'

export default class OMLElement {
  constructor(OML, scene, property = {}) {
    if(!(OML instanceof Object)) {
      throw new TypeError()
    }
  }
}
