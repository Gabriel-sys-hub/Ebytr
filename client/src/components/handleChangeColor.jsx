import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

function HandleChangeColor(props) {
  const [changeColor, setChangeColor] = useState('');

  useEffect(() => {
    handleChangedColor(props.status);
  }, [props.status])

  const handleChangedColor = (divColorStatus) => {
    switch (divColorStatus) {
      case 'Pending':
        setChangeColor('orange');
        break;
      case 'Done':
        setChangeColor('red');
        break;
      case 'InProgress':
        setChangeColor('green');
        break;
      default:
        setChangeColor('orange')
    }
  }

  return (
    <div style={{ backgroundColor: changeColor }} className="statusColor" onClick={() => {
        props.changeNameStatus();
        handleChangedColor(props.status);
      }}>
    </div>
  );
}

export default HandleChangeColor;