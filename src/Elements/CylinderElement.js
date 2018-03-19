import OMLElement from './OMLElement'
import * as THREE from 'three'

/**
 * @class CylinderElement
 * @extends OMLElement
 */
export default class CylinderElement extends OMLElement {
  /**
   * @constructor
   * @param {OMLDataObject} OML
   * @param {Object} property
   */
  constructor (OML, property) {
    super(OML, property, 2)
    const obj = new THREE.Mesh(
      new THREE.CylinderGeometry(this.OML._size[0] / 2, this.OML._size[0] / 2, this.OML._size[1], 50),
      new THREE.MeshPhongMaterial({color: this.OML._color})
    )
    super._addObj(obj)
  }
}
