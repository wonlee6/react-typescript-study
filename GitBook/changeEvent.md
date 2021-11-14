# ChangeEvent

### 보통 onchage 함수를 통해 이벤트를 다루기도 하지만, HtmlElement에 직접적으로 수정도 가능하다.

```tsx
const [form, setForm] = usestate({
  id : "",
  name : "",
})

return (
  <React.Fragment>
   <input
     type='text'
     id='name'
     value={form.name}
     onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, name: e.target.value })
     }
    />
  <React.Fragment />
)

```

위의 코드 처럼 가능

onChange에 어떤 element다룰지 명시해야 한다.

## checkbox or radio

### radio

radio 또는 checkbox 경우 useCallBack으로 최적화하여 관리하는 것이 좋다.

```tsx
// radio
const [form, setForm] = useState({
  gender: 'N', // default None
})

const onChangeGender = useCallBack((gender: string) => {
  setForm((form) => {
    return {
      ...form,
      gender,
    }
  })
}, [])

return (
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
)
```

### checkbox

```tsx
// checkBox
const [checked, setChecked] = useState<Array<number>>([])

const onChangeCheck = (e: number) => {
  setChecked(
    checked.includes(e) ? checked.filter((i) => i !== e) : checked.concat(e)
  )
}

return (
  <>
    <input
      type='checkbox'
      name='name'
      id='checked-1'
      checked={checked.includes(1)}
      onChange={() => onChangeCheck(1)}
    />
    <input
      type='checkbox'
      name='name'
      id='checked-2'
      checked={checked.includes(2)}
      onChange={() => onChangeCheck(2)}
    />
  </>
)
```

### number배열로 관리해도 되고 string으로 관리해도 된다.

### List의 체크 관리 할때

```tsx
const [checkedList, setCheckedList] = useState([] as any)

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

return (
  // checkbox all
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

  ...

  // checkbox
   <input
     type='checkbox'
     onChange={(e: ChangeEvent<HTMLInputElement>) =>
       onCheckedElement(e.target.checked, item)
     }
     checked={checkedList.includes(item) ? true : false}
   />
)
```

## sort

제목을 클릭했을 때 정렬 기능

```tsx
// id,title 만 적용

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
  ...
   <th onClick={() => onSort('id')>id</th>
   <th onClick={() => onSort('title')>title</th>
  ...
)
```

## file
