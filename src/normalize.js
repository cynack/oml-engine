export function normalizeRot(rot) {
  if(Array.isArray(rot)) {
    if(rot.length < 4) {
      return [
        normalizeRotNumber(rot[0]),
        normalizeRotNumber(rot[1]),
        normalizeRotNumber(rot[2])
      ]
    }else {
      return [
        normalizeRotNumber(rot[0]),
        normalizeRotNumber(rot[1]),
        normalizeRotNumber(rot[2]),
        normalizeRotNumber(rot[3])
      ]
    }
  }else {
    return normalizeRot([0, 0, 0])
  }
}

function normalizeRotNumber(rot) {
  if(typeof(rot) == 'number') {
    return (rot/180*Math.PI)
  }else if(typeof(rot) == 'string') {
    const _rot = parseInt(/^([0-9]+)deg?$/.exec(rot)[1], 10)
    return _rot/180*Math.PI
  }else {
    return 0
  }
}

export function normalizeScale(scale) {
  if(Array.isArray(scale)) {
    return [
      normalizeScaleNumber(scale[0]),
      normalizeScaleNumber(scale[1]),
      normalizeScaleNumber(scale[2])
    ]
  }else {
    return normalizeScale([1, 1, 1])
  }
}

function normalizeScaleNumber(scale) {
  if(typeof(scale) == 'number') {
    return scale
  }else if(typeof(scale) == 'string') {
    return parseInt(/^([0-9]+)m?$/.exec(scale)[1], 10)
  }else {
    return 1
  }
}

export function normalizePos(pos) {
  if(Array.isArray(pos)) {
    return [
      normalizePosNumber(pos[0]),
      normalizePosNumber(pos[1]),
      normalizePosNumber(pos[2])
    ]
  }else {
    return normalizePos([0, 0, 0])
  }
}

function normalizePosNumber(pos) {
  if(typeof(pos) == 'number') {
    return pos
  }else if(typeof(rot) == 'string') {
    return parseInt(/^([0-9]+)m?$/.exec(pos)[1], 10)
  }else {
    return 0
  }
}

export function normalizeSize(size, length) {
  if(Array.isArray(size)) {
    const result = []
    for(let i=0;i<length;i++) {
      result.push(normalizeSizeNumber(size[i]))
    }
    return result
  }else {
    return normalizeSize(
      [...Array(length)].map(()=>1)
    )
  }
}

function normalizeSizeNumber(size) {
  if(typeof(size) == 'number') {
    return size
  }else if(typeof(size) == 'string') {
    return parseInt(/^([0-9]+)m?$/.exec(size)[1], 10)
  }else {
    return 1
  }
}

export function normalizeColor(color) {
  return color
}