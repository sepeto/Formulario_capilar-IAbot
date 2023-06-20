// hooks
import { useState, useEffect } from 'react';
// data
import data from '../../db/data.json';
// components
import ProgressBar from '../../Components/ProgressBar/ProgressBar';
import OptionsSelect from '../../Components/OptionsSelect/OptionsSelect';
import SearchClinics from '../../Components/SearchClinics/SearchClinics';
import Loader from '../../Components/Loader/Loader';

import ContactForm from '../../Components/ContactForm/ContactForm';

import ArrowBack from '../../assets/arrow-prev.svg';
import './Home.style.scss';




function Home() {

  const [stateQuestions, setStateQuestions] = useState({
    index_question: 0,
    answers: [],
  })
  const [ answerParse, setAnswerParse ] = useState(null)
  const [ isSearching, setIsSearching ] = useState(false)
  const [ goBack, setGoBack ] = useState(false)
  const [ changeRender, setChangeRender ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ showContactForm, setShowContactForm ] = useState(false);

  // manejar los estados de loading
  useEffect(() => {
    if( isSearching ) {
      setTimeout(() => {
        setIsSearching(false)
        setIsLoading(true)
      }, 3000)
    }

    if( isLoading ) {
      setTimeout(() => {
        AnswersParse();
        setIsLoading(false)
        setShowContactForm(true)
      }, 3000)
    }
  }, [isSearching, isLoading])

  // manejo al regresar a la  pregunta anterior
  useEffect(() => {
    
    if( goBack && !changeRender ) {
      setTimeout(() => {
        setStateQuestions(prev => ({
          ...prev,
          index_question: prev.index_question - 1,
        }))
        setChangeRender(true);
      }, 500)
    }
  },[changeRender, goBack] )


  // funcion al seleccionar la respuesta
  const handleSelectedOption = (id) => {
    const stateClone = Object.assign({}, stateQuestions);
    // anterior pregunta
    if( goBack && changeRender ) {
      setChangeRender(false);
      setGoBack(false);
    } 
    // cuando ya no quedan preguntas
    if( stateQuestions.index_question === (data.questions.length - 1) ) {
      setIsSearching(true)
    }
    // primera pregunta
    if( stateQuestions.answers[stateQuestions.index_question] === undefined || stateQuestions.answers.length === 1 ) {
      stateClone.index_question = stateClone.index_question + 1,
      stateClone.answers = [...stateClone.answers, id] 

    return setStateQuestions(stateClone);
    }

    // siguientes preguntas 
    if( stateQuestions.answers.length > 1) {
      const firstOptions = stateQuestions.answers.slice(0, stateQuestions.index_question);
      const lastOptions = stateQuestions.answers.slice(stateQuestions.index_question + 1);

      stateClone.index_question = stateClone.index_question + 1,
      stateClone.answers = firstOptions.concat([id].concat(lastOptions)) 

      return setStateQuestions(stateClone);
    }

  } 

  const handlePreviousQuestion = () => {
    setGoBack(true);
    setChangeRender(false)
    
  }

  const AnswersParse = () => {
    const objectWithAnswers = {}

    const GetAnswerFistQuestion = () => {
      switch (stateQuestions.answers[0]) {
        case 1:
          return 'Grado 3, entradas';
        case 2:
          return 'Grado 5, entradas y coronilla';
        case 3:
          return 'Grado 7, calvo total';
        case 4:
          return 'Mi cabello perdido es diferente';
        default:
          return '';
      }
    }

    objectWithAnswers[0] = {
      label: data.questions[0].label,
      answer: GetAnswerFistQuestion()
    }

    for( let i = 1; i < data.questions.length; i++ ) {
      objectWithAnswers[i] = {
        label: data.questions[i].label,
        answer: data.questions[i].options.filter( option => option.id === stateQuestions.answers[i])[0].label
      }
    }
    setAnswerParse(objectWithAnswers)
  }

  return (
    <div className='home-page'>
        <div className="content-form">
            {/* barra de prograso */}
            {
              stateQuestions.index_question <= (data.questions.length - 1) && (
                <div className="header-form">
                  <ProgressBar totalQuestions= { data.questions.length } index={stateQuestions.index_question} />
                </div>
              )
            }
          <div className="body-form" style={{  background: showContactForm ? '#fff' : '' }}>
            
            {/* preguntas */}
            <div className="content-question-label">
              {
                stateQuestions.index_question <= (data.questions.length - 1) && (
                  <>
                  {
                    !!stateQuestions.index_question && (
                      <span className='back' onClick={handlePreviousQuestion}>
                        <img src={ArrowBack} alt="" />
                      </span>
                    ) 
                  }
                  <h3 className="question-label">
                    {data.questions[stateQuestions.index_question].label}
                  </h3>
                  </>
                )
              }

            </div>  
              {/* lista de opciones */}
            {
              stateQuestions.index_question <= (data.questions.length - 1)  && (
                <OptionsSelect 
                    questions={data.questions[stateQuestions.index_question]} 
                    handleSelectedOption={handleSelectedOption}
                    response={stateQuestions.answers[stateQuestions.index_question]}
                    index={stateQuestions.index_question}
                    goBack={goBack}
                    changeRender={changeRender}
                  />
              )
            }

            {/* loading */}
            {
              (!showContactForm && (stateQuestions.index_question > (data.questions.length - 1) )) && (
                <div className='content-search'>
                    {
                      isSearching && (
                        <SearchClinics />
                      )
                    }
                    {
                      isLoading && (
                        <Loader />
                      )
                    }
                  </div> 

              )
            }
            {/* contact form */}
            {
              showContactForm && (
                <ContactForm answer={answerParse} />
              )
            }

          </div>
          {/* <div className="footer-form">
            <span className='paragraph'>Hasta 3 ofertas de clínicas verificadas</span>
          </div> */}
        </div>
    </div>
  )
}

export default Home