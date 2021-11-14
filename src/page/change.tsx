import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import API from '../service/api'
import GetTodosListModel from '../service/api/model/get-todos-list-model'
import styles from './change.module.css'

const ChangeEventPage = () => {
  const [form, setForm] = useState({
    id: '',
    name: '',
    gender: 'N',
  })
  const [userData, setUserData] = useState<Array<GetTodosListModel>>([])

  const [checked, setChecked] = useState<Array<number>>([])

  const [checkedList, setCheckedList] = useState([] as any)

  const [sort, setSort] = useState({
    id: 0,
    title: 0,
  })

  const onSort = (e: 'id' | 'title') => {
    setSort({
      ...sort,
      [e]: sort[e] === 0 ? 1 : sort[e] * -1,
    })
  }

  const onChangeGender = useCallback((gender: string) => {
    setForm((form) => {
      return {
        ...form,
        gender,
      }
    })
  }, [])

  const onChangeCheck = (e: number) => {
    setChecked(
      checked.includes(e) ? checked.filter((i) => i !== e) : checked.concat(e)
    )
  }

  // checkbox function
  const onCheckedAll = useCallback(
    (checked) => {
      if (checked) {
        const checkedListArray = [] as any

        userData.forEach((list) => checkedListArray.push(list))
        setCheckedList(checkedListArray)
      } else {
        setCheckedList([] as any)
      }
    },
    [userData]
  )

  const onCheckedElement = useCallback(
    (checked, list) => {
      if (checked) {
        setCheckedList([...checkedList, list])
      } else {
        setCheckedList(checkedList.filter((i: any) => i !== list))
      }
    },
    [checkedList]
  )

  const onGetUser = async () => {
    await API.todos
      .getUserData()
      .then((res) => {
        console.log(res.data)
        const data = res.data
        setUserData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    onGetUser()
  }, [])

  const sorted_table_data = useMemo(() => {
    const return_data = [...userData].filter((_, index) => index < 10)

    if (Object.values(sort).filter((v) => v !== 0)) {
      const target = sort.id ? 'id' : 'title'
      const reverse = sort[target]

      return_data.sort((a, b) =>
        a[target] > b[target]
          ? 1 * reverse
          : a[target] < b[target]
          ? -1 * reverse
          : 0
      )
    }

    return return_data
  }, [sort, userData])

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor='name'>name : </label>
        <input
          type='text'
          id='name'
          value={form.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, name: e.target.value })
          }
        />
      </div>
      <div>
        <ul>
          <li>
            <input
              type='radio'
              id='M'
              checked={form.gender === 'M'}
              onChange={() => onChangeGender('M')}
              name='gender'
            />
            <label htmlFor='M'></label>
            <label htmlFor='M'>남성</label>
          </li>
          <li>
            <input
              type='radio'
              id='F'
              checked={form.gender === 'F'}
              onChange={() => onChangeGender('F')}
              name='gender'
            />
            <label htmlFor='M'></label>
            <label htmlFor='M'>여성</label>
          </li>
          <li>
            <input
              type='radio'
              id='N'
              checked={form.gender === 'N'}
              onChange={() => onChangeGender('N')}
              name='gender'
            />
            <label htmlFor='M'></label>
            <label htmlFor='M'>무관</label>
          </li>
        </ul>
      </div>

      <div>
        <input
          type='checkbox'
          name='name'
          id='checked-1'
          checked={checked.includes(1)}
          onChange={() => onChangeCheck(1)}
        />
        <label htmlFor='checked-1'>이름</label>

        <input
          type='checkbox'
          name='name'
          id='checked-2'
          checked={checked.includes(2)}
          onChange={() => onChangeCheck(2)}
        />
        <label htmlFor='checked-2'>아이디</label>
      </div>

      <div className={styles.table_box}>
        <table>
          <colgroup>
            <col width='*' />
            <col width='25%' />
            <col width='25%' />
            <col width='25%' />
          </colgroup>
          <thead>
            <tr className={styles.table_title}>
              <th>
                <input
                  type='checkbox'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onCheckedAll(e.target.checked)
                  }
                  checked={
                    checkedList.length === 0
                      ? false
                      : checkedList.length === userData.length
                      ? true
                      : false
                  }
                />
              </th>
              {/* <th>completed</th>÷ */}
              <th>User Id</th>
              <th
                onClick={() => onSort('id')}
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
              >
                ID
              </th>
              <th
                onClick={() => onSort('title')}
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
              >
                Title
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted_table_data.map((item, index) => (
              <React.Fragment key={index}>
                <tr className={styles.center_tr}>
                  <td>
                    <input
                      type='checkbox'
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onCheckedElement(e.target.checked, item)
                      }
                      checked={checkedList.includes(item) ? true : false}
                    />
                  </td>
                  <td>{item.userId}</td>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ChangeEventPage
