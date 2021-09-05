# React TypeScript 

프로젝트 설치 

yarn create react-app (project 명) --templete typescript

## TypeScript 기본

useState 객체일 경우 초기 값을 설정해야 한다.

```ts
interface FormDataModel {
  name : string
  title : string
  age : string
}
const [form, setForm] = useState<FormDataModel>({
  name : "",
  title : "",
  age : "", 
})
```

만약 string 타입으로 받아와 int 타입으로 보낼 시

``` ts
...form,
age : parsenInt(form.age)
```


배열 안 객체일 경우

```ts
const [form, setForm] = useState<Array<FormDataModel>>([])
```

Change Event

```ts
const onChangeInput = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setInput_value({
      ...input_value,
      [e.target.id]: e.target.value,
    })
  }

```

`e: ChangeEvent<HTML...>` input인지 select인지 onChange 달아둔 곳의 요소 입력 

useRef 사용 할 경우

```ts
 const input_value: React.MutableRefObject<HTMLInputElement | null> = useRef(null)
```

## 에러 처리

```ts
API.account // 예시
    .getUserData()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
```

API(Axios) 통신은 위와 기본적인 구조를 가지고 있는데,    
Error 만 따로 처리할 경우(반복되는 코드는 줄이는 편이 좋다)

``` ts
export const errorHandler = async (error: Error | AxiosError, fn: () => Promise<void>, callback?: () => void) => {

  if (isAxiosError(error)) { // 서버 오류인지 클라이언트 오류인지 확인
    if (error.response?.data.code === 401) { // 서버쪽 401오류 라면
      const ok = await tokenRefresh() // --- 코드 실행

      if (ok) {
        await fn()
      } else {
        console.log(error, fn, window.location)
        window.location.replace('/')
      }
    } else {
      alert(error.response?.data.message)
    }
  } else {
    if (callback) {
      callback()
    }
  }
}
```

함수 자체를 파라미터로 받아 올 경우 `fn: () => void`, promise 라면 `fn: () => promise<void>`

결과,

```ts
const userData = async () => {

  API.account // 예시
      .getUserData()
      .then((res) => console.log(res))
      .catch((err) => await ErrorHandler(err, userData) )

}
```

에러 핸들러에 프로미스로 선언했기에, async await 사용

## 페이지네이션

구조

```jsx
  const postsperPage = useRef(10) // 10개씩 보여줄 수
  const [currentPage, setCurrentPage] = useState<number>(1) // 보고있는 현재 페이지

  const indexOfLast: number = currentPage * postsperPage.current 
  const indexOfFirst: number = indexOfLast - postsperPage.current

  const currentPosts = (tmp: any) => {
    let currentPosts = 0
    currentPosts = tmp.slice(indexOfFirst, indexOfLast) 
    return currentPosts
  }
  // slice 는 어디부터 어디까지 잘라낸후 새로운 배열을 반환
```
 

```tsx
  // paper component 
    ...
  <div>
 <Pagination per_page={postsperPage.current}
             total_page={paperData.length} // 가져온 데이터들의 총 길이 (개수)
             onChangePage={setCurrentPage}
             current_page={currentPage} />
 </div>
... 
```

Pagination 컴포넌트

