// Modal.js

import React from "react";

import '../assets/css/main.css'


const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div
            className=""
            onClick={onClose}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 999,
                // opacity: 0.9,
                background: '#000',
                overflow:'scroll'
            }}
        >
            <div
                style={{
                    borderRadius:'8px',
                    background: 'var(--Gray-Scale-White, #FFF)',
                    width: '75%',
                    margin: "auto",
                    padding: "2%",
                    border: "2px solid #000",
                    borderRadius: "10px",
                 
                }}
            >
            {children}
        </div>
        </div >
    );
};

export default Modal;
