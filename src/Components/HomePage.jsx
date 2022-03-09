import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";

const URL =
  "https://api.weatherapi.com/v1/current.json?key=5777c1b70f2f47cf8f4150736220802&q=London&aqi=no";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [celcious, setCelcious] = useState(null);
  const [toDos, setToDos] = useState([]);

  useEffect(() => {
    const getCelcious = async () => {
      try {
        const results = await axios.get(URL);
        setCelcious(results.data?.current?.temp_c || "could not load");
      } catch (e) {
        console.log("failrd request", e);
      }
    };

    getCelcious();
  }, []);

  const sumbitHandler = (e) => {
    e.preventDefault();
    // do not add empty values or numbers
    if (inputValue !== "") {
      console.log("inputValue", inputValue);

      const updatedList = [...toDos, { item: inputValue, checked: false }];

      setToDos(updatedList);
      setInputValue("");
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleDelete = async (e, i) => {
    const updatedList = [...toDos];
    updatedList.splice(i, 1);

    setToDos(updatedList);
  };

  const handleItemToggle = async (e, i) => {
    const checked = e.target.checked || !toDos[i].checked;
    // console.log("item clicked", e);
    const updatedList = [...toDos];
    updatedList[i] = { item: updatedList[i].item, checked };

    setToDos(updatedList);
  };

  return (
    <div>
      <h1> Today's Agenda</h1>
      <p
        style={{
          borderBottom: "1px solid grey",
          textAlign: "center",
          justifyContent: "center",
          marginLeft: "34%",
          marginRight: "34%",
        }}
      ></p>
      <h3>Today's weather: {celcious || "?"}°C</h3>

      <div id="listContainer">
        <div id="checklist">
          {toDos.map((e, i) => {
            return (
              <Fragment key={i}>
                <input
                  type="checkbox"
                  checked={e.checked}
                  onChange={(e) => handleItemToggle(e, i)}
                ></input>
                <label>
                  <span>
                    <span onClick={(e) => handleItemToggle(e, i)}>
                      {e.item}
                    </span>{" "}
                  </span>
                </label>
                <span style={{ display: "grid" }}>
                  <DeleteOutlined
                    onClick={(e) => handleDelete(e, i)}
                  ></DeleteOutlined>
                </span>
              </Fragment>
            );
          })}
        </div>

        <form onSubmit={sumbitHandler}>
          <input
            id="toDoInput"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="learn React"
          ></input>
          <button onClick={sumbitHandler}>Add task</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
