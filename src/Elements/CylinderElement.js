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
   * @param {String} version
   * @param {Object} define
   */
  constructor (OML, version, define) {
    super(OML, version, define, 2)
    const obj = new THREE.Mesh(
      new THREE.CylinderGeometry(this.size[0] / 2, this.size[0] / 2, this.size[1], 50),
      new THREE.MeshPhongMaterial({color: this.color})
    )
    super._setObj(obj)
  }
}
