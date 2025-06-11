import * as React from "react";
import { useCart } from "../context/CartContext.js";
import "./header.css";
import CartDropdown from "./CartDropdown.js";
import { AppBar, Box, Toolbar, Typography, TextField, Stack} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  // TODO: add remove function (removeFromCart)
  const { cart } = useCart();
  const [cartQuantity, setCartQuantity] = useState(0);
  const [tempValue, setTempValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setCartQuantity(cart.length)
  },[cart])

  async function handleSubmit(event) {
    if (event.key === "Enter") {
      console.log("Search Value: ", tempValue);

      navigate("/search/" + tempValue + "/page/1");
      event.preventDefault(); // Prevents form submission
    }
  }

  function handleClickHome() {
    navigate("/");
  }

  return (
    <Stack style={{ width: "100%", overflow:"visible", position: "fixed", zIndex: "9999" }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Stack sx={{ flexDirection: "row", width: "100%" }}>
              <div style={{ flex: 1 }}>
                <Typography
                  onClick={() => handleClickHome()}
                  className="no-caret"
                  variant="h6"
                  style={{ cursor: "pointer", width: "150px" }}
                >
                  YGO-Converter
                </Typography>
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
                    caretColor: "grey",
                  }}
                />
              </div>
              <div
                style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
              >
                <CartDropdown/>
              </div>
            </Stack>  
          </Toolbar>
        </AppBar>
      </Box>
    </Stack>
  );
}
