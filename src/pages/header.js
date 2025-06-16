import React, { forwardRef, useState } from "react";
import "./header.css";
import CartDropdown from "./CartDropdown.js";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  TextField,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header({ inputRef, justFocused }) {
  const [tempValue, setTempValue] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    if (event.key === "Enter") {
      navigate("/search/" + tempValue + "/page/1");
      event.preventDefault(); // Prevents form submission
    }
  }

  function handleClickHome() {
    navigate("/");
  }

  return (
    <Stack
      style={{
        width: "100%",
        overflow: "visible",
        position: "fixed",
        zIndex: "9999",
      }}
    >
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
                  inputRef={inputRef}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "5px",
                    caretColor: "grey",
                    boxShadow: justFocused
                      ? "0 0 10px 5px rgba(255, 255, 0, 0.9)"
                      : "none",
                    transition: "all 0.3s ease-in-out",
                  }}
                />
              </div>
              <div
                style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
              >
                <CartDropdown />
              </div>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
    </Stack>
  );
}
