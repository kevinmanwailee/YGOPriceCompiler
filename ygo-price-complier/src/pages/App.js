import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Header from './header.js';

function App() {
  const [cardData, setCardData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [showSearchText, setShowSearchText] = useState(false);

  const URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?tcgplayer_data&fname=';
  async function fetchData(){
    await axios.get(URL+searchText)
      .then((res) => {
        setCardData(res.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.error)
      })
  }

  useEffect(() => {
    console.log(cardData);
  }, [cardData])

  useEffect(() => {
    if(searchText){
      fetchData()
    }
  }, [searchText])
  
  async function handleSubmit(event) {
    if (event.key === 'Enter'){
      setSearchText(event.target.value);
      console.log("Textfield Value:", searchText);
      setShowSearchText(true);
      event.preventDefault(); // Prevents form submission
    }
  }

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
      <Header
        handleSubmit={handleSubmit}
      />
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
        {cardData.slice(0, 40).map((item) => (
          <Stack sx={{ padding: "16px", width: "156px" }}>
            <img
              src={item.card_images[0].image_url_small}
              style={{ width: "100%" }}
            />
            <p style={{ fontSize: "10px" }}>{item.name}</p>
          </Stack>
        ))}
      </Stack>
    </div>
  );
}

export default App;

