import React from 'react'
import F from '../components/framework'

function Index() {
  return (
    <div>
      <F.Link prepopulate to='/users'>
        Users
      </F.Link>
      <div>Index component</div>
      <button onClick={() => alert('Yep')}>Does JS works?</button>
    </div>
  )
}

export default Index
