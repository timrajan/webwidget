import React from 'react'

const Footer = ({ color, id }) => {
  return (
    <div
      className='atalki-widget-faq-footer'
      style={{ backgroundColor: color }}
    >
      <a
        className='atalki-page-link'
        href={`https://www.atalki.com/doc-page/${id}`}
        target='_blank'
        rel='noopener'
      >
        Visit my offical FAQ page
      </a>

      <p className='atalki-tag-line'>
        Powered by
        <a href='https://www.atalki.com/' target='_blank' rel='noopener'>
          atalki
        </a>
      </p>
    </div>
  )
}

export default Footer
