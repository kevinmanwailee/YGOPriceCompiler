import React, {useState, useEffect} from 'react';
import "./CardPage.css";
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Header from './header.js';
import { useLocation } from "react-router-dom";

function CardPage(){
  const [cardData, setCardData] = useState([]);
  const [isMonster, setIsMonster] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];
  const URL= "https://db.ygoprodeck.com/api/v7/cardinfo.php?tcgplayer_data&name=" + lastSegment

  async function fetchData(){
    await axios.get(URL)
      .then((res) => {
        setCardData(res.data.data[0]);
        console.log(res.data.data[0]);
        setIsMonster(res.data.data[0].type.includes("Monster"))
        setIsReady(true);
      })
      .catch((error) =>{
        console.log(error)
      })
    }
    
    useEffect(() =>{
      fetchData()
    },[])
    
    useEffect(() => {
  }, [cardData])

  if(!isReady) {
    return <div>Loading...</div>;
  }

  return(
    <div
    className="no-caret"
    style={{
      display: "flex",
      width: "100%",
      flexDirection: "column",
      alignItems: "center",
    }}>   
      <Header/>   
      <Stack>
        <Stack sx={{
          marginTop:"20px", 
          padding:"30px", 
          flexDirection:"row", 
          }}>
          <img
            src={cardData.card_images[0].image_url}
            alt="img"
            style={{ maxWidth:"234px", objectFit:"contain" }}
          />
          <Stack sx={{ marginLeft:"50px", maxWidth:"312px" }}>
            <p className="title" style={{ margin:"0px", fontSize:"24px" }}>{cardData.name}</p>
            <p className="title">Description</p>
            <p className="para">{cardData.desc}</p>

            {(isMonster && !cardData.linkval) && <p className="title">Level/Rank</p>}
            {(isMonster && !cardData.linkval) && <p className="para">{cardData.level}</p>}
            {(isMonster && cardData.linkval) && <p className="title">Link</p>}
            {(isMonster && cardData.linkval) && <p className="para">{cardData.linkval}</p>}

            <p className="title">Card Type</p>
            <p className="para">{cardData.type} / {cardData.race}</p>
            {isMonster && 
              <p className="para" style={{ marginTop:"5px" }}>
                <strong>ATK/ </strong>{cardData.atk} <strong> 
                {!cardData.linkval ? "DEF/ ": ""}</strong>
                {!cardData.linkval ? cardData.def : ""}
              </p>}
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}
export default CardPage;