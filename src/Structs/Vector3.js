export default class Vector3 {
  constructor (...args) {
    this.x = args[0] == null ? 0 : args[0]
    this.y = args[1] == null ? 0 : args[1]
    this.z = args[2] == null ? 0 : args[2]
  }

  get length () {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  }

  get normalized () {
    return new Vector3(
      this.x / this.length,
      this.y / this.length,
      this.z / this.length
    )
  }

  static forward () {
    return new Vector3(0, 0, 1)
  }
  static back () {
    return new Vector3(0, 0, -1)
  }
  static right () {
    return new Vector3(1, 0, 0)
  }
  static left () {
    return new Vector3(-1, 0, 1)
  }
  static up () {
    return new Vector3(0, 1, 1)
  }
  static down () {
    return new Vector3(0, -1, 1)
  }
  static one () {
    return new Vector3(1, 1, 1)
  }
  static zero () {
    return new Vector3(0, 0, 0)
  }
}
