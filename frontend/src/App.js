import React from "react";
import MiniDrawer from "./component/MiniDrawer";
import axios from "axios";


function App() {

  console.log(process.env.REACT_APP_API_BASE_URL);
  axios.defaults.baseURL = 'http://192.168.0.79:5000';
  return (
    <>
      <MiniDrawer />
    </>
  );
}

export default App;
