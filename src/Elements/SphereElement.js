import OMLElement from './OMLElement'
import * as THREE from 'three'

export default class SphereElement extends OMLElement {
  constructor(OML, property) {
    super(OML, property, 3)
    const obj = new THREE.Mesh(
      new THREE.SphereGeometry(OML._size[0], OML._size[1], OML._size[2]),
      new THREE.MeshPhongMaterial({color: OML._color})
    )
    super._addObj(obj)
  }
}