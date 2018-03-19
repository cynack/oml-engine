import * as THREE from 'three'
import {normalizeRot, normalizeScale, normalizePos, normalizeSize, normalizeColor} from '../normalize'

/**
 * @class OMLElement
 * @property {OMLDataObject} OML
 * @property {Object} property
 * @property {THREE.Object3D} obj3d
 */
export default class OMLElement {
  /**
   * @constructor
   * @param {OMLDataObject} OML
   * @param {Object} property
   * @param {number} sizeLength
   */
  constructor (OML, property, sizeLength) {
    this.OML = OML
    this.property = property
    this.obj3d = null
    if (!(OML instanceof Object)) {
      throw new TypeError()
    }
    if (OML.define) {
      for (let name in OML.define) {
        this.property.define[name] = OML.define[name]
      }
    }
    if (OML.version) {
      this.property.version = OML.version
    }
    OML._rot = normalizeRot(OML.rot)
    OML._scale = normalizeScale(OML.scale)
    OML._pos = normalizePos(OML.pos)
    OML._size = normalizeSize(OML.size, sizeLength)
    OML._color = normalizeColor(OML.color)
  }
  _addObj (obj) {
    obj.castShadow = true
    obj.receiveShadow = true
    if (this.OML._rot.length === 4) {
      const qt = new THREE.Quaternion()
      qt.setFromAxisAngle(new THREE.Vector3(this.OML._rot[0], this.OML._rot[1], -this.OML._rot[2]), this.OML._rot[3])
      obj.rotation.setFromQuaternion(qt)
    } else {
      obj.rotation.set(-this.OML._rot[0], -this.OML._rot[1], this.OML._rot[2])
    }
    obj.scale.set(this.OML._scale[0], this.OML._scale[1], this.OML._scale[2])
    obj.position.set(this.OML._pos[0], this.OML._pos[1], -this.OML._pos[2])
    this.obj3d = obj
  }
  destroy () {
  }
}
