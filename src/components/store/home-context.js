import {createContext} from "react";

const HomeContext = createContext({
  homeItems: [], 
  setHomeItems: () => {}
})

export default HomeContext