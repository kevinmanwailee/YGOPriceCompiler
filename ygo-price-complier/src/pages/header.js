import * as React from "react";
import './header.css';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useState} from 'react';
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const [tempValue, setTempValue] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    if (event.key === 'Enter'){
      console.log("Search Value: ", tempValue);
      
      navigate("/search/"+tempValue+"/page/1");
      event.preventDefault(); // Prevents form submission
    }
  }

  function handleClickHome(){
    navigate("/");
  }

  return (
    <Stack style={{ width: "100%" }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Stack sx={{ flexDirection: "row", width: "100%" }}>
              <div style={{ flex: 1 }}>
                <Typography onClick={()=> handleClickHome()}className="no-caret" variant="h6" style={{ cursor:"pointer", width:"150px" }}>YGO-Converter</Typography>
              </div>
              <div style={{ flex: 1 }}>
                <TextField
                  placeholder="Search"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  onKeyDown={handleSubmit}	
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "5px",
                    caretColor:"grey",
                  }}
                />
              </div>
              <div
                style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
              >
                <IconButton className="no-caret" color="inherit">
                  <ShoppingCartIcon />
                </IconButton>
              </div>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
    </Stack>
  );
}
