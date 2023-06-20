import { useState } from 'react'
import emailjs from '@emailjs/browser'
import InputText from '../InputText/InputText'
import SpinnerLoader from '../SpinnerLoader/SpinnerLoader'
import { useNavigate } from 'react-router-dom'
import { doc, collection, setDoc } from 'firebase/firestore';
// firebase
import { firestore } from '../../db/firebase';

import './ContactForm.style.scss'

function ContactForm({answer}) {

  const [ stateForm, setStateForm ] = useState({
    gender: 'Mr',
    name: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    acceptTerms: false
  })
  const [ validateError, setValidateError ] = useState({
    name: {
      error: false,
      message: ''
    },
    lastName: {
      error: false,
      message: ''
    },
    email: {
      error: false,
      message: ''
    },
    phone: {
      error: false,
      message: ''
    },
    address: {
      error: false,
      message: ''
    },
    terms: {
      error: false,
      message: ''
    }
  })
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const validarCampos = () => {
    let errors = Object.assign({}, validateError)
    let error = false

    let messageRequired = 'Este campo es requerido';
    let messageEmail = 'Coloca un correo electrónico valido';
    let messagePhone = 'Coloca un número telefónico valido';
    let messageTerms = 'Debes aceptar los terminos y condiciones';
    
    if( stateForm.name.length === 0 ) {
      errors.name.error = true
      errors.name.message = messageRequired
      error = true
    } else {
      errors.name.error = false
      errors.name.message = ''
      error = false
    }
    if ( stateForm.lastName.length === 0 ) {
      errors.lastName.error = true
      errors.lastName.message = messageRequired
      error = true
    } else {
      errors.lastName.error = false
      errors.lastName.message = ''
      error = false
    }
    if ( stateForm.email.length === 0 ) {
      errors.email.error = true
      errors.email.message = messageRequired
      error = true
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stateForm.email)) {
      errors.email.error = true
      errors.email.message = messageEmail
      error = true
    } else {
      errors.email.error = false
      errors.email.message = ''
      error = false
    }
    if ( stateForm.phone.length === 0 ) {
      errors.phone.error = true
      errors.phone.message = messageRequired
      error = true
    } else if ( !/^[+]{0,1}\d+\.?\d*$/.test(stateForm.phone) ) {
      errors.phone.error = true
      errors.phone.message = messagePhone
      error = true
    } else {
      errors.phone.error = false
      errors.phone.message = ''
      false
    }
    if ( stateForm.address.length === 0 ) {
      errors.address.error = true
      errors.address.message = messageRequired
      error = true
    } else {
      errors.address.error = false
      errors.address.message = ''
      error = false
    }
    if( !stateForm.acceptTerms ) {
      errors.terms.error = true
      errors.terms.message = messageTerms
      error = true
    } else {
      errors.terms.error = false
      errors.terms.message = ''
      error = false
    }

    setValidateError(errors)
    return error
  }

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setStateForm(prev => ({
      ...prev,
      [name]: value
    }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existErrors = validarCampos(); 

    if (existErrors) return;
    setIsLoading(true)

    const dataEmail = {
      ...stateForm,
      reply_email: import.meta.env.VITE_EMAIL_USER ,
      answers: {
        ...answer
      }
    }

    try {
      // obtener las respuestas guardadas en local storage
      // const parseAnswerUser = await JSON.parse(localStorage.getItem('answer_user'));

      // parsear data que se va a guardar
      const formData = {
          ...stateForm,
          reply_email: 'daikon.code@gmail.com',
          answers: {
              ...answer
          },
          images: []
      };
      // crear referencia a la coleccion donde se debe de guardar
      const newUser = doc(collection(firestore, 'users'));
      // localStorage.setItem('key_user', stateForm.email);
      // setear data
      await setDoc(newUser, formData);
  
      // send email
      emailjs.send('recoveryourhair_147490', 'template_zvcer2f', dataEmail , 'r8a2yZnD5hgKfn1da')
        .then(response => {
          setIsLoading(false);
          navigate('/gracias', {replace: true})
        })
        .catch(error => console.log(error))
      
    } catch (error) {
      setIsLoading(false);
    }
    
  }

  return (
    <>
      <div className='content-contact-form'>
        <h3 className='title-form'>¿Quién debe recibir las ofertas?</h3>
        <form onSubmit={handleSubmit}>
          <div className='select-gender'>
            <label htmlFor="gender-mr">
              <input 
                type="radio" 
                name="gender" 
                id="gender-mr" 
                checked={stateForm.gender === 'Mr' ? true : false}
                onChange={(e) => setStateForm( prev => ({...prev, gender: e.target.value}) )  }
                value='Mr' 
              />
              Mr.
              </label>
            <label htmlFor="gender-ms">
              <input 
                type="radio" 
                name="gender" 
                id="gender-ms" 
                checked={stateForm.gender === 'Ms' ? true : false}
                onChange={(e) => setStateForm( prev => ({...prev, gender: e.target.value}) )  }
                value='Ms' 
              />
              Ms.
            </label>
          </div>

          <div className='input-names' >
            <div className='content-input'>
              <InputText 
                name='name'
                value={stateForm.name}
                handleChange={handleChange}
                validate={validateError}
                placeholder='Nombres'
              />
            </div>
            <div className='content-input'>
              <InputText 
                name='lastName'
                value={stateForm.lastName}
                handleChange={handleChange}
                validate={validateError}
                placeholder='Apellidos'
              />
            </div>
          </div>
          <div className='content-input'>
            <InputText 
              name='email'
              value={stateForm.email}
              handleChange={handleChange}
              validate={validateError}
              placeholder='Correo electrónico'
            />
          </div>
          <div className='content-input'>
            <InputText 
              name='phone'
              value={stateForm.phone}
              handleChange={handleChange}
              validate={validateError}
              placeholder='Número telefónico'
            />
          </div>
          <div className='content-input'>
            <InputText 
              name='address'
              value={stateForm.address}
              handleChange={handleChange}
              validate={validateError}
              placeholder='En que provincia vives?'
            />
          </div>
          

          <div className='accept-terms'>
            <input type="checkbox" name="terms" id="terms" onChange={() => setStateForm(prev => ({...prev, acceptTerms: !prev.acceptTerms }))}/>
            <label htmlFor="terms">
              Acepto los términos y condiciones
            </label>
            {
              validateError.terms.error && (
                <span className='error-message'>{validateError.terms.message} </span>
              )
            }
          </div>

          <button className='button-submit' type='submit'>Recibir ofertas</button>

        </form>
      </div>
      {
        isLoading && (
          <SpinnerLoader />
        )
      }
    </>
  )
}

export default ContactForm