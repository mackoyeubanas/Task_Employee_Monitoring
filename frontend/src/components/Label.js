import React from 'react'

function Label({ htmlFor, innerText, style }) {
    return (
        <>
            <label style={{ color: style ? '' : 'tomato' }} htmlFor={htmlFor}>{innerText}</label>
        </>
    )
}

export default Label
