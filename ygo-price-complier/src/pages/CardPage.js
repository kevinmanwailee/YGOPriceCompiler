import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Header from './header.js';
import { useLocation } from "react-router-dom";

function CardPage(){
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];

  async function fetchData(){
    await axios.get(URL)
  }
  return(
    <div
    className="CardPage"
    style={{
      display: "flex",
      width: "100%",
      flexDirection: "column",
      alignItems: "center",
    }}>   
      <Header/>   
      <p>Received: {lastSegment}</p>
    </div>
  );
}
export default CardPage;