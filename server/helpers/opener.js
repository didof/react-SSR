export function openBrowser() {
  const port = process.env.RENDERER_SERVER_PORT
  console.info(`Renderer server listening on http://localhost:${port}`)
}
