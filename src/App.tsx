import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Main = lazy(() => import('./page/main'))
const Api = lazy(() => import('./page/api-test'))

const ChangeEvent = lazy(() => import('./page/change'))
const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading</div>}>
        <Switch>
          <Route path='/' exact component={Main} />
          <Route path='/api' exact component={Api} />
          <Route path='/change_event' exact component={ChangeEvent} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
