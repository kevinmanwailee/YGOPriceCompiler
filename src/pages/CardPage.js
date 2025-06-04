import React, { useState, useEffect } from "react";
import "./CardPage.css";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Header from "./header.js";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";

function CardPage() {
  const [cardData, setCardData] = useState([]);
  const [isMonster, setIsMonster] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [totalSets, setTotalSets] = useState([]);

  const [currPrice, setCurrPrice] = useState(0.0);
  const [currSet, setCurrSet] = useState("");
  const [currRarity, setCurrRarity] = useState("");
  const [currSetArray, setCurrSetArray] = useState([]);

  const [USDtoCAD, setUSDtoCAD] = useState(0.0);
  const [percentage, setPercentage] = useState(1);

  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];
  const URL =
    "https://db.ygoprodeck.com/api/v7/cardinfo.php?tcgplayer_data&name=" +
    lastSegment;
  const conversionURL =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/cad.json";

  const rarityDict = {
    "Super Rare": ["SR", "#6AA1CF"],
    "Ultra Rare": ["UR", "#CFA15E"],
    "Secret Rare": ["SCR", "#E86D6D"],
    "Platinum Secret Rare": ["PS", "#24BEE8"],
    "Platinum Rare": ["PL", "#24BEE8"],
    "Quarter Century Secret Rare": ["QCSR", "#E86D6D"],
    "Prismatic Ultimate Rare": ["PUR", "#D87CE6"],
    "Ultimate Rare": ["UL", "#D87CE6"],
    "Prismatic Collector's Rare": ["PCR", "#D8B13E"],
    "Collector's Rare": ["CR", "#D8B13E"],
    "Prismatic Secret Rare": ["PSCR", "#E86D6D"],
    "Ghost Rare": ["GH", "#779AAD"],
    "Gold Rare": ["GR", "#ADAE29"],
    "Premium Gold Rare": ["PGR", "#ADAE29"],
    Common: ["C", "#9C9C9C"],
    Rare: ["R", "#9C9C9C"],
    "Parallel Rare": ["PR", "#9C9C9C"],
    Promo: ["PROMO", "#9C9C9C"],
    "Ultra Pharaoh’s Rare": ["UPHR", "#CFA15E"],
    "Secret Pharaoh’s Rare": ["SCRPH", "#E86D6D"],
    "Duel Terminal Parallel Common": ["DTC", "#9C9C9C"],
    "Duel Terminal Rare Parallel Rare": ["DTR", "#9C9C9C"],
    "Duel Terminal Super Parallel Rare": ["DTSR", "#6AA1CF"],
    "Duel Terminal Ultra Rare Parallel Rare": ["DTUR", "#CFA15E"],
    "Duel Terminal Secret Rare Parallel Rare": ["DTSCR", "#E86D6D"],
  };

  const percentages = [70, 80, 85, 90, 100];

  async function fetchData() {
    await axios
      .get(URL)
      .then((res) => {
        setCardData(res.data.data[0]);
        console.log("CardData: ", res.data.data[0]);
        setIsMonster(res.data.data[0].type.includes("Monster"));

        var tempTotalSets = res.data.data[0].card_sets;
        var resultSets = [];
        var tempSetArray = [];

        tempTotalSets.forEach((item) => {
          // see if set already exists
          var exists = false;
          if (resultSets) {
            resultSets.forEach((resultItem, index) => {
              if (resultItem[0].set_name === item.set_name) {
                exists = true;
                resultItem.push(item);
              }
            });
          }
          if (!exists) {
            tempSetArray.push(item);
            resultSets.push(tempSetArray);
          }
          tempSetArray = [];
        });

        setTotalSets(resultSets);
        setCurrSetArray(resultSets[0]);
        setCurrPrice(res.data.data[0].card_sets[0].set_price);
        setCurrSet(res.data.data[0].card_sets[0].set_name);
        setCurrRarity(res.data.data[0].card_sets[0].set_rarity);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getConversion() {
    await axios
      .get(conversionURL)
      .then((res) => {
        setUSDtoCAD(res.data.cad.tusd);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
    getConversion();
  }, []);

  useEffect(() => {
    console.log("CURRSETARRAY", currSetArray);
  }, [currSetArray]);

  function handleButtonPercentage(value) {
    setPercentage(value / 100);
  }

  function handleButtonSet(setJson) {
    console.log("setJson: ", setJson);
    setCurrSetArray(setJson);
    setCurrSet(setJson[0].set_name);
    setCurrPrice(setJson[0].set_price);
    setCurrRarity(setJson[0].set_rarity);
  }

  function handleButtonSetRarity(selectedSet) {
    setCurrRarity(selectedSet.set_rarity);
    setCurrPrice(selectedSet.set_price);
  }

  function handleImageLoad() {
    setIsReady(true);
  }

  return (
    <>
      {!isReady && <p>Loading...</p>}
      {cardData?.card_images?.[0]?.image_url && (
        <img
          key={cardData.name}
          alt={`preload-${cardData.name}`}
          onLoad={handleImageLoad}
          src={cardData.card_images[0].image_url}
          style={{ display: "none" }} // hide the preloading images
        />
      )}
      {isReady && (
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
          {/* Title Stack */}
          <Stack className="page-title">
            <p className="title" style={{ margin: "0px", fontSize: "24px" }}>
              {cardData.name}
            </p>
            <p
              className="subtext"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              {currSet} • {currRarity}
            </p>
          </Stack>
          <Stack className="container" direction="row">
            {/* Picture Stack */}
            <Stack
              flex="0 0 100px"
              sx={{
                padding: "30px",
                maxWidth: "312px",
                alignContent: "center",
              }}
            >
              <img
                key={cardData.name}
                src={cardData.card_images[0].image_url}
                alt="img"
                style={{
                  minWidth: "256px",
                  height: "auto",
                }}
              />
            </Stack>

            {/* Description / Price Stack */}
            <Stack
              className="description-price"
              direction="row"
              flexWrap="wrap-reverse"
              justifyContent="center"
              sx={{ paddingTop: "30px" }}
            >
              {/* Description/Set Options stack */}
              <Stack sx={{ margin: "20px" }}>
                {/* Description */}
                <Stack
                  sx={{
                    paddingTop: "0px",
                    width: "412px",
                  }}
                >
                  <p
                    className="subtext"
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                  >
                    Set
                  </p>
                  {/* Set Button Stack */}
                  <Stack
                    direction="row"
                    sx={{
                      flexWrap: "wrap", // Ensures items wrap instead of overflowing
                      gap: 2,
                    }}
                  >
                    {totalSets.map((item) => (
                      <Button
                        key={item[0].set_code}
                        onClick={() => handleButtonSet(item)}
                        variant={
                          item[0].set_name === currSet
                            ? "contained"
                            : "outlined"
                        }
                        sx={{ width: "60px" }}
                      >
                        {item[0].set_code.split("-")[0]}
                      </Button>
                    ))}
                  </Stack>
                  <p
                    className="subtext"
                    style={{ marginTop: "20px", marginBottom: "10px" }}
                  >
                    Rarity
                  </p>
                  {/* Rarity Stack */}
                  <Stack
                    direction="row"
                    sx={{
                      flexWrap: "wrap", // Ensures items wrap instead of overflowing
                      paddingBottom: "20px",
                      gap: 2,
                    }}
                  >
                    {currSetArray.map((item) => (
                      <Button
                        key={item.set_rarity +" " + item.set_edition}
                        onClick={() => handleButtonSetRarity(item)}
                        variant={
                          item.set_rarity === currRarity
                            ? "contained"
                            : "outlined"
                        }
                        sx={{
                          width: "80px",
                          backgroundColor: rarityDict[item.set_rarity][1],
                          color: "white",
                        }}
                      >
                        {rarityDict[item.set_rarity][0]}
                      </Button>
                    ))}
                  </Stack>

                  {/* Description Stack */}
                  <Stack sx={{ width: "100%" }}>
                    <p className="title">Description</p>
                    <p className="para">{cardData.desc}</p>

                    {isMonster && !cardData.linkval && (
                      <p className="title">Level/Rank</p>
                    )}
                    {isMonster && !cardData.linkval && (
                      <p className="para">{cardData.level}</p>
                    )}
                    {isMonster && cardData.linkval && (
                      <p className="title">Link</p>
                    )}
                    {isMonster && cardData.linkval && (
                      <p className="para">{cardData.linkval}</p>
                    )}

                    <p className="title">Card Type</p>
                    <p className="para">
                      {cardData.type} / {cardData.race}
                    </p>
                    {isMonster && (
                      <p className="para" style={{ marginTop: "5px" }}>
                        <strong>ATK/ </strong>
                        {cardData.atk}{" "}
                        <strong>{!cardData.linkval ? "DEF/ " : ""}</strong>
                        {!cardData.linkval ? cardData.def : ""}
                      </p>
                    )}
                  </Stack>
                </Stack>
              </Stack>

              {/* Price Stack */}
              <Stack
                sx={{
                  alignSelf: "start",
                  padding: "20px",
                  border: "1px solid lightgrey",
                  borderRadius: "5px",
                  height: "fit-content",
                  minWidth: "232px",
                }}
              >
                <p className="subtext" style={{ paddingBottom: "10px" }}>
                  {currRarity}
                </p>
                <p className="subtext" style={{ fontSize: "0.75rem" }}>
                  Tcgplayer (USD)
                </p>
                <p className="title">${currPrice}</p>
                <p
                  className="subtext"
                  style={{ marginTop: "10px", fontSize: "0.75rem" }}
                >
                  CAD {percentage * 100}%
                </p>
                <p className="title" key="Price">
                  ${((currPrice / USDtoCAD) * percentage).toFixed(2)}
                </p>
                {/* Percentage button Stack */}
                <Stack
                  direction="row"
                  sx={{
                    gap: 1,
                    flexWrap: "wrap", // Ensures items wrap instead of overflowing
                    paddingTop: "20px",
                  }}
                >
                  {percentages.map((item) => (
                    <Button
                      key={item}
                      size="small"
                      sx={{ minWidth: "unset", width: "40px" }}
                      variant="outlined"
                      onClick={() => handleButtonPercentage(item)}
                    >
                      {item}%
                    </Button>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </div>
      )}
    </>
  );
}
export default CardPage;
