import React, { useEffect, useState } from "react";
import Ripples from 'react-ripples'

function RippleEffect({extraClassName ="", children, type = "dark", during = "900" }) {
  const [color, setColor] = useState('rgba(255, 255, 255, .2)');
  useEffect(() => {
    if(type === 'light'){
      setColor('rgba(0, 0, 0, .2)')
    }else if (type === 'dark'){
      setColor('rgba(255, 255, 255, .2)')
    }
  })
  return (
    <>
      <Ripples onClick={document.body.click()} className={extraClassName} color={color} during={during}>{children}</Ripples>
    </>
  );
}

export default RippleEffect;
