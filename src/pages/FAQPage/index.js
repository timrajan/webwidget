import React, { useState, useEffect } from 'react'
import Button from '../../components/Button'
import Footer from '../../components/Footer'
import RichFaqDisplay from '../../components/RichFaqDisplay'

const FAQPage = ({
  id,
  color,
  secColor,
  inIframe,
  toggelFaqBox,
  expand,
  toggleChat,
}) => {
  const [visibleAnswerId, updateVisibleAnswerId] = useState(null)
  const [qas, updatequas] = useState([])
  const [query, updateQuery] = useState('')
  const [loading, updateLoading] = useState(false)

  const getQa = () => {
    fetch(`https://www.atalki.com/api/v3/gettopnquestions/${btoa(id)}/15/`)
      .then((res) => res.json())
      .then((data) => updatequas(data))
      .catch((err) => console.log('failed to fetch FAQs', err))
  }

  useEffect(() => {
    // getQa()
  }, [])

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

  const getMatchingQas = () => {
    if (query.length === 0) return getQa()
    updateLoading(true)
    fetch(
      `https://www.atalki.com/api/v2/gettopnmatchingquestions/${btoa(
        id
      )}/15/${query}/`
    )
      .then((res) => res.json())
      .then((data) => {
        updateLoading(false)
        updatequas(data)
      })
      .catch((err) => {
        updateLoading(false)
        updatequas([])
        console.log('failed to fetch FAQs', err)
      })
  }

  useEffect(() => {
    if (qas.length > 0) {
      const myScript = document.createElement('script')
      myScript.type = 'application/ld+json'
      const content = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [],
      }

      qas.forEach((qa) => {
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
  }, [qas])
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
            <Button handleClick={toggleChat}>Chat with us</Button>
          </div>
          {!inIframe && (
            <p className='atalki-cross' onClick={() => toggelFaqBox(false)}>
              <svg
                fill='white'
                xmlns='http://www.w3.org/2000/svg'
                width='12'
                height='12'
                viewBox='0 0 24 24'
              >
                <path d='M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z' />
              </svg>
            </p>
          )}
        </div>
        <div className='atalki-widget-input-container'>
          <input
            id='atalki-widget-search-bar'
            className='atalki-widget-search-bar'
            placeholder='I am looking for'
            value={query}
            onChange={(e) => updateQuery(e.target.value)}
          ></input>

          <button onClick={getMatchingQas} className='atalki-search-button'>
            <svg
              width='24'
              height='24'
              xmlns='http://www.w3.org/2000/svg'
              fill-rule='evenodd'
              clip-rule='evenodd'
            >
              <path d='M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z' />
            </svg>
          </button>
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
                    backgroundColor:
                      visibleAnswerId === id
                        ? secColor
                          ? secColor
                          : 'aliceblue'
                        : '',
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
                    <svg
                      className='atalki-chevron-down'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 448 512'
                    >
                      <path d='M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z' />
                    </svg>
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
