const Notifiaction = ({ info }) => {
  const { type, content } = info;
  const styleError = { border: '1px solid red', color: 'red', margin: '0.5em', padding: '0.5em' };
  const styleMessage = { border: '1px solid lightgreen', color: 'lightgreen', margin: '0.5em', padding: '0.5em' };
  return (
    <div className="notification">
      {type === '' ? null : type === 'error' ? <div style={styleError}>Error {content}</div> : <div style={styleMessage}>{content}</div>}
    </div>
  );
};

export default Notifiaction;
