import OMLElement from './OMLElement'
import * as THREE from 'three'

/**
 * @class GroupElement
 * @extends OMLElement
 */
export default class GroupElement extends OMLElement {
  /**
   * @constructor
   * @param {OMLDataObject} OML
   * @param {String} version
   * @param {Object} define
   */
  constructor (OML, version, define, createElement) {
    super(OML, version, define)
    const group = new THREE.Group()
    super._setObj(group)

    for (let childOML of OML.group) {
      const element = createElement(childOML, this._version, this._define)
      if (element) {
        group.add(element.obj3d)
      }
    }
  }
}
