
"use client"
import { Result } from "postcss";
import { Cat } from "./types/types";
import { useState } from "react";
import { Loader } from "semantic-ui-react";

export default function Home() {

  const [cat, setCat] = useState<Cat>({id: 0, url: "", width: 0, height: 0});
  const {id, url, width, height} = cat;
  const [loading, setLoading] = useState(false);

  const handleClick = async ()=> {
    setLoading(true);
    const catData: Cat = await fetchCatImage();
    setCat(catData);
    setLoading(false);

  }
  
  const fetchCatImage = async (): Promise<Cat> => {
    const res = await fetch('https://api.thecatapi.com/v1/images/search'
    );

    const result : Cat[] = await res.json();
    return result[0];
  }

  return (
    <main style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh"
    }}>

      <h1>猫画像アプリ</h1>
      {
        loading ? (
          <Loader active inline="centered" size="huge" />
        ) : (
          <img src={url} alt="" width="500px" height="500px"/>
        )
      }
          <button style={{marginTop: "18px"}} onClick={handleClick}>今日の猫さん</button>

    </main>
  );
}
