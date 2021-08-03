import jwt from 'jsonwebtoken'

export function auth(req, res, next) {
  const token = req.cookies.access_token
  if (!token) return res.status(403).send('Authorization needed')
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = data.id
    req.username = data.name
    return next()
  } catch (err) {
    return res.status(403).send('Authorization needed')
  }
}
