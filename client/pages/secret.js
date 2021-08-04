import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { fetchSecret } from '../actions'
import { withAuthCompound } from '../components/hocs/withAuth'

function Secret() {
  const secret = useSelector(state => state.secret)

  return (
    <div>
      <Helmet>
        <title>Secret Page</title>
        <meta property='og:title' content='Secret Page' />
      </Helmet>
      <h1>Secret</h1>
      <figure>
        <img
          src={secret.url}
          alt='The cake is a lie!'
          width='450'
          height='300'
        />
        <figcaption>{secret.caption}</figcaption>
      </figure>
      <span></span>
    </div>
  )
}

function SecretPrepopulate(store) {
  return store.dispatch(fetchSecret())
}

export default withAuthCompound(Secret, { prepopulate: SecretPrepopulate })
