import React from 'react';
import './WelcomeBox.less';

const WelcomeBox = ({ name }: { name: string }) => (
  <h2 className="welcome-box">
    Xin chào, {name}
  </h2>
);
export default WelcomeBox;
