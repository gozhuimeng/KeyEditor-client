"use client";
import { useState, useEffect } from "react";
import KeyBox from "@/components/KeyBox/KeyBox";
import "./page.css";

export default function Home() {
  const [keyMap, setKeyMap] = useState(null);

  const [keyLayout, setKeyLayout] = useState([
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
  ]);

  const [changeKey, setChangeKey] = useState(null);

  useEffect(() => {
    fetch(`http://${window.location.hostname}:8000/getMap`)
      .then((response) => response.json())
      .then((data) => setKeyMap(data))
      .catch((error) => {
        console.error("请求数据错误：", error);
        alert("请求数据错误");
      });
    fetch(`http://${window.location.hostname}:8000/getLayout`)
      .then((response) => response.json())
      .then((data) => setKeyLayout(data))
      .catch((error) => {
        console.error("请求数据错误：", error);
        alert("请求数据错误");
      });
  }, []);

  const changeKeyData = (event) => {
    const { name, value } = event.target;
    setKeyMap((prevData) => ({
      ...prevData,
      [changeKey]: {
        ...prevData[changeKey],
        [name]: value,
      },
    }));
  };

  const saveEdit = () => {
    fetch(`http://${window.location.hostname}:8000/pushMap`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key_map: keyMap }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error(error);
        alert("数据发送失败");
      });

    // 预留自定义布局接口
    // fetch(`http://${window.location.hostname}:8000/pushLayout`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ key_layout: keyLayout }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => {
    //     console.error(error);
    //     alert("数据发送失败");
    //   });
  };

  const endEdit = () => {
    fetch(`http://${window.location.hostname}:8000/endEdit`,{
        method: "GET"
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {/* 键盘区 */}
      <div className="keyboard">
        {keyMap ? (
          keyLayout.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.map((keyId) => (
                <KeyBox
                  key={keyId}
                  id={keyId}
                  keys={keyMap[keyId]}
                  keysid={keyId}
                  click_func={setChangeKey}
                />
              ))}
            </div>
          ))
        ) : (
          <div className="no-keymap">没有键位映射</div> // 添加一个备选样式
        )}
      </div>
      {/* 输入区 */}
      <div className="input-area">
        {/* 修改单键 */}
        <div className="selected-key">
          当前选中的是 {changeKey === null ? "" : keyMap[changeKey].body} 键
        </div>
        {/* 为修改布局预留 */}
        {/* <div className="input-row"> */}
        {/*   <label>按下输入内容:</label> */}
        {/*   <input */}
        {/*     name="body" */}
        {/*     value={(keyMap && keyMap[changeKey] && keyMap[changeKey]?.body) ?? ""} */}
        {/*     onChange={changeKeyData} */}
        {/*     className="input-field" */}
        {/*   /> */}
        {/* </div> */}
        {/* 输入框部分 */}
        <div className="input-row">
          <label htmlFor="up" className="input-label">
            上滑输入的内容:{" "}
          </label>
          <input
            name="up"
            value={(keyMap && keyMap[changeKey] && keyMap[changeKey]?.up) ?? ""}
            onChange={changeKeyData}
            className="input-field"
          />
        </div>

        <div className="input-row">
          <label htmlFor="left" className="input-label">
            左滑输入的内容:{" "}
          </label>
          <input
            name="left"
            value={
              (keyMap && keyMap[changeKey] && keyMap[changeKey]?.left) ?? ""
            }
            onChange={changeKeyData}
            className="input-field"
          />
        </div>

        <div className="input-row">
          <label htmlFor="right" className="input-label">
            右滑输入的内容:{" "}
          </label>
          <input
            name="right"
            value={
              (keyMap && keyMap[changeKey] && keyMap[changeKey]?.right) ?? ""
            }
            onChange={changeKeyData}
            className="input-field"
          />
        </div>

        <div className="input-row">
          <label htmlFor="down" className="input-label">
            下滑输入的内容:{" "}
          </label>
          <input
            name="down"
            value={
              (keyMap && keyMap[changeKey] && keyMap[changeKey]?.down) ?? ""
            }
            onChange={changeKeyData}
            className="input-field"
          />
        </div>
      </div>
      {/* 提交修改 */}
      <div className="button">
        <div className="submit-button">
          <button onClick={saveEdit}>保存修改</button>
        </div>
        <div className="submit-button">
          <button onClick={endEdit}>导出配置文件</button>
        </div>
      </div>
    </div>
  );
}
