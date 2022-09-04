import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

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

export default Notification
