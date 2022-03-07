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
            console.log("changed")
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
        console.log(questionId)
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
            <div className="cross-button" >
                <p className="title">Frequently asked Questions</p>
                <p className="cross" onClick={() => toggelFaqBox(!expand)}>Close</p>
            </div>
            <div className="atalki-widget-faq-container">
                <div className="atalki-widget-faq-header">
                    {/* <div className="atalki-widget-logo-container">
                        <p className="atalki-widget-logo">FAQ</p>
                    </div> */}
                    <div className="atalki-widget-input-container">
                        <input id="atalki-widget-search-bar" className="atalki-widget-search-bar" placeholder="I am looking for" value={query} onChange={(e) => updateQuery(e.target.value)}></input>
                        <button onClick={getMatchingQas}>Search</button>
                    </div>
                </div>
                <div className="atalki-widget-faq-body" id="atalki-widget-faq-body">
                    {
                        qas.length > 0 ? qas.map(({ id, question: ques, answer: ans }) => ques.length > 0 && ans.length > 0 && <div key={id} className="atalki-widget-faq">
                            <div className="atalki-widget-question-container">
                                <p data-question-id={id}>{ques}</p>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                            <div className={`atalki-widget-answer ${visibleAnswerId !== id ? 'hideText' : ''}`}>
                                <p>{ans}</p>
                            </div>
                        </div>) : <div>
                            <p>No FAQ's found</p>
                        </div>
                    }
                </div>

            </div>
        </div> : <div className="FAQ-button" onClick={() => toggelFaqBox(true)}>Frequently Asked Questions</div>
    )
}

export default AtalkiWidget
