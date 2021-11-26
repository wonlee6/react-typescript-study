import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Main = lazy(() => import('./page/main'))
const Api = lazy(() => import('./page/api-test'))

const ChangeEvent = lazy(() => import('./page/change'))
const App = () => {
  return (
    // <Router>
    //   <Suspense fallback={<div>Loading</div>}>
    //     <Switch>
    //       <Route path='/' exact component={Main} />
    //       <Route path='/api' exact component={Api} />
    //       <Route path='/change_event' exact component={ChangeEvent} />
    //     </Switch>
    //   </Suspense>
    // </Router>
    <BrowserRouter>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/api' element={<Api />} />
          <Route path='/change_event' element={<ChangeEvent />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
