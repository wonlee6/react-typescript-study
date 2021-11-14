import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router'
import TestSub from './test-sub'

const Main = (props: RouteComponentProps) => {
  const { history } = props
  const [is_show, setIsShow] = useState<boolean>(false)
  return (
    <>
      <section>
        <div>
          <h1>클릭시 페이지 이동</h1>
          <ul>
            <li onClick={() => history.push('/api')}>API</li>
            <li onClick={() => history.push('/change_event')}>ChangeEvent</li>
            <li>
              <TestSub is_show={setIsShow} show={is_show} />
              {is_show === true ? (
                <h3>boolean === true</h3>
              ) : (
                <h3>boolean === false</h3>
              )}
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default Main
