import React from 'react'

function InputText({ name, value, handleChange, validate, placeholder }) {
  return (
    <>
      <input 
      className='input-text' 
      type="text" 
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={handleChange}
      />
      {
        validate[name].error && (
          <span className='error-message'>{validate[name].message} </span>
        )
      }
    </>
  )
}

export default InputText