import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Header from "./header.js";
import { useParams, useNavigate } from "react-router-dom";

function App() {
  const { cardName, page } = useParams();

  const [maxPage, setMaxPage] = useState(0);
  const [cardData, setCardData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [hasError, setHasError] = useState(false);

  const [totalImageCount, setTotalImageCount] = useState(0);
  const [imageCount, setImageCount] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);

  const navigate = useNavigate();

  const URL =
    "https://db.ygoprodeck.com/api/v7/cardinfo.php?tcgplayer_data&fname=";

  // prev and next page buttons
  function PageNavigation({ page, maxPage }) {
    const [isPrevPageDisabled, setisPrevPageDisabled] = useState(false);
    const [isNextPageDisabled, setIsNextPageDisabled] = useState(false);

    function handleClickPrevPage() {
      var temp = parseInt(page) - 1;
      navigate(`./page/${temp}`);
    }
    function handleClickNextPage() {
      var temp = parseInt(page) + 1;
      navigate(`./page/${temp}`);
    }

    useEffect(() => {
      setisPrevPageDisabled(page === "1");
      setIsNextPageDisabled(maxPage === parseInt(page));
    }, [page]);

    return (
      <Stack sx={{ flexDirection: "row" }}>
        <IconButton
          disabled={isPrevPageDisabled}
          onClick={() => handleClickPrevPage()}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton
          disabled={isNextPageDisabled}
          onClick={() => handleClickNextPage()}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Stack>
    );
  }

  async function fetchData() {
    setHasError(false);
    console.log(URL + searchText);
    await axios
      .get(URL + searchText)
      .then((res) => {
        setCardData(res.data.data);
        setMaxPage(Math.ceil(res.data.data.length / 40));
        setTotalImageCount(
          res.data.data.slice((page - 1) * 40, page * 40).length
        );
        setAllLoaded(false);
        setImageCount(0);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setHasError(true);
      });
  }

  // Debugging
  useEffect(() => {
    console.log(cardData);
    console.log("total image count:", totalImageCount);
  }, [cardData]);

  useEffect(() => {
    if (searchText) {
      fetchData();
    }
  }, [searchText]);

  useEffect(() => {
    setSearchText(cardName);
  }, [cardName]);

  useEffect(() => {
    setAllLoaded(false);
    setImageCount(0);
    setTotalImageCount(cardData.slice((page - 1) * 40, page * 40).length);
  }, [page]);

  useEffect(() => {
    console.log("Images loaded: ", imageCount, " / ", totalImageCount);
    if (totalImageCount !== 0) {
      if (imageCount >= totalImageCount) {
        setAllLoaded(true);
        console.log("All Loaded");
      }
    }
  }, [imageCount]);

  if (hasError) {
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
        <Header />
        <Stack>
          <p>{cardName} not found</p>
        </Stack>
      </div>
    );
  }

  function handleClick(myString) {
    navigate(`/card/${encodeURIComponent(myString)}`);
  }

  function handleImageLoad() {
    setImageCount((imageCount) => imageCount + 1);
  }

  return (
    <>
      {!allLoaded && <p>Loading...</p>}
      {cardData.slice((page - 1) * 40, page * 40).map((item) => (
        <img
          key={item.name}
          src={item.card_images[0].image_url_small}
          alt={`preload-${item.name}`}
          onLoad={handleImageLoad}
          style={{ display: "none" }} // hide the preloading images
        />
      ))}

      {allLoaded && (
        <div
          className="no-caret"
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Header />

          <Stack sx={{ alignItems: "center", paddingTop: "70px" }}>
            <p style={{ marginBottom: "2px", fontSize: "15px", color: "gray" }}>
              Page {page} out of {maxPage}
            </p>
            <p style={{ marginTop: "0px", fontSize: "15px", color: "gray" }}>
              {cardData.length} search results for "{searchText}"
            </p>
          </Stack>

          <PageNavigation page={page} maxPage={maxPage} />
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
            {cardData.slice((page - 1) * 40, page * 40).map((item) => (
              <Stack
                key={item.name}
                onClick={() => handleClick(item.name)}
                sx={{
                  cursor: "pointer",
                  padding: "16px",
                  maxWidth: "156px",
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "lightgrey",
                  },
                }}
              >
                <img
                  src={item.card_images[0].image_url_small}
                  alt="pic"
                  style={{ width: "100%" }}
                />
                <p style={{ fontSize: "12px" }}>{item.name}</p>
              </Stack>
            ))}
          </Stack>
          <PageNavigation page={page} maxPage={maxPage} />
        </div>
      )}
    </>
  );
}

export default App;
