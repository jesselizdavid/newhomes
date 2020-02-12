import React from 'react';

const checkbox = {
    display: "inline-block"
}

const Checkbox = ({ type = 'checkbox', name, checked, onChange, label }) => (
    <div>
        <input type={type} name={name} checked={checked} onChange={onChange} />
        <label>{label}</label>
    </div>
);

export default Checkbox;
  