import React, { CSSProperties } from 'react';
import type { TimeWidgetProps } from './types';

interface TimeWidgetState {
  time: Date;
};

class TimeWidget extends React.Component<TimeWidgetProps, TimeWidgetState> {
  interval: NodeJS.Timer | null;

  constructor(props: TimeWidgetProps) {
    super(props)
    this.state = {
      time: new Date(),
    };
  }

  render() {
    const { size, zIndex } = this.props

    const style: CSSProperties = {
      display: this.props.hidden ? 'none' : 'flex',
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
      fontWeight: 'bold',
      zIndex: zIndex,
    }

    return (
      <div style={style}>
        {this.formattedTime(this.state.time)}
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

  tick() {
    this.setState({ time: new Date() })
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 500)
  }

  componentWillUnmpount() {
    clearInterval(this.interval)
  }
}

export { TimeWidget }
