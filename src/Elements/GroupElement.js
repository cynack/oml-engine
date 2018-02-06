import OMLElement from './OMLElement'
import createElement from './createElement'
import * as THREE from 'three'

/**
 * @class GroupElement
 * @extends OMLElement
 */
export default class GroupElement extends OMLElement {
  /**
   * @constructor
   * @param {OMLDataObject} OML
   * @param {Object} property
   */
  constructor(OML, property) {
    super(OML, property)
    const group = new THREE.Group()
    this.objs = []
    super._addObj(group)

    for(let childOML of OML.group) {
      const element = createElement(childOML, {
        define: this.property.define,
        version: this.property.version
      })
      this.objs.push(element)
      group.add(element.obj3d)
    }
  }
  destroy() {
    super.destroy()
    this.objs.forEach((obj)=>obj.destroy())
  }
}