import React from 'react'

import SearchClinicAnimate from '../../assets/Medihair_Funnel_Check.svg';

function SearchClinics() {
  return (
    <>
      <img className='searching-animate' src={SearchClinicAnimate} alt="" />

      <span className='label-search'>
        Nuestro sistema selecciona ahora las ofertas adecuadas para usted entre más de 321 médicos y 13 técnicas diferentes.
      </span>
    </>
  )
}

export default SearchClinics