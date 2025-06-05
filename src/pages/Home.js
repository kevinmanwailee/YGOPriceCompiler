import Header from "./header.js";
import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    document.title = "Home | YGO-Converter"
  },[])

  return (
    <>
      <Header />
    </>
  );
}
export default Home;
