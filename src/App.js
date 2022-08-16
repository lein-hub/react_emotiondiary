import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import New from "./pages/New.js";
import Edit from "./pages/Edit.js";
import Diary from "./pages/Diary.js";
import React, { useEffect, useReducer, useRef } from "react";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      // newState = [action.data, ...state];

      axios
        .post("http://localhost:5000/diary", action.data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      break;
    }
    case "REMOVE": {
      // newState = state.filter((e) => e.id !== action.targetId);
      axios
        .delete("http://localhost:5000/diary/" + action.targetId)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      break;
    }
    case "EDIT": {
      // newState = state.map((e) => {
      //   return e.id === action.data.id ? { ...action.data } : e;
      // });
      axios
        .put("http://localhost:5000/diary/" + action.targetId, action.data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      break;
    }
    default:
      return state;
  }

  return state;
  // localStorage.setItem("diary", JSON.stringify(newState));
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    // const localData = localStorage.getItem("diary");
    // axios
    //   .get("http://localhost:5000/diary")
    //   .then((res) => {
    //     dispatch({ type: "INIT", data: res.data });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // if (localData) {
    //   const diaryList = JSON.parse(localData).sort(
    //     (a, b) => parseInt(b.id) - parseInt(a.id)
    //   );
    //   if (diaryList.length > 0) {
    //     dataId.current = parseInt(diaryList[0].id) + 1;
    //     dispatch({ type: "INIT", data: diaryList });
    //   }
    // }
  }, []);

  const dataId = useRef(1);
  const onInit = (data) => {
    dispatch({ type: "INIT", data: data });
  };
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        // id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  const onRemove = (id) => {
    dispatch({
      type: "REMOVE",
      targetId: id,
    });
  };
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      targetId: targetId,
      data: {
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{ onInit, onCreate, onEdit, onRemove }}
      >
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
