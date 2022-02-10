import React, { useCallback, useEffect, useState } from 'react'
import "./widget.css"

const data = [{
    id: 1,
    ques: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p',
    ans: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p'
}, {
    id: 2,
    ques: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p',

    ans: 'My name is Aman Dhurwey'
}, {
    id: 3,
    ques: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p',

    ans: 'My name is Aman Dhurwey'
}, {
    id: 4,
    ques: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p',

    ans: 'My name is Aman Dhurwey'
}, {
    id: 5,
    ques: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p',

    ans: 'My name is Aman Dhurwey'
}, {
    id: 6,
    ques: 'What is your name 6?',
    ans: 'My name is Aman Dhurwey'
}, {
    id: 7,
    ques: 'What is your name 7?',
    ans: 'My name is Aman Dhurwey'
}, {
    id: 8,
    ques: 'What is your name 8?',
    ans: 'My name is Aman Dhurwey'
}, {
    id: 9,
    ques: 'What is your name 9?',
    ans: 'My name is Aman Dhurwey'
}, {
    id: 10,
    ques: 'What is your name 10?',
    ans: 'My name is Aman Dhurwey'
}, {
    id: 11,
    ques: 'What is your name 11?',
    ans: 'My name is Aman Dhurwey'
}, {
    id: 12,
    ques: 'What is your name 12?',
    ans: 'My name is Aman Dhurwey'
}, {
    id: 13,
    ques: 'What is your name 13?',
    ans: 'My name is Aman Dhurwey'
}]

const AtalkiWidget = () => {
    const [visibleAnswerId, updateVisibleAnswerId] = useState(null);
    const [expand, toggelFaqBox] = useState(true);
    const [posts, updatePosts] = useState(data);
    const [postPerPage, updatePostPerPage] = useState(5);
    const [currentPage, updateCurrentPage] = useState(1);

    const lastIndex = currentPage * postPerPage;
    const startIndex = lastIndex - postPerPage;
    const post = posts.slice(startIndex, lastIndex);

    useEffect(() => {
        document.onreadystatechange = () => {
            if (document.readyState === 'complete') {
                const widgetBody = document.getElementById("atalki-widget-faq-body");
                widgetBody.addEventListener('click', handlefaqClick);
            }
        }
    }, [])

    const handlefaqClick = useCallback((event) => {
        const questionId = Number(event.target.getAttribute("data-question-id"));
        updateVisibleAnswerId(previousValue => {
            if (previousValue === questionId) return null;
            return questionId;
        })


    }, [visibleAnswerId])

    const NumberTabs = ({ postPerPage, totalPosts, changePage }) => {
        const tabs = [];
        for (let index = 1; index <= totalPosts; index++) {
            if (index * postPerPage <= totalPosts) {
                tabs.push(index);
            }
        }

        return (
            <div className="atalki-widget-number-container">
                {tabs.map((index) => (
                    <div onClick={() => changePage(index)} key={index}>{index}</div>
                ))}
            </div>
        );
    };

    return (
        expand ? <div className={`atalki-widget-container ${expand ? 'expand' : 'collpase'}`}>
            <div className="cross-button" >
                <p className="title">FAQ's</p>
                <p className="cross" onClick={() => toggelFaqBox(!expand)}>Close</p>
            </div>
            <div className="atalki-widget-faq-container">
                <div className="atalki-widget-faq-header">
                    {/* <div className="atalki-widget-logo-container">
                        <p className="atalki-widget-logo">FAQ</p>
                    </div> */}
                    <div className="atalki-widget-input-container">
                        <input id="atalki-widget-search-bar" className="atalki-widget-search-bar" placeholder="I am looking for"></input>
                    </div>
                </div>
                <div className="atalki-widget-faq-body" id="atalki-widget-faq-body">
                    {
                        data.map(({ id, ques, ans }) => <div key={id} className="atalki-widget-faq">
                            <div className="atalki-widget-question-container">
                                <p data-question-id={id}>{ques}</p>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                            <div className={`atalki-widget-answer ${visibleAnswerId !== id ? 'hideText' : ''}`}>
                                <p>{ans}</p>
                            </div>
                        </div>)
                    }
                </div>
                <div className="atalki-widget-faq-footer">
                    {/* <NumberTabs
                   postPerPage={postPerPage}
                   totalPosts={posts.length}
                   changePage={updateCurrentPage}
               /> */}
                </div>
            </div>
        </div> : <div className="FAQ-button" onClick={() => toggelFaqBox(true)}>FAW's</div>
    )
}

export default AtalkiWidget
