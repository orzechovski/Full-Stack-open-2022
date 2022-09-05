import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification

  const style = notification
    ? {
        border: '1px solid green',
        padding: '1em',
        margin: '1rem',
        color: 'green',
        backgroundColor: 'lightgreen',
        height: '8rem',
      }
    : {
        border: '1px solid transparent',
        margin: '1rem',
        color: 'green',
        backgroundColor: '#333',
        height: '8rem',
      }
  return <div style={style}>{notification}</div>
}
const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)
