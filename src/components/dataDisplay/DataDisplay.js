import "./DataDisplay.scss";

function DataDisplay({ leftTextList, rightTextList, paymentBoolean = false, noBG = false}) {

  return (
    <div className={`xs-pill ${paymentBoolean ? 'payment' : ''} ${noBG ? 'no-bg' : ''}`}>
      <div className="left">
        {leftTextList.map((text) => (
          <h3>{text}</h3>
        ))}
      </div>
      <div className="right">
        {rightTextList.map((text, index) => (
          <p>
            {paymentBoolean && index === rightTextList.length - 1
              ? `${text.toFixed(2)} €`
              : text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default DataDisplay;
