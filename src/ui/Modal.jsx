import React from 'react';

const Modal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-white p-4 rounded-lg max-w-xl w-full" onClick={(e) => e.stopPropagation()}>
                {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
                {children}
            </div>
        </div>
    );
};

export default Modal;
