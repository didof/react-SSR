import React from 'react'

// default to empty object because it does not exists on the client
function NotFound({ staticContext = {} }) {
  staticContext.status = 404

  return <div>Not Found</div>
}

export default NotFound
