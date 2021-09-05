import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Main = lazy(() => import('./page/main'))

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading</div>}>
        <Switch>
          <Route path='/' exact component={Main} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
