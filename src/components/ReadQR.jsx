import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

const ReadQR = () => {
  const [data, setData] = useState('');

  console.log(data)

  return (
    <>
      <Scanner onScan={(result) => setData(result[0].rawValue)} />
      <h1>{data}</h1>
    </>
  );
}

export default ReadQR;
