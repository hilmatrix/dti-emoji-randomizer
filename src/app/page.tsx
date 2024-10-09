"use client"
import axios from 'axios';
import { useState } from "react";

interface HtmlCode {
  htmlCode : string[];
}

export default function Home() {
  const [emoji, setEmoji] = useState("&#128144;");
  const [clicked, setClicked] = useState(false);

  const decodeHtmlEntity = (html : string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const fetchEmoji = async () => {
    if (!clicked) {
      try {
        const response = await axios.get<HtmlCode>("https://emojihub-1001447344924.asia-southeast2.run.app/api/random")
        const data = await response.data.htmlCode[0];
        setEmoji(decodeHtmlEntity(data));
      } catch (error) {
        alert(error)
      }

      setClicked(true)
      setTimeout(() => {
        setClicked(false)
      }, 1000)
    }
  } 

  return (
    <main className="p-4 h-screen text-base bg-[#FAF4E1]">
        <div className="m-4 h-[90vh] bg-[#F8DD84] flex flex-col relative justify-center items-center">
        <div className="w-[30%]  h-[30%] absolute z-10">
          <button onClick={fetchEmoji} className="w-[100%] h-[100%]"></button>
        </div>
          <div className="w-[100%] text-[40px] absolute h-[40%] top-[10%] text-center">
            <h1 className="m-5">What&apos;s your</h1>
            <h1>emoji today ?</h1>
          </div>
          <div className="w-[100%] absolute top-[35%] text-center">
          <p>Click it !</p>
          </div>
          <div className="w-[100%] absolute top-[50%] text-center">
            <span className="text-[20vh]">{decodeHtmlEntity(emoji)}</span>
          </div>
          <div className="absolute w-[100%] text-center bottom-[10%]">
            <p>You&apos;re sad and you know it.</p>
            <p>just give up, don&apos;t try.</p>
          </div>
        </div>
    </main>
  );
}
