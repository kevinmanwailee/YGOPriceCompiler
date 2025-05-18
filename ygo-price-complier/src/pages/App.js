import React, {useState, useEffect} from 'react';
import './App.css'
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Header from './header.js';
import { useParams, useNavigate } from "react-router-dom";

function App() {
  const { cardName, page } = useParams();
  const [maxPage, setMaxPage] = useState(0);
  const [cardData, setCardData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showSearchText, setShowSearchText] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?tcgplayer_data&fname=';
  async function fetchData(){
    setHasError(false);
    await axios.get(URL+searchText)
      .then((res) => {
        setCardData(res.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.error)
        setHasError(true);
      })

    setIsReady(true);
  }

  useEffect(() => {
    console.log(cardData);
    setMaxPage(Math.ceil(cardData.length/40));
    console.log("Max Pages: ", maxPage)
  }, [cardData])

  useEffect(()=>{
    if(searchText){
      setShowSearchText(true);
      fetchData();
    }
  },[searchText])

  useEffect(() => {
    setSearchText(cardName);
    setIsReady(false);
  },[cardName])

  if(!isReady) {
    return <div>Loading...</div>;
  }

  if(hasError){
    return(
      <div
      className="App"
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
      >
        <Header/>
        <Stack >
          <p>{cardName} not found</p>
        </Stack>
      </div>
    )
  }

  const handleClick = (myString) =>{
    navigate(`/card/${encodeURIComponent(myString)}`);
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header/>
      {showSearchText ? <p style={{ paddingTop: 2, fontSize:"15px", color:"gray" }}>{cardData.length} search results for "{searchText}"</p> : ""}
      <Stack
        flex={1}
        sx={{
          flexDirection: "row",
          flexWrap: "wrap", // Ensures items wrap instead of overflowing
          gap: 2,
          width: "80%",
          justifyContent: "center",
        }}
      >
        {cardData.slice((page-1)*40, page*40).map((item) => (
          <Stack 
          onClick={() => handleClick(item.name)}
          sx={{ 
            cursor:'pointer',
            padding: "16px",
            maxWidth: "156px",
            borderRadius: 1,
            '&:hover': {
              backgroundColor: 'lightgrey',
              }
            }}>
            <img
              src={item.card_images[0].image_url_small}
              alt="pic"
              style={{ width: "100%" }}
            />
            <p style={{ fontSize: "12px" }}>{item.name}</p>
          </Stack>
        ))}
      </Stack>
    </div>
  );
}

export default App;

