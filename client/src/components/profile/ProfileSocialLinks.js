import React from 'react'

export default ({social}) => {
  return (
    Object.keys(social).map(key => (
    <a className="text-white p-2" href={social[key]} key={key} target='_blank'>
      <i className={`fab fa-${key} fa-2x`} />
    </a>
  ))
  )
}
