import React from 'react'

class TimeWidget extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { size, time } = this.props

    const style = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: `${size*9.5}px`,
      height: `${size*9.5}px`,
      borderRadius: '50%',
      color: 'white',
      background: 'rgba(0, 128, 128, 0.75)',
      transform: `translate(${size*1.25}px, ${size*2.4}px) rotate(-20deg)`,
      fontSize: `${size}px`,
      fontWeight: 'bold'
    }

    return (
      <div style={style}>
        {this.formattedTime(time)}
      </div>
    )
  }

  formattedTime(time) {
    return `
      ${time.getFullYear()}/${this.zero_fill(time.getMonth() + 1)}/${this.zero_fill(time.getDate())}(${this.day2str(time.getDay())})\n
      ${this.zero_fill(time.getHours())}:${this.zero_fill(time.getMinutes())}:${this.zero_fill(time.getSeconds())}
    `
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
}

export default TimeWidget
