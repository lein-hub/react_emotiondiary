import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_description: "행복함",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_description: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_description: "보통",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_description: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_description: "끔찍함",
  },
];

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("");
  const contentRef = useRef();
  const { onCreate } = useContext(DiaryDispatchContext);
  const handleClickEmotion = (emotion_id) => {
    setEmotion(emotion_id);
  };
  const handleClickSave = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    onCreate(date, content, emotion);
    navigate("/", { replace: true });
  };

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={"새 일기 쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가가"} onClick={() => navigate(-1)} />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 기분은 어떠세요?</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((e) => (
              <EmotionItem
                key={e.emotion_id}
                {...e}
                onClick={handleClickEmotion}
                isSelected={emotion === e.emotion_id}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기는 무엇인가요?</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어떠셨나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성 완료"}
              type={"positive"}
              onClick={handleClickSave}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