``` tsx
const Pagination = (props) => {
  const { per_page, total_page, onChangePage, current_page } = props

  const max_pages = Math.ceil(total_page / per_page)

  const rendering_page_number = Array(10) // 10개의 배열을 만듬
    .fill(null) // 10개의 배열 값은 null 
    .map((_, index) => { // index만 필요하기에 (_, index)

      const additional = Math.floor((current_page - 1) / 10) * 10 // 결과 : [0,1,2,3,4,5,6,7,8,9]

      const current = index + 1 + additional // 결과 : [1,2,3,4,5,6,7,8,9,10]

      return current > max_pages ? null : current // 현재 페이지가 31, 마지막페이지가 33 경우, [31,32,33,null,null,null,null,null,null,null]
    })
    .filter((i) => i !== null) // null 값을 지움

  const onClickPrev = () => {
    current_page <= 10 ? onChangePage(1) : onChangePage(current_page - 10)
  }

  const onClickNext = () => {
    rendering_page_number.length >= 10 ? onChangePage(current_page + 10) : onChangePage(max_pages)
  }

  return (
    <>
      <div className='pagination'>
        <ul className='clearfix'>
          {current_page !== 1 && (
            <>
              <li>
                <Link to='#' onClick={onClickPrev}>
                  <img src={backArrow} alt='전 페이지로' />
                  <img src={backArrow} alt='전 페이지로' />
                </Link>
              </li>
              <li>
                <Link to='#' onClick={() => onChangePage(current_page - 1)}>
                  <img src={backArrow} alt='전 페이지로' />
                </Link>
              </li>
            </>
          )}
          {rendering_page_number.map((value, index) => (
            <li key={index} value={value} onClick={() => onChangePage(value)} className={value === current_page ? 'active' : ''}>
              <Link to='#'>{value}</Link>
            </li>
          ))}
          {current_page !== max_pages && (
            <>
              <li>
                <Link to='#' onClick={() => onChangePage(current_page + 1)}>
                  <img src={frontArrow} alt='다음 페이지로' />
                </Link>
              </li>
              <li>
                <Link to='#' onClick={onClickNext}>
                  <img src={frontArrow} alt='다음 페이지로' />
                  <img src={frontArrow} alt='다음 페이지로' />
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  )
}
```

```tsx
        // paper component 
const getPaperData = async () => {
    await API.paper
      .getPaper(searchPaper)
      .then((res) => {
        const data = res.data.data.result
        setPaperData(data)

        setCurrentPage(1) // 처음 보여줄 페이지
      })
      .catch(async (err) => {
        await errorHandler(err, getPaperData)
      })
}
        return 
                        ...
                      <tbody>
                    <PaperList post={currentPosts(paperData)} />
                  </tbody>
                </table>
              </div>
             <Pagination per_page={postsperPage.current}
                        total_page={paperData.length} // 가져온 데이터들의 총 길이 (개수)
                        onChangePage={setCurrentPage}
                        current_page={currentPage} />
          </div>
         ... 
```

## API 통신

API 는 따로 service 에 만들어서 관리  

```ts
export const paper = { // 함수 모듈화
  // 리스트 조회 및 검색
  async getPaper(request: GetSearchPaperResponseDataModel) {

    const config: AxiosRequestConfig = { // typescript는 타입선언 해줘야 한다.
      url: `${BASE_URL}/admin/setting/paper`, // 공통 URL 주소는 변수로
      method: 'GET',
      params: request,
      headers: {
        // header에 넣을 내용
      },
    }

    return await axios(config)
  },

```
받아올 데이타 모델 
```ts
export default interface GetPaperResponseDataModel {
  idx: number
  name: string
  gsm: number
  type_idx: number
  company_name: string
  paper_type: string
}
```

### 리스트에서 detail 페이지를 불러올 떄

경로 관리 페이지

```js
const PaperDetail = lazy(() => import('./page/setting/paper-detail'))

...

<Route path='/paper/detail/:idx' exact component={PaperDetail}/>

```
:idx에 따라 URL에 보여준다 

```tsx
      // list component
          <td>
            <Link to={`/paper/detail/${value.idx}`}>{value.name}</Link>
          </td>
```

url: .../detail/1 로 나타나기에 idx 를 가지고 와야한다.   
가지고 오는 방법은,

```tsx
// 컴포넌트에서 props: RouteComponentProps 받아온다면
const {history, location, match} = props

// useHistory 사용한다면
const history = useHistory()

// react-router 의 useRouteMatch 이용
const router = useRouteMatch()

 const getDetail = async () => {
    const params = router.params as { idx: string } // typescript의 타입 얼라이언스 이용하여 타입 선언

    await API.paper
      .getPaperDetail(params)
      .then((res) => {
        const data = res.data.data.detail
        setPaperData(data)
      })
      .catch(async (err) => {
        await errorHandler(err, getDetail)
      })


useEffect(() => {
  getDetail()
}, [])
```

api 

```ts
  putPaperFix(request: GetPaperTypeResponseDataModel, data: PostCreatePaperRequestDataModel) {

    const config: AxiosRequestConfig = {
      url: `${BASE_URL}/admin/setting/paper/${request.idx}`,
      method: 'PUT',
      data: data,
    }
    return axios(config)
  },
}
```