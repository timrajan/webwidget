import React, { useEffect, useState } from 'react'
import "./widget.css"

const AtalkiWidget = ({ id }) => {
    const [visibleAnswerId, updateVisibleAnswerId] = useState(null);
    const [expand, toggelFaqBox] = useState(false);
    const [qas, updatequas] = useState([]);
    const [query, updateQuery] = useState("");
    const [loading, updateLoading] = useState(false)

    useEffect(() => {
        getQa()
    }, [])

    useEffect(() => {
        document.onreadystatechange = () => {
            if (document.readyState === 'complete') {
                addClick();
            }
        }
    }, [])

    useEffect(() => {
        addClick();
    }, [expand])

    const addClick = () => {
        const widgetBody = document.getElementById("atalki-widget-faq-body");
        if (widgetBody) widgetBody.addEventListener('click', handlefaqClick);
    }

    const handlefaqClick = (event) => {

        const questionId = Number(event.target.getAttribute("data-question-id"));
        updateVisibleAnswerId(previousValue => {
            if (previousValue === questionId) return null;
            return questionId;
        })


    }


    const getQa = () => {

        fetch(`https://www.atalki.com/api/v2/gettopnquestions/${btoa(id)}/15/`)
            .then(res => res.json())
            .then(data => updatequas(data))
            .catch(err => console.log("failed to fetch FAQs", err))
    }

    const getMatchingQas = () => {
        if (query.length === 0) return getQa();
        updateLoading(true);
        fetch(`https://www.atalki.com/api/v2/gettopnmatchingquestions/${btoa(id)}/15/${query}/`)
            .then(res => res.json())
            .then(data => {
                updateLoading(false);
                updatequas(data)
            })
            .catch(err => {
                updateLoading(false);
                updatequas([])
                console.log("failed to fetch FAQs", err)
            })
    }



    return (
        expand ? <div className={`atalki-widget-container ${expand ? 'expand' : 'collpase'}`}>

            <div className="atalki-widget-faq-container">
                <div className="atalki-widget-faq-header">
                    <div className="atalki-widget-top-header" >
                        <p className="title">Frequently asked Questions</p>
                        <p className="cross" onClick={() => toggelFaqBox(!expand)}><svg fill='white' xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" /></svg></p>
                    </div>
                    <div className="atalki-widget-input-container">
                        <input id="atalki-widget-search-bar" className="atalki-widget-search-bar" placeholder="I am looking for" value={query} onChange={(e) => updateQuery(e.target.value)}></input>
                        <button onClick={getMatchingQas} className="search-button">
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" /></svg>
                        </button>
                    </div>
                </div>
                <div className="atalki-widget-faq-body" id="atalki-widget-faq-body">
                    {
                        qas.length > 0 ? qas.map(({ id, question: ques, answer: ans }) => ques.length > 0 && ans.length > 0 && <div key={id} className={`atalki-widget-faq ${visibleAnswerId !== id ? '' : 'active-section'}`}>
                            <div className="atalki-widget-question-container">
                                <p data-question-id={id}>{ques}</p>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                            <div className={`atalki-widget-answer ${visibleAnswerId !== id ? 'hideText' : ''}`}>
                                <p>{ans}</p>
                            </div>
                        </div>) : <div className='atalki-faq-reponse-container'>
                            <p>No FAQs found</p>
                        </div>
                    }
                </div>
                <div className='atalki-widget-faq-footer'>
                    <a className='page-link' href={`https://www.atalki.com/doc-page/${id}`}>Visit offical FAQ page</a>

                    <p className='tag-line'>Powered by <a href='https://www.atalki.com/'>atalki</a></p>
                </div>

            </div>
        </div> : <div className="FAQ-button" onClick={() => toggelFaqBox(true)}>Frequently Asked Questions</div>
    )
}

export default AtalkiWidget
