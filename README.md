# React SSR

## Premise

I wanted to try to understand what is behind Next.js and, by extension to Vue.js, to Nuxt.js. Server side rendering is a wonderful process that allows you to mitigate some problems related to the world of SPAs, such as TTFP or SEO.
This PoC is in no way to be considered as a substitute for the aforementioned frameworks. Rather, it can show those interested how I assembled the various pieces.

## Try the Demo

Just install the dependencies, then issue the command:

`npm install`

`npm run dev`

## Features overview

- Routing
  - Routes generation - fs page API
    - \_app
    - \_notFound
- Redux store
- Page's static methods
  - prepopulate
    - `<F.Link>`'s attribute
  - initStore
- Authentication
- API & server proxy

---

### Routing

The same _React App_ is used for rendering on the server and for hydration on the client. However, they have a difference. `StaticRouter` is used on the server, and` BrowserRouter` on the browser. On the server the path given to the `StaticRouter` is the one extracted from the` req`.

The user types `http://localhost:8000/login`, then `/login` is passed as prop `location` to the `StaticRouter`; the latter extrapolates from the routes configuration (`routesConfig`) provided and renders the appropriate page.

Once the app has been hydrated on the client, the `BrowserRouter` takes over and uses the same configuration as routes.

#### Routes generation - fs page API

Trying to emulate what Next.js and Nuxt.js do, I built a small script that collects all the components in the `pages` folder and works them to produce the aforementioned `routesCongif`.

> The configuration is translated into a JSON mask which is used by the client to reconstruct the same configuration and provide it to the `BrowserRouter`

##### \_app

The `App` component (`_app.js`) wraps all the other routes. In this way it is always rendered, so that it does not affect the functionality of the other pages in any way.
It can be used to create shared layouts between pages, execute business logic or calls. In the example it uses a static method called only on the server (see `initStore` later) to find the current user.

##### \_notFound

The `NotFound` component (`_notFound.js`) is added as the last route to the `routeConfig`. Not having an associated path, it is renderer for all unknown paths.

It receives the `staticContext` prop which corresponds to the `context` provided and managed by the `StaticRouter`. On this object it adds a `status` property with a value of `404`. In this way, when the server has finished rendering the html, before sending it to the client, it can modulate the status code of the request appropriately.
In this way the client still receives html server side rendered which is hydrated to a _React app_, all with the appropriate `404` status code.

---

### Page's static methods

I have allowed to associate two static methods to the component-pages. They are similar but treated differently. In both cases they are collected and performed on the server before the app is renderer. They have the purpose of retrieving the information necessary for rendering in the generated html.
These are functions that receive the _redux_ `store` and must return the `dispatch` of an _action_. Their execution leads to the population of the `store`.

> To prevent the server from breaking or hanging when one of these promises is unresolved or rejected, they are all wrapped in a Promise that resolves in both cases.

#### prepopulate

The `prepopulate` static method is only executed when the user requests the associated page directly from the server. In the example, only the _users_ page at the `/users` route has this method. The relative action, therefore the relative _http call_ will occur on the server only when the user navigates directly to `localhost:8000/users`.
Getting to `/users` via client routing will in no way trigger that method. Therefore it is necessary to take this possibility into account and execute the call in a "classic" way in _useEffect_ (a simple but effective optimization is to execute it only when information has not already been collected on the server, or when it has become obsolete).

##### `F.Link`'s attribute

The _Link_ component under the _F_ namespace extends the homonym offered by the `react-router-dom` library. If provided with the `prepopulate` boolean prop, the server will retrieve the component associated with the link path (under the `to` prop) and, if present, will extrapolate the `prepopulate` method. Then it will call it and the data will be saved in the store in advance. In this way, if and when the user visit that page, it won't have to wait for the fetching since it already happened.

> This feature is only worth using for pages that will most likely be visited

#### initStore

It is identical to the previous one. However, if both _prepopulate_ and _initStore_ are present on a page, precedence is given to the latter, thus ignoring the former.
Basically it allows you to inform the server to fetch that data which you just cannot do without, or so heavy that it is preferable not to entrust the recovery to the client.
