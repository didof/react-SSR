import jwt from 'jsonwebtoken'

export function authGuard(req, res, next) {
  const token = req.cookies.access_token
  if (!token) return res.status(401).send('Authorization needed')
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = data.id
    req.username = data.name
    return next()
  } catch (err) {
    return res.status(401).send('Authorization needed')
  }
}

export function authInfo(req, res, next) {
  const token = req.cookies.access_token
  if (!token) return next()
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = data.id
    req.username = data.name
  } finally {
    return next()
  }
}
