import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { getStringDate } from "./../utils/date";
import { emotionList } from "./../utils/emotion";

function Diary() {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length > 0) {
      const targetDiary = diaryList.find(
        (e) => parseInt(e.id) === parseInt(id)
      );
      if (!targetDiary) {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      } else {
        setData(targetDiary);
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩중입니다....</div>;
  } else {
    const curEmotionData = emotionList.find(
      (e) => e.emotion_id === data.emotion
    );
    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={<MyButton text={"<"} onClick={() => navigate("/")} />}
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img
                src={curEmotionData.emotion_img}
                alt={curEmotionData.emotion_description}
              />
              <div className="emotion_description">
                {curEmotionData.emotion_description}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
}

export default Diary;
