import React from 'react'
import { RouteComponentProps } from 'react-router'

const Main = (props: RouteComponentProps) => {
  const { history } = props

  return (
    <>
      <section>
        <div>
          <h1>클릭시 페이지 이동</h1>
          <ul>
            <li onClick={() => history.push('/api')}>API</li>
            <li onClick={() => history.push('/change_event')}>ChangeEvent</li>
            <li></li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default Main
