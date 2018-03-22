import * as THREE from 'three'

export default class Quaternion {
  constructor (...args) {
    this.x = args[0] == null ? 0 : args[0]
    this.y = args[1] == null ? 0 : args[1]
    this.z = args[2] == null ? 0 : args[2]
    this.w = args[3] == null ? 0 : args[3]
  }
  static _fromEuler (x, y, z) {
    const qt = new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y, z))
    return new Quaternion(qt.x, qt.y, qt.z, qt.w)
  }
}
