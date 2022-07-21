import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";
import { getStringDate } from "../utils/date";
import { emotionList } from "../utils/emotion";

const DiaryEditor = ({ isEdit, originData }) => {
  useEffect(() => {
    if (isEdit) {
      setDate(new Date(parseInt(originData.date)));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("");
  const contentRef = useRef();
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
  const handleClickEmotion = useCallback((emotion_id) => {
    setEmotion(emotion_id);
  }, []);
  const handleClickSave = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "일기를 저장하시겠습니까?"
      )
    ) {
      if (isEdit) {
        onEdit(originData.id, date, content, emotion);
      } else {
        onCreate(date, content, emotion);
      }
    }
    navigate("/", { replace: true });
  };
  const handleClickRemove = () => {
    if (window.confirm("일기를 삭제하시겠습니까?")) {
      onRemove(originData.id);
    }
    navigate("/", { replace: true });
  };
  const handleClickDate = (selectedDate) => {
    const newDate = new Date(selectedDate);
    newDate.setHours(date.getHours());
    newDate.setMinutes(date.getMinutes());
    newDate.setSeconds(date.getSeconds());
    newDate.setMilliseconds(date.getMilliseconds());
    setDate(newDate);
  };
  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기 쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가가"} onClick={() => navigate(-1)} />
        }
        rightChild={
          isEdit && (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handleClickRemove}
            />
          )
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              disabled={isEdit}
              value={getStringDate(date)}
              onChange={(e) => handleClickDate(e.target.value)}
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
