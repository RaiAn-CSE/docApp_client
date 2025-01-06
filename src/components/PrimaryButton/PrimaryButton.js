import React from 'react';

const PrimaryButton = ({ children }) => {
    return (
        <button className="btn w-fit border-none bg-gradient-to-r from-primary to-secondary text-white">
            {children}
        </button>
    );
};

export default PrimaryButton;