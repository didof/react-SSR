import React from 'react'
import { useAuth } from '../../helpers/customHooks'
import { Redirect } from 'react-router-dom'
import { decorateHOCWithStaticProps } from '../../helpers/decorators'

function withAuth(Component) {
  return function WrappedComponent(props) {
    const { isAuth } = useAuth()
    if (!isAuth) return <Redirect to='/' />
    return <Component {...props} />
  }
}

export default withAuth

export const withAuthCompound = decorateHOCWithStaticProps(withAuth)
