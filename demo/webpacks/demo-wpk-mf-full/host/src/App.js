import { HashRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
// eslint-disable-next-line import/no-unresolved
import orderRoutes from 'RemoteOrder/routes'
import Navigation from './Navigation'
import localRoutes from './routes'

const routes = [...localRoutes, ...orderRoutes]

const App = () => (
  <React.StrictMode>
    <HashRouter>
      <div>
        <h1>Micro Host</h1>
        <Navigation />
        <Routes>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <React.Suspense fallback={<>...</>}>
                  <route.component />
                </React.Suspense>
              }
              exact={route.exact}
            />
          ))}
        </Routes>
      </div>
    </HashRouter>
  </React.StrictMode>
)

export default App
