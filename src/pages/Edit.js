import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

function Edit() {
  const [originData, setOriginData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerText = `감정 일기장 - ${id}번 일기 수정`;
  }, [id]);

  useEffect(() => {
    if (diaryList.length > 0) {
      const diary = diaryList.find((e) => parseInt(e.id) === parseInt(id));
      // console.log(diary);
      if (!diary) {
        navigate("/", { replace: true });
      } else {
        setOriginData(diary);
      }
    }
  }, [id, diaryList, navigate]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
}

export default Edit;
