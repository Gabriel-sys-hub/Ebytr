/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

function HandleChangeColor(props) {
  const [changeColor, setChangeColor] = useState('');
  const { status, changeNameStatus } = props;

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
        setChangeColor('orange');
    }
  };

  useEffect(() => {
    handleChangedColor(status);
  }, [status]);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      style={{ backgroundColor: changeColor }}
      className="statusColor"
      role="complementary"
      onClick={() => {
        changeNameStatus();
        handleChangedColor(status);
      }}
    />
  );
}

export default HandleChangeColor;

HandleChangeColor.propTypes = {
  changeNameStatus: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};
