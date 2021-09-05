import React, { useEffect, useState } from 'react'
import API from '../service/api'
import GetTodosListModel from '../service/api/model/get-todos-list-model'

const Main = () => {
  const [userData, setUserData] = useState<GetTodosListModel[]>([])

  const [is_vaild, setIs_vaild] = useState(false)

  const onGetUser = async () => {
    await API.todos
      .getUserData()
      .then((res) => {
        console.log(res.data)
        const data = res.data
        setUserData(data)
        setIs_vaild(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    onGetUser()
  }, [])
  return (
    <article>
      <div>
        <table>
          <thead>
            <tr>
              <th>유저번호</th>
              <th>아이디</th>
              <th>제목</th>
              <th>유/무</th>
            </tr>
          </thead>

          <tbody>
            {is_vaild ? (
              userData.map((data, index) => (
                <tr key={index}>
                  <td>{data.userId}</td>
                  <td>{data.id}</td>
                  <td>{data.title}</td>
                  <td>{data.completed ? <h4>함</h4> : <h4>안함</h4>}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>조회해주세요</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </article>
  )
}

export default Main
