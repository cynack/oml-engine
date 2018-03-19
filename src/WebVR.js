export default class WebVR {
  constructor (renderer) {
    this.renderer = renderer
    this.displays = {}
    this.displaysLength = 0
  }

  /**
   * @returns {Promise.<Object.<number, VRDevice>>}
   */
  init () {
    return new Promise((resolve, reject) => {
      if (!('getVRDisplays' in window.navigator)) {
        return reject(new Error('This browser is not support WebVR'))
      }
      /* window.addEventListener('vrdisplayconnect', (event)=>{
      }, false)
      window.addEventListener('vrdisplaydisconnect', (event)=>{
      }, false)
      window.addEventListener('vrdisplaypresentchange', (event)=>{
      }) */
      navigator.getVRDisplays().then((displays) => {
        displays.forEach((display) => {
          if (this.displaysLength === 0) {
            this.renderer.vr.setDevice(display)
          }
          this.displays[this.displaysLength] = display
          this.displaysLength++
        })
        resolve(this.displays)
      })
    })
  }

  /**
   * @returns {Promise.resolve.<null|Function>}
   */
  getRequestAnimationFrame () {
    return new Promise((resolve, reject) => {
      const display = this.renderer.vr.getDevice()
      if (display) {
        resolve((...args) => {
          display.requestAnimationFrame(...args)
        })
      } else {
        resolve(null)
      }
    })
  }

  setDevice (index) {
    this.renderer.vr.setDevice(this.displays[index])
  }

  /**
   * @returns {Promise.<any>}
   */
  enterVR () {
    let display = this.renderer.vr.getDevice()
    if (!display) throw new Error('Not found VR Device')
    return display.requestPresent([{source: this.renderer.domElement}])
  }
}
