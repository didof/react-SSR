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
  - Server
  - Client
  - Routes generation (fs page API)
    - \_app
    - \_notFound
- page's static methods
  - prepopulate
    - `<F.Link>`'s attribute
  - initStore
- API & server proxy

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
