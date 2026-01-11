"use client";
import "./KeyBox.css";

export default function KeyBox({ keys, keysid, click_func }) {
  return (
    <div className={"KeyBox"} onClick={() => click_func(keysid)}>
      <div className={"Row"}>
        <div className={"up symbol"}>{keys.up}</div>
      </div>
      <div className={"Row"}>
        <div className={"left symbol"}>{keys.left}</div>
        <div className={"body"}>{keys.body}</div>
        <div className={"tight symbol"}>{keys.right}</div>
      </div>
      <div className={"Row"}>
        <div className={"down symbol"}>{keys.down}</div>
      </div>
    </div>
  );
}
