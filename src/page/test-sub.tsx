import React, { SetStateAction } from 'react'

interface TestSubModel {
  is_show: React.Dispatch<SetStateAction<boolean>>
  show: boolean
}
const TestSub = (props: TestSubModel) => {
  const { is_show, show } = props
  return (
    <>
      <h2 onClick={() => is_show(!show)}>클릭 시 State 변경 됨</h2>
    </>
  )
}

export default TestSub
