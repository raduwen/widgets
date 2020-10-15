class StampCastWidget {
  constructor() {
    this.el = document.createElement('iframe')
    this.el.id = 'stampcast'
    this.el.src = 'https://stamp.archsted.com/291/broadcaster'
    this.el.style.position = 'aboslute'
    this.el.style.top = 0
    this.el.style.left = 0
    this.el.style.width = '100%'
    this.el.style.height = '100vh'
  }
}

export default StampCastWidget
