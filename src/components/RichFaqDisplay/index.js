import React from 'react'
import DOMPurify from 'dompurify'

const RichFaqDisplay = ({data}) => {
    return (
      <div
        className="atalki-richText"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data) }}
      />
    );
}

export default RichFaqDisplay