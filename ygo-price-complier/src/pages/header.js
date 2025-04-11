import * as React from "react";
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

  return (
    <Stack style={{ width: "100%" }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Stack sx={{ flexDirection: "row", width: "100%" }}>
              <div style={{ flex: 1 }}>
                <Typography variant="h6">YGO-Converter</Typography>
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
                  }}
                />
              </div>
              <div
                style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
              >
                <IconButton color="inherit">
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
