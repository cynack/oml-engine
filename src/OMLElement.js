import * as THREE from 'three'

export default class OMLElement {
  constructor(OML, scene, property = {}) {
    this.objs = []
    if(!(OML instanceof Object)) {
      throw new TypeError()
    }
  }
  destroy() {
    this.objs.forEach((obj)=>{
      obj.destroy()
    })
  }
}
