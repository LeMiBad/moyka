import { useStore } from "effector-react";
import { useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { $jwt, getJWT } from "../../store/jwt";
import Auth from "../Auth/Auth";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        font-family: 'Montserrat', 'Roboto', sans-serif;
    }
`;

const App = () => {
  const jwt = useStore($jwt)

  useEffect(() => {
    getJWT()
  }, [])

  useEffect(() => {
    if(jwt) console.log(jwt)
  }, [jwt])

  return (
    <>
      <GlobalStyle/>
      { jwt && <Auth/>}
    </>
  );
};

export default App;
