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
   * @param {String} version
   * @param {Object} define
   * @param {number} sizeLength
   */
  constructor (OML, version, define, sizeLength) {
    this._obj3d = null
    if (!(OML instanceof Object)) {
      throw new TypeError()
    }
    this._define = Object.assign({}, define)
    if (OML.define) {
      for (let name in OML.define) {
        this._define[name] = OML.define[name]
      }
    }
    if (OML.version) {
      this._version = OML.version
    }
    this.position = normalizePos(OML.pos)
    this._rotation = normalizeRot(OML.rot)
    this.scale = normalizeScale(OML.scale)
    this.size = normalizeSize(OML.size, sizeLength)
    this.color = normalizeColor(OML.color)
  }
  _setObj (obj) {
    obj.castShadow = true
    obj.receiveShadow = true
    const qt = new THREE.Quaternion(this._rotation.x, this._rotation.y, this._rotation.z, this._rotation.w)
    obj.rotation.setFromQuaternion(qt)
    obj.scale.set(this.scale.x, this.scale.y, this.scale.z)
    obj.position.set(this.position.x, this.position.y, -this.position.z)
    this.obj3d = obj
  }

  get rotation () {
    throw new Error('wip')
  }
}
