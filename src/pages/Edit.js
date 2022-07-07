import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

function Edit() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get('id');
  const mode = searchParams.get('mode');

  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 글 수정 페이지 입니다.</p>
      <button onClick={()=>setSearchParams({who: "winterlood"})}>QS 바꾸기</button>
      <button onClick={()=>navigate("/")}>홈으로</button>
      <button onClick={()=>navigate(-1)}>뒤로가기</button>
    </div>
  )
}

export default Edit