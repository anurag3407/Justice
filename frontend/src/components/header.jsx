import React from 'react'


const header = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: '#f0f0f0', height: '80px' }}>
      <div style={{ flexGrow: 1, fontSize: '24px', fontWeight: 'bold' }}>
        Justice <span style={{ fontSize: '16px', fontWeight: 'normal' }}>TRACK</span>
      </div>
      <button style={{ backgroundColor: '#f4d03f', padding: '10px 20px', margin: '0 5px', border: 'none', borderRadius: '5px' }}>HOME</button>
      <button style={{ backgroundColor: '#82e0aa', padding: '10px 20px', margin: '0 5px', border: 'none', borderRadius: '5px' }}>GLOSSARY</button>
      <button style={{ backgroundColor: '#5dade2', padding: '10px 20px', margin: '0 5px', border: 'none', borderRadius: '5px' }}>ACCOUNT</button>
    </div>
  );
};


export default header