import GroupElement from './GroupElement'
import CubeElement from './CubeElement'
import CylinderElement from './CylinderElement'
import SphereElement from './SphereElement'
import PlaneElement from './PlaneElement'

/**
 * createElement
 * @param {OMLDataObject} OML
 * @param {String} version
 * @param {Object} define
 * @returns {OMLElement}
 */
export default function createElement (OML, version, define = {}) {
  if (OML.group) {
    return new GroupElement(OML, version, define, createElement)
  } else if (OML.component) {
    if (Object.keys(define).indexOf(OML.component) === -1) {
      switch (OML.component) {
        case '@cube': {
          return new CubeElement(OML, version, define)
        }
        case '@cylinder': {
          return new CylinderElement(OML, version, define)
        }
        case '@sphere': {
          return new SphereElement(OML, version, define)
        }
        case '@plane': {
          return new PlaneElement(OML, version, define)
        }
        case '@model': {
          console.error(new Error('not implemented'))
          return
        }
        case '@text': {
          console.error(new Error('not implemented'))
          return
        }
        case '@light': {
          console.error(new Error('not implemented'))
          return
        }
        default: {
          console.error(new Error(`not found ${OML.component}`))
        }
      }
    } else {
      const _OML = Object.assign({}, define[OML.component])
      for (let key in OML) {
        if (key !== OML.component) {
          _OML[key] = OML[key]
        }
      }
      return createElement(_OML, version, define)
    }
  }
}
