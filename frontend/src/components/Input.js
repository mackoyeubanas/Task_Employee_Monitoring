import React from 'react'

function Input({ type, value, id, name, placeholder, onChange, onClick, defaultValue }) {

    const generateInput = () => {
        if (type === 'submit') return <input className="btn btn-success" type={type} value={value} onClick={onClick} />
        else return <input className="form-control" id={id} name={name} type={type} placeholder={placeholder} defaultValue={defaultValue || ''} onChange={onChange} />
    }

    return (
        <>
            {generateInput()}
        </>
    )
}

export default Input
