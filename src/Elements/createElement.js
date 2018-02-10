import GroupElement from './GroupElement'
import CubeElement from './CubeElement'
import CylinderElement from './CylinderElement'
import SphereElement from './SphereElement'
import PlaneElement from './PlaneElement'

/**
 * createElement
 * @param {OMLDataObject} OML
 * @param {Object} property
 * @returns {OMLElement}
 */
export default function createElement(OML, property={define: {}}) {
  if(OML.group) {
    return new GroupElement(OML, property, createElement)
  }else if(OML.component) {
    if(Object.keys(property.define).indexOf(OML.component)==-1) {
      switch(OML.component) {
        case '@cube': {
          return new CubeElement(OML, property)
        }
        case '@cylinder': {
          return new CylinderElement(OML, property)
        }
        case '@sphere': {
          return new SphereElement(OML, property)
        }
        case '@plane': {
          return new PlaneElement(OML, property)
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
      }
    }else {
      const _OML = Object.assign({}, property.define[OML.component])
      for(let key in OML) {
        if(key!=OML.component) {
          _OML[key] = OML[key]
        }
      }
      return createElement(
        _OML,
        property
      )
    }
  }
}