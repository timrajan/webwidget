import React, { useState, useEffect, useRef } from 'react'
import Button from '../../components/Button'
import Footer from '../../components/Footer'
import RichFaqDisplay from '../../components/RichFaqDisplay'
import UserStatus from '../../components/UserStatus'
import { API_URL } from '../../constant'
import { useFaqContext } from '../../context/faqContext'
import { useGlobalContext } from '../../context/globalContext'
import { useUserContext } from '../../context/userContext'
import ChevronDown from '../../icons/chevronDown'
import CloseIcon from '../../icons/closeIcon'
import SearchIcon from '../../icons/searchIcon'

const FAQPage = ({ toggelFaqBox, expand, toggleChat }) => {
  const { is_premium } = useUserContext()
  const { id, color, inIframe } = useGlobalContext()
  const { faqs } = useFaqContext()
  const [visibleAnswerId, updateVisibleAnswerId] = useState(null)
  const [qas, updatequas] = useState(faqs)
  const inputRef = useRef(null)

  useEffect(() => {
    addClick()
  }, [expand])

  const addClick = () => {
    const widgetBody = document.getElementById('atalki-widget-faq-body')
    console.log({ widgetBody })
    if (widgetBody) widgetBody.addEventListener('click', handlefaqClick)
  }

  const handlefaqClick = (event) => {
    const container = event.target.closest('.atalki-widget-faq')
    console.log({ container })
    if (container) {
      const questionId = Number(container.dataset.questionId)
      if (questionId) {
        updateVisibleAnswerId((previousValue) => {
          if (previousValue === questionId) return null
          return questionId
        })
      }
    }
  }

  const getMatchingQas = (e) => {
    e.preventDefault()
    const query = inputRef?.current?.value
    if (query.length === 0) return updatequas(faqs)
    fetch(`${API_URL}/gettopnmatchingquestions/${btoa(id)}/15/${query}/`)
      .then((res) => res.json())
      .then((data) => {
        updatequas(data)
      })
      .catch((err) => {
        updatequas([])
        console.log('failed to fetch FAQs', err)
      })
  }

  useEffect(() => {
    if (faqs.length > 0) {
      const myScript = document.createElement('script')
      myScript.type = 'application/ld+json'
      const content = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [],
      }

      faqs.forEach((qa) => {
        content.mainEntity.push({
          '@type': 'Question',
          name: `${qa.question}`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `<p>${qa.answer}</p>`,
          },
        })
      })
      myScript.textContent = JSON.stringify(content, null, 2)
      document.head.appendChild(myScript)
    }
  }, [faqs])
  return (
    <div
      className='atalki-widget-faq-container'
      style={{ backgroundColor: color }}
    >
      <div
        className='atalki-widget-faq-header'
        style={{ backgroundColor: color }}
      >
        <div className='atalki-widget-top-header'>
          <div className='flex aic'>
            <p className='atalki-title'>Frequently asked Questions</p>
            <p className='atalki-mobile-title'>FAQs</p>
            {is_premium ? (
              <Button handleClick={toggleChat}>Chat View</Button>
            ) : (
              <UserStatus id={id} />
            )}
          </div>
          {!inIframe && (
            <p className='atalki-cross' onClick={() => toggelFaqBox(false)}>
              <CloseIcon />
            </p>
          )}
        </div>
        <div className='atalki-widget-input-container'>
          <form onSubmit={getMatchingQas} className='flex aic'>
            <input
              id='atalki-widget-search-bar'
              className='atalki-widget-search-bar'
              placeholder='I am looking for'
              ref={inputRef}
            />

            <button type='submit' className='atalki-search-button'>
              <SearchIcon />
            </button>
          </form>
        </div>
      </div>
      <div className='atalki-widget-faq-body' id='atalki-widget-faq-body'>
        {qas.length > 0 ? (
          qas.map(
            ({
              id,
              question: ques,
              answer: ans,
              qa_highlight_color,
              blink,
              is_expired,
            }) =>
              ques.length > 0 &&
              ans.length > 0 &&
              !is_expired && (
                <div
                  key={id}
                  data-question-id={id}
                  className={`atalki-widget-faq ${
                    visibleAnswerId !== id ? '' : 'active-section'
                  }`}
                  style={{
                    backgroundColor: visibleAnswerId === id ? 'aliceblue' : '',
                  }}
                >
                  <div
                    className={`atalki-widget-question-container ${
                      blink ? 'atalki-blink' : ''
                    }`}
                    style={{
                      backgroundColor: qa_highlight_color
                        ? qa_highlight_color
                        : '#fff',
                    }}
                  >
                    <RichFaqDisplay id={id} data={ques} />
                    <ChevronDown isActive={visibleAnswerId === id} />
                  </div>
                  <div
                    className={`atalki-widget-answer ${
                      visibleAnswerId !== id ? 'atalki-hideText' : ''
                    }`}
                  >
                    <RichFaqDisplay data={ans} />
                  </div>
                </div>
              )
          )
        ) : (
          <div className='atalki-faq-reponse-container'>
            <p>No FAQs found</p>
          </div>
        )}
      </div>
      <Footer color={color} id={id} />
    </div>
  )
}

export default FAQPage
