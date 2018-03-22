import OMLElement from './OMLElement'
import * as THREE from 'three'

/**
 * @class PlaneElement
 * @extends OMLElement
 */
export default class PlaneElement extends OMLElement {
  /**
   * @constructor
   * @param {OMLDataObject} OML
   * @param {String} version
   * @param {Object} define
   */
  constructor (OML, version, define) {
    super(OML, version, define, 2)
    const obj = new THREE.Group()
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(this.size[0], this.size[1]),
      new THREE.MeshPhongMaterial({color: this.color})
    )
    plane.rotation.set(-Math.PI / 2, 0, 0)
    plane.castShadow = true
    plane.receiveShadow = true
    obj.add(plane)
    super._setObj(obj)
  }
}
