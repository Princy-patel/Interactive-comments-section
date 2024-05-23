// DataContext.jsx
import { createContext, useState } from "react";
import comments from "../../data/data";

const ContextProvider = createContext();

function DataContext({ children }) {
  const [commentsData, setCommentsData] = useState(comments);

  return (
    <ContextProvider.Provider value={{ commentsData, setCommentsData }}>
      {children}
    </ContextProvider.Provider>
  );
}

export { ContextProvider };
export default DataContext;
