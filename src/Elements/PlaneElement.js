import OMLElement from './OMLElement'
import * as THREE from 'three'

export default class SphereElement extends OMLElement {
  constructor(OML, property) {
    super(OML, property, 2)
    const obj = new THREE.Group()
    const cube = new THREE.Mesh(
      new THREE.PlaneGeometry(OML._size[0], OML._size[1]),
      new THREE.MeshPhongMaterial({color: OML._color})
    )
    cube.rotation.set(-Math.PI/2, 0, 0)
    obj.add(cube)
    super._addObj(obj)
  }
}