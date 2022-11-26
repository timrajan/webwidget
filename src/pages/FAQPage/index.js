import React, { useState, useEffect, useRef } from 'react'
import Button from '../../components/Button'
import Footer from '../../components/Footer'
import RichFaqDisplay from '../../components/RichFaqDisplay'
import UserStatus from '../../components/UserStatus'
import { API_URL } from '../../constant'
import { useFaqContext } from '../../context/faqContext'
import { useGlobalContext } from '../../context/globalContext'
import { useUserContext } from '../../context/userContext'
import AudioIcon from '../../icons/audioIcon'
import ChevronDown from '../../icons/chevronDown'
import CloseIcon from '../../icons/closeIcon'
import SearchIcon from '../../icons/searchIcon'
import YoutubeIcon from '../../icons/youtubeIcon'
import AudioView from './AudioView'
import YoutubeView from './YoutubeView'

const FAQPage = ({ toggelFaqBox, expand, toggleChat }) => {
  const { is_premium } = useUserContext()
  const { id, color, inIframe } = useGlobalContext()
  const { faqs, loading } = useFaqContext()
  const [visibleAnswerId, updateVisibleAnswerId] = useState(null)
  const [qas, updateqas] = useState([])
  const [filterType, setFilterType] = useState('')
  const inputRef = useRef(null)
  const [audioUrl, setAudioUrl] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    updateqas(faqs)
  }, [faqs])

  useEffect(() => {
    addClick()
  }, [expand])

  const addClick = () => {
    const widgetBody = document.getElementById('atalki-widget-faq-body')
    if (widgetBody) widgetBody.addEventListener('click', handlefaqClick)
  }

  const handlefaqClick = (event) => {
    const container = event.target.closest('.atalki-widget-faq')
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
    if (query?.length === 0) {
      updateqas(faqs)
      setFilterType('')
      return
    }
    fetch(`${API_URL}/gettopnmatchingquestions/${btoa(id)}/15/${query}/`)
      .then((res) => res.json())
      .then((data) => {
        updateqas(data)
        setFilterType('')
      })
      .catch((err) => {
        updateqas([])
        console.log('failed to fetch FAQs', err)
      })
  }

  const handleFilter = (e, type) => {
    if (filterType === type) {
      setFilterType('')
      updateqas(faqs)
      return
    }
    if (type === 'audio') {
      const audioFaqs = faqs?.filter((faq) => faq?.audio_answer !== null)
      updateqas(audioFaqs)
    }
    if (type === 'youtube') {
      const youtubeFaqs = faqs?.filter((faq) => faq?.youtube_answer !== null)
      updateqas(youtubeFaqs)
    }
    setFilterType(type)
  }

  const handleWatch = (e, type, url) => {
    e.stopPropagation()
    if (type === 'audio' && url) {
      setAudioUrl(url)
      setShowModal(true)
    }
    if (type === 'youtube' && url) {
      setYoutubeUrl(url)
      setShowModal(true)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setYoutubeUrl('')
    setAudioUrl('')
  }

  useEffect(() => {
    if (faqs?.length > 0) {
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
            <p className='atalki-title'>
              {is_premium ? 'FAQs' : 'Frequently asked Questions'}
            </p>
            <p className='atalki-mobile-title'>FAQs</p>
            <UserStatus id={id} />
          </div>
          <div className='flex aic'>
            {is_premium && (
              <Button handleClick={toggleChat}> Switch to Chat View</Button>
            )}
            <div className='filter-icons flex'>
              <span
                className='flex aic'
                onClick={(e) => handleFilter(e, 'youtube')}
              >
                <YoutubeIcon isActive={filterType === 'youtube'} />
              </span>
              <span
                className='flex aic'
                onClick={(e) => handleFilter(e, 'audio')}
              >
                <AudioIcon isActive={filterType === 'audio'} />
              </span>
            </div>
            {!inIframe && (
              <div
                className='atalki-cross flex aic'
                onClick={() => toggelFaqBox(false)}
              >
                <CloseIcon />
              </div>
            )}
          </div>
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
        {loading ? (
          <div className='atalki-faq-reponse-container'>
            <p>Loading FAQs</p>
          </div>
        ) : qas?.length > 0 ? (
          qas.map(
            ({
              id,
              question: ques,
              answer: ans,
              qa_highlight_color,
              blink,
              is_expired,
              audio_answer,
              youtube_answer,
            }) =>
              ques?.length > 0 &&
              ans?.length > 0 &&
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
                    <div className='flex'>
                      {audio_answer && (
                        <Button
                          handleClick={(e) => {
                            handleWatch(e, 'audio', audio_answer)
                          }}
                          color={color}
                        >
                          Listen Audio
                        </Button>
                      )}
                      {youtube_answer && (
                        <Button
                          handleClick={(e) => {
                            handleWatch(e, 'youtube', youtube_answer)
                          }}
                          color={color}
                        >
                          Watch Youtube
                        </Button>
                      )}
                    </div>

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
      {showModal && (
        <div className='watch-modal' style={{ backgroundColor: color }}>
          <Button handleClick={closeModal}>Switch To FAQ View</Button>
          {audioUrl && <AudioView audio_url={audioUrl} />}
          {youtubeUrl && <YoutubeView yt_url={youtubeUrl} />}
        </div>
      )}
    </div>
  )
}

export default FAQPage
