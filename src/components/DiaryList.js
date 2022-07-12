import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";

const sortOptionList = [
  { value: "latest", text: "최신순" },
  { value: "oldest", text: "오래된순" },
];
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((e, idx) => (
        <option key={idx} value={e.value}>
          {e.text}
        </option>
      ))}
    </select>
  );
};

const filterOptionList = [
  { value: "all", text: "전체" },
  { value: "good", text: "좋은 감정만" },
  { value: "bad", text: "안 좋은 감정만" },
];

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    let newDiaryList = [...diaryList];
    if (filter === "good") {
      newDiaryList = newDiaryList.filter((e) => e.emotion >= 3);
    } else if (filter === "bad") {
      newDiaryList = newDiaryList.filter((e) => e.emotion < 3);
    }
    if (sortType === "latest") {
      newDiaryList.sort((a, b) => b.date - a.date);
    } else if (sortType === "oldest") {
      newDiaryList.sort((a, b) => a.date - b.date);
    }
    return newDiaryList;
  };
  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기 쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>
      {getProcessedDiaryList().map((e) => (
        <DiaryItem key={e.id} {...e} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
