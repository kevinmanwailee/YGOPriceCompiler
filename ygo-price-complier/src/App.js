import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function App() {
  const [cardData, setCardData] = useState([]);
  const [text, setText] = useState('');

  const URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?tcgplayer_data&fname=';
  async function fetchData(){
    await axios.get(URL+text)
      .then((res) => {
        setCardData(res.data);
      })
      .catch((error) => {
        console.log(error.response.data.error)
      })
  }
  
  useEffect(() => {
    console.log(cardData)
  },[cardData])

  const handleChange = (event) => {
    setText(event.target.value);
  }
  
  const handleSubmit =(event) => {
    if (event.key === 'Enter'){
      console.log("Textfield Value:", text);
      fetchData()
      event.preventDefault(); // Prevents form submission
    }
  }

  return (
    <div className="App">
      <Stack sx={{alignItems:'center', justifyContent:'center', minHeight:'100vh'}}>
        <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '30ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          lable="Card name"
          variant="outlined"
          value={text}
          onChange={handleChange}
          onKeyDown={handleSubmit}
          />
        </Box>
      </Stack>
    </div>
  );
}

export default App;

