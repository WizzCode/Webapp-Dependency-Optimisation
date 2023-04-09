import React, { useState } from 'react';
import {Button} from 'react-bootstrap';

function OptimiserInfo() {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button variant='secondary' style={{color: 'white', marginLeft: '90%',marginTop: '3%'}} onClick={handleButtonClick}>Info</Button>
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '5px',
              maxWidth: '80%',
              maxHeight: '80%',
              overflow: 'auto',
              
            }}
          >
            <h3>Modal Title</h3>
            <p>This is the modal content.</p>
            <Button style={{marginLeft:'70%'}} variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OptimiserInfo;