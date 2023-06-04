import { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";
import axios from "axios";

function App() {
  let [data, setData] = useState([]);
  let [text, setText] = useState("");
  let [err, setErr] = useState("");
  useEffect(() => {
    async function getList() {
      let data = await axios.get("http://localhost:4000/todo");
      setData(data.data.data);
    }
    getList();
  }, []);
  let addData = async () => {
    if (text !== "") {
      setErr("");
      let added = await axios.post("http://localhost:4000/todo/add", {
        text: text,
      });
      setData([...data, { _id: added.data._id, todo: text, done: false }]);
      setText("");
    } else {
      setErr("You Must Write Your Todo");
    }
  };
  let delData = async (e) => {
    let deleted = data.filter((ele) => {
      return String(ele._id) !== e.target.id;
    });
    setData(deleted);
    await axios.get("http://localhost:4000/todo/del", {
      params: {
        id: e.target.id,
      },
    });
  };
  let done = async (e) => {
    let doneData = data.map((ele) => {
      if (String(ele._id) === e.target.id) {
        if (ele.done === true) {
          return { ...ele, done: false };
        } else {
          return { ...ele, done: true };
        }
      } else {
        if (ele.done === true) {
          return { ...ele, done: true };
        } else {
          return { ...ele, done: false };
        }
      }
    });
    setData(doneData);
    await axios.post("http://localhost:4000/todo/done", {
      id: e.target.id,
    });
  };
  return (
    <div className="App">
      <div className="todo">
        <div className="todo-container">
          {err ? <div className="alert">{err}</div> : ""}
          <div className="todo-heading">
            <h2>Todo App</h2>
          </div>
          <div className="todo-input">
            <Input
              type={"text"}
              theClass={"input"}
              placeholder={"Add Your Todo"}
              text={(e) => setText(e.target.value)}
              data={text}
            />
            <Button text={"Add Todo"} theClass={"add-todo"} click={addData} />
          </div>
          <div className="todo-list">
            {data.map((ele, i) => {
              return (
                <div className="list" key={i}>
                  <p className={`${ele.done ? "splash" : ""}`}>{ele.todo}</p>
                  <Button
                    text={"Delete"}
                    theClass={"btn del"}
                    click={delData}
                    id={ele._id}
                  />
                  <Button
                    text={"Done"}
                    theClass={"btn done"}
                    id={ele._id}
                    click={done}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
