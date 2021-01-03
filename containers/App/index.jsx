import React from 'react'

import TimeWidget from '../../components/TimeWidget'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      now: new Date()
    }
  }

  render() {
    return (
      <div>
        <TimeWidget time={this.state.now} size={30} />
      </div>
    )
  }

  tick() {
    this.setState({ now: new Date() })
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 500)
  }

  componentWillUnmpount() {
    clearInterval(this.interval)
  }
}

export default App
