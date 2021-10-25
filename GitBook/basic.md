## TypeScript 기본

타입스크립트는 기본적으로 어떤 타입인지 명세해줘야 한다.
타입스크립트는 type , interface 2개가 있는데, 차이점이라면 interface는 상속을 가능, 그리고
다른 곳에서도 불러와 사용할 수 있다.

예) 1. number, string

```ts
const [number, setNumber] = useState<number>(1)

const [string, setString] = useState<string>('')
```

2. API 에서 배열안 정보들을 가지고 올 때

```ts
// service model에 인터페이스를 만들었다는 가정하에...
const [class_data, setClassData] = useState<Array<interface>>([])
```

3. API 데이터를 보니 객체 안에 데이터들이 있을 경우

```ts
const [class_data, setClassData] = useState({
  name: '',
  age: '',
  gender: '',
})
```

이렇게 초기 값을 준비한다.

## Change Event

기본적인 change event

```ts
const [form, setForm] = useState({
  name: "",
})

const onChangeInput = (e: ChangeEvent<HTMLInputElement> | <HTMLSelectElement>) => {
    setInput_value({
      ...input_value,
      [e.target.id]: e.target.value,
    })
  }

<input id="name" value={form.name} onChange={onChangeInput} >
```

useRef 사용 할 경우

```ts
const input_value: React.MutableRefObject<HTMLInputElement | null> = useRef(null)
```

```ts
export interface GetPaperResponseDataModel {
  idx: number
  name: string
  gsm: number
  type_idx: number
  company_name: string
  paper_type: string
}
```

뒤에 export를 붙이면 다른곳에서도 사용 쌉가능
