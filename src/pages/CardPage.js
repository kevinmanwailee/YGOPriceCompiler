import React, {useState, useEffect} from 'react';
import "./CardPage.css";
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Header from './header.js';
import { useLocation } from "react-router-dom";
import Button from '@mui/material/Button';

function CardPage(){
  const [cardData, setCardData] = useState([]);
  const [isMonster, setIsMonster] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [totalSets, setTotalSets] = useState([]);

  const [currPrice, setCurrPrice] = useState(0.0);
  const [currSet, setCurrSet] = useState("");
  const [currRarity, setCurrRarity] = useState("");
  const [currSetArray, setCurrSetArray] = useState([]);

  const [USDtoCAD, setUSDtoCAD] = useState(0.0);
  const [percentage, setPercentage] = useState(1);

  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];
  const URL= "https://db.ygoprodeck.com/api/v7/cardinfo.php?tcgplayer_data&name=" + lastSegment;
  const conversionURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/cad.json";

  const rarityDict ={
    "Super Rare": "SR",
    "Ultra Rare": "UR",
    "Secret Rare": "SCR",
    "Platinum Secret Rare": "PS",
    "Quarter Century Secret Rare": "QCSR",
    "Prismatic Ultimate Rare": "PUR",
    "Prismatic Collector's Rare": "PCR",
    "Prismatic Secret Rare": "PSCR",
    "Ultimate Rare": "UL",
    "Ghost Rare": "GH",
    "Gold Rare": "GR",
    "Premium Gold Rare": "PGR",
  };

  async function fetchData(){
    await axios.get(URL)
    .then((res) => {
      setCardData(res.data.data[0]);
      console.log(res.data.data[0].card_sets);
      setIsMonster(res.data.data[0].type.includes("Monster"))
      setIsReady(true);
      
      var tempTotalSets = res.data.data[0].card_sets;
      var resultSets = [];
      var tempSetArray = [];

      tempTotalSets.forEach((item)=> {
        // see if set already exists
        var exists = false;
        if(resultSets){
          resultSets.forEach((resultItem, index) => {
            if(resultItem[0].set_name === item.set_name){
              exists = true;
              resultItem.push(item);
            }
          })
        }
        if(!exists){
          tempSetArray.push(item);
          resultSets.push(tempSetArray);
        }
        tempSetArray=[];
      })
      
      setTotalSets(resultSets);
      setCurrSetArray(resultSets[0])
      setCurrPrice(res.data.data[0].card_sets[0].set_price)
      setCurrSet(res.data.data[0].card_sets[0].set_name)
      setCurrRarity(res.data.data[0].card_sets[0].set_rarity)

    })
    .catch((error) =>{
      console.log(error)
    })
  }

  async function getConversion(){
    await axios.get(conversionURL)
    .then((res) =>{
      setUSDtoCAD(res.data.cad.tusd)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  useEffect(() =>{
    fetchData()
    getConversion()
  },[])

  useEffect(() =>{
    console.log("CURRSETARRAY")
    console.log(currSetArray)
  },[currSetArray])
  
  function handleButtonPercentage(value){
    setPercentage(value/100);
  }
    
  function handleButtonSet(setJson){
    console.log(setJson)
    setCurrSetArray(setJson);
    setCurrSet(setJson[0].set_name)
    setCurrPrice(setJson[0].set_price)
    setCurrRarity(setJson[0].set_rarity)
  }

  function handleButtonSetRarity(selectedSet){
    setCurrRarity(selectedSet.set_rarity)
    setCurrPrice(selectedSet.set_price)
  }
    
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
        <Stack direction="row" spacing={5} sx={{
          marginTop:"20px", 
          padding:"30px", 
          paddingLeft: 20,
          paddingRight:20,
          flexFlow:"wrap"
        }}>
          <Stack sx={{ flex:1, alignItems:"center" }}>
            <img
              src={cardData.card_images[0].image_url}
              alt="img"
              style={{ maxWidth:"312px", objectFit:"contain" }}
            />
          </Stack>  
          <Stack sx={{ flex:2, minWidth:"312px" }}>
            <p className="title" style={{ margin:"0px", fontSize:"24px" }}>{cardData.name}</p>
            <p className="subtext" style={{ marginTop:"10px", marginBottom:"10px" }}>{currSet} • {currRarity}</p>
            <Stack
            direction="row"
            sx={{
              flexWrap: "wrap", // Ensures items wrap instead of overflowing
              gap: 2,
            }}
            > 
              {totalSets.map((item) =>(
                <Button 
                onClick={()=> handleButtonSet(item)}
                variant={item[0].set_name === currSet ? "contained" : "outlined"} 
                sx={{ width:"60px" }}>{(item[0].set_code).split("-")[0]}</Button>
              ))} 
            </Stack>
            <p className="subtext" style={{ marginTop:"20px", marginBottom:"10px" }}>Rarity</p>
            <Stack
            direction="row"
            sx={{
              flexWrap: "wrap", // Ensures items wrap instead of overflowing
              paddingBottom:"20px",
              gap: 2,
            }}
            > 
            {currSetArray.map((item) => (
              <Button
              onClick={() => handleButtonSetRarity(item)}
              variant={ item.set_rarity === currRarity ? "contained" : "outlined"}
              sx={{width:"80px"}}>
                {rarityDict[item.set_rarity]}
              </Button>
            ))}
            </Stack>
          </Stack>
          <Stack sx={{ flex:1, padding:"20px", border:"1px solid lightgrey", borderRadius:"5px" }}>
            <p className="subtext" style={{ paddingBottom:"10px" }}>{currRarity}</p>
            <p className="subtext" style={{ fontSize:"0.75rem" }}>Tcgplayer (USD)</p>
            <p className="title">${currPrice}</p>            
            <p className="subtext" style={{ marginTop:"10px", fontSize:"0.75rem" }}>CAD {percentage*100}%</p>
            <p className="title">${(currPrice / USDtoCAD * percentage).toFixed(2)}</p>
            <Stack direction="row" spacing={2} sx={{ paddingTop:"20px" }}>
              <Button sx={{ width:"10px" }} variant="outlined" onClick={() => handleButtonPercentage(75)}>
                75%
              </Button>
              <Button variant="outlined" onClick={() => handleButtonPercentage(80)}>
                80%
              </Button>
              <Button variant="outlined" onClick={() => handleButtonPercentage(85)}>
                85%
              </Button>
            </Stack> 
            <Stack direction="row" spacing={2} sx={{ paddingTop:"20px" }}>
              <Button variant="outlined" onClick={() => handleButtonPercentage(90)}>
                90%
              </Button>
              <Button variant="outlined" onClick={() => handleButtonPercentage(100)}>
                100%
              </Button>
            </Stack>
          </Stack>
        </Stack>
                  <Stack sx={{ marginLeft:"50px", maxWidth:"312px" }}>
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
    </div>
  );
}
export default CardPage;