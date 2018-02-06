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
   * @param {Object} property
   */
  constructor(OML, property) {
    super(OML, property, 2)
    const obj = new THREE.Group()
    const cube = new THREE.Mesh(
      new THREE.PlaneGeometry(OML._size[0], OML._size[1]),
      new THREE.MeshPhongMaterial({color: OML._color})
    )
    cube.rotation.set(-Math.PI/2, 0, 0)
    cube.castShadow = true
    cube.receiveShadow = true
    obj.add(cube)
    super._addObj(obj)
  }
}