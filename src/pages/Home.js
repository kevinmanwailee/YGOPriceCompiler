import Header from "./header.js";
import { useEffect } from 'react';
import { Stack } from "@mui/material";
import "./Home.css"; 

function Home() {
  useEffect(() => {
    document.title = "Home | YGO-Converter"
  },[])

  return (
    <>
      <Header />
      <Stack className="no-caret" direction="column" sx={{ alignItems:"center", padding:"80px" }}>
        <h2 style={{ color:"grey" }}>Start by searching a card in the search bar.</h2>
        <h2 style={{ color:"grey" }}>Eg. "Dark Magician"</h2>
        <h4 style={{ color:"lightGrey" }}>Note: Price data is cached by YGOProDeck, therefore is not live from TCGPlayer</h4>

      </Stack>
    </>
  );
}
export default Home;
