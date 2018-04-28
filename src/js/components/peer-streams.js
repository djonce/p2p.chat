import React from 'react'
import classNames from 'classnames'
import {User} from 'react-feather';
import AwaitingPeers from './awaiting-peers'
import PeerStream from './peer-stream'

export default class PeerStreams extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      height: 0,
    }
  }

  componentDidMount() {
    this.recalculateGrid()
  }

  componentDidUpdate() {
    this.recalculateGrid()
  }

  recalculateGrid() {

    const {width, height} = this.state

    const newWidth = this.peerStreams.clientWidth
    const newHeight = this.peerStreams.clientHeight

    if (newWidth !== width || newHeight !== height) {
      this.setState({width: newWidth, height: newHeight})
    }

  }

  render() {

    const {peerStreams, shrunk} = this.props
    const {width, height} = this.state

    let rows, columns

    const total = Object.keys(peerStreams).length

    const x = Math.floor(Math.sqrt(total))
    const y = Math.ceil(total / x)

    // Switch rows/columns for tall screens (probably mobile)
    if (window.innerWidth < window.innerHeight) {
      columns = x
      rows = y
    } else {
      rows = x
      columns = y
    }

    const peerStreamsClassNames = classNames({shrunk})
    const peerStreamsStyle = {
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      gridTemplateColumns: `repeat(${columns}, 1fr)`
    }

    const cellWidth = width / columns
    const cellHeight = height / rows

    return (
      <div
        id="peer-streams"
        ref={(peerStreams) => {this.peerStreams = peerStreams}}
        style={peerStreamsStyle}
        className={peerStreamsClassNames}
      >
        {total === 0 ? <AwaitingPeers /> : null}
        {
          Object.keys(peerStreams).map((id) => {
            return (
              <PeerStream
                key={id}
                peerStream={peerStreams[id]}
                cellWidth={cellWidth}
                cellHeight={cellHeight}
              />
            )
          })
        }
      </div>
    )

  }

}
