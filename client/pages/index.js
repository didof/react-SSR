import React from 'react'
import Nav from '../components/nav'

function Index() {
  return (
    <div>
      <Nav />
      <h1>Index</h1>
      <button onClick={() => alert('Yep')}>Does JS works?</button>
    </div>
  )
}

export default Index
