import React from 'react'
import { useSelector } from 'react-redux'
import { fetchSecret } from '../actions'
import { withAuthCompound } from '../components/hocs/withAuth'

function Secret() {
  const secret = useSelector(state => state.secret)

  return (
    <div>
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
