import { useEffect, useState, useRef } from "react"

import './OptionsSelect.style.scss'

function OptionsSelect({questions, handleSelectedOption, response, index, goBack, changeRender}) {
  const OptionsRef = useRef(null)

  useEffect(() => {

    if(OptionsRef.current) {

      if ( (!goBack ) ) {
        OptionsRef.current.classList.remove('transition')
        OptionsRef.current.classList.add('transition-0')
        OptionsRef.current.classList.add('initial-x')
        setTimeout(() => {
          OptionsRef.current.classList.remove('transition-0')
          OptionsRef.current.classList.add('animate-initial')
          OptionsRef.current.classList.add('transition')
        }, 50)
      }
    }
  },[ OptionsRef, questions ])

  useEffect(() => {
    if( OptionsRef.current ) {

      if ( goBack && !changeRender ) {
        OptionsRef.current.classList.remove('back-x')
        OptionsRef.current.classList.add('initial-x')
        OptionsRef.current.classList.add('transition')
        OptionsRef.current.classList.remove('animate-initial')
      }

      if( goBack && changeRender) {
        OptionsRef.current.classList.remove('transition')
        OptionsRef.current.classList.remove('initial-x')
        OptionsRef.current.classList.add('transition-0')
        OptionsRef.current.classList.add('back-x') 
        setTimeout(() => {
          OptionsRef.current.classList.remove('transition-0')
          OptionsRef.current.classList.add('animate-initial')
          OptionsRef.current.classList.add('transition')
        }, 50)

      }
    }
  }, [ goBack, changeRender ])

  const  resetOptionsAnimate = () => {
    OptionsRef.current.classList.remove('animate-initial')
    OptionsRef.current.classList.remove('animate-go-back')
    OptionsRef.current.classList.remove('animate-exit')
    OptionsRef.current.classList.remove('initial-x')
    OptionsRef.current.classList.remove('back-x')
    OptionsRef.current.classList.remove('transition')

  }

  const getImageUrl = (name) => {
    return new URL(`../../assets/${name}`, import.meta.url).href
  }

  const handleClick = (id) => {

    OptionsRef.current.classList.add('animate-exit')
    OptionsRef.current.classList.remove('animate-initial')

    setTimeout( () => {
      resetOptionsAnimate()
      OptionsRef.current.classList.add('initial-x')
      handleSelectedOption(id)
    }, 500 )
  }

  if(questions === undefined) {
    return (<div>loading...</div>)
  }

  return (
    <div className={`content-options-select`}
      ref={OptionsRef}
    >
      {
        questions.options.map((option) => (
          <div 
            className={`option ${index === 0 ? 'square' : 'inline'} ${!response ? '': response === option.id ? 'select' : ''}
            `} 
              key={option.id} 
            onClick={() => handleClick(option.id)}
          >
            {
              option.src_img && (
                <img src={ getImageUrl(option.src_img) } alt="" />
              )
            }
            {
              option.label && (
                <span className='option-label' >{option.label}</span>
              )
            }
          </div>
        ))
      }
    </div>
  )
}

export default OptionsSelect