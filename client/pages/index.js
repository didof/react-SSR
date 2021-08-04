import React from 'react'
import { Helmet } from 'react-helmet'

function Index() {
  return (
    <div>
      <Helmet>
        <title>Home Page</title>
        <meta property='og:title' content='Home Page' />
      </Helmet>
      <h1>Index</h1>
      <button onClick={() => alert('Yep')}>Does JS works?</button>
    </div>
  )
}

export default Index
