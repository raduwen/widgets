class TimeWidget {
  constructor() {
    this.el = document.createElement('div')
    this.el.id = 'time'
    const style = this.el.style
    style.position = 'absolute'
    style.bottom = 0
    style.right = 0
    const h = 30
    style.width = style.height = `${h * 9.5}px`
    style.display = 'flex'
    style.justifyContent = 'center'
    style.alignItems = 'center'
    style.textAlign = 'center'
    style.borderRadius = '50%'
    style.color = 'white'
    style.background = 'rgba(0, 128, 128, 0.75)'
    style.transform = `translate(${h*1.25}px, ${h*2.4}px) rotate(-20deg)`
    style.fontSize = `${h}px`
    style.fontWeight = 'bold'
  }

  zero_fill(str) {
    return `0${str}`.slice(-2)
  }

  day2str(n) {
    return [
      '日',
      '月',
      '火',
      '水',
      '木',
      '金',
      '土'
    ][n]
  }

  update() {
    const now = new Date()
    const tmp = `
      ${now.getFullYear()}/${this.zero_fill(now.getMonth() + 1)}/${this.zero_fill(now.getDate())}(${this.day2str(now.getDay())})<br>
      ${this.zero_fill(now.getHours())}:${this.zero_fill(now.getMinutes())}:${this.zero_fill(now.getSeconds())}
    `
    this.el.innerHTML = tmp
  }
}

export default TimeWidget
