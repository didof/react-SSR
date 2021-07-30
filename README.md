# React SSR

To start run:

`npm run dev`

## State of the art

### Server

Anytime some user requests a page, the server calls the `prepopulate` static method of each page. Each returns the result of an action, thus data that ends up in the server-side redux store.
When this fetching process is completed, the server uses `renderToString` method to produce the "only-HTML" version of the React App. Since the store is populated, the relative UI chunks are renderer as well!
The App is injected in an HTML file that will be sent to the client. This contains:

- The App inside a `div#__root`
- A `script` that requests the bundled client-side version of the app from `/public`
- The redux initialState appended to the window object as `window.__INITIAL__STATE__`. It is serialized to mitigate XSS attacks.

Still on the server, `StaticRouter` receives the requested `path` (taken from `req`) and decides which page to render in the `renderToString` moment.
On the browser the good ol' `BrowserRouter` is in charge of the routing in a SPA fashion.

### Client

It's a standard React App but with few noteworthy exceptions.

- Instead of `ReactDOM.render` it's used `ReactDOM.hydrate` on the `div#__root`; the App already exists in the DOM, it just need to be injected with a soul.
- The creation of the Redux store uses the `window.__INITIAL__DATA__` as initialData. Otherwise the client-side React would argue that the hydrated App is different from what it should be.

### API

A further express server mocks up a database an the relative API. The redux actions take here the data.

### Features

- _Prepopulation_: A `<Link >` component accepts a boolean prop named `prepopulate`. If the Renderer Server meets it during the `renderToString` phase, it will call the `prepopulate` static method associated to the component relative to that route. Thus, the redux store will be already filled up and, in case the user visit that route, the client won't need to wait for the fetching since it already happened server-side.

- _fs API_: The route configuration is created on the server. It reads the content of the _pages_ dir and creates a `.json` file that will be used by the client to sync to the server-renderer html.

## Todo

- Update _redux_ to the modern version

- serverBoot - Promise.all of all prepopulate static method and put in the store
