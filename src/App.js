import React, { useState } from 'react';
import './index.css';
import Modal from './Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="app">
      <h1>User Details Modal</h1>
      <button onClick={openModal} className="open-form-button">
        Open Form
      </button>
      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  );
}

export default App;
