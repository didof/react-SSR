# React SSR

To start run:

`npm run dev`

## State of the art

- Renderer server builds the application and sends it to the client

- The client receives a populated HTML, downloads the same application and React uses it to hydrate the former

- On the server is used a `StaticRouter` that extrapolates the path from the `req` and uses it to decide which route to render.

- On the client routing is handled by the `BrowserRouter`

- An express server mocks up a database and the relative API

## Todo

- Update _redux_ to the modern version

- Allow Server Side Data Loading

- Use fs to setup routing (in a NextJS/NuxtJS fashion)
