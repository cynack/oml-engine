import OMLElement from './OMLElement'
import * as THREE from 'three'

/**
 * @class SphereElement
 * @extends OMLElement
 */
export default class SphereElement extends OMLElement {
  /**
   * @constructor
   * @param {OMLDataObject} OML
   * @param {String} version
   * @param {Object} define
   */
  constructor (OML, version, define) {
    super(OML, version, define, 3)
    const obj = new THREE.Mesh(
      new THREE.SphereGeometry(this.size[0], this.size[1], this.size[2]),
      new THREE.MeshPhongMaterial({color: this.color})
    )
    super._setObj(obj)
  }
}
