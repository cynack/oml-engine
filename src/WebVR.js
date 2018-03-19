export default class WebVR {
  constructor (renderer, callback) {
    this.renderer = renderer
    this.displays = {}
    this.displays_index = 0
    this.onVRConnectedCallback = []
    if (!('getVRDisplays' in window.navigator)) {
      return callback(null, false)
    }
    /* window.addEventListener('vrdisplayconnect', (event)=>{
    }, false)
    window.addEventListener('vrdisplaydisconnect', (event)=>{
    }, false)
    window.addEventListener('vrdisplaypresentchange', (event)=>{
    }) */
    navigator.getVRDisplays().then((displays) => {
      displays.forEach((display) => {
        if (this.displays_index === 0) {
          this.renderer.vr.setDevice(display)
        }
        this.displays[this.displays_index] = display
        this.onVRConnectedCallback.forEach((callback) => {
          callback(display, this.displays_index)
        })
        this.displays_index++
      })
      callback(null, true)
    })
  }

  onVRConnected (callback) {
    this.onVRConnectedCallback.push(callback)
  }

  requestAnimationFrame (callback) {
    let display = this.renderer.vr.getDevice()
    if (display) {
      display.requestAnimationFrame(callback)
      return true
    } else {
      return false
    }
  }

  setDevice (index) {
    this.renderer.vr.setDevice(this.displays[index])
  }

  enterVR () {
    let display = this.renderer.vr.getDevice()
    if (!display) throw new Error('Not found VR Device')
    display.requestPresent([{source: this.renderer.domElement}])
  }
}
