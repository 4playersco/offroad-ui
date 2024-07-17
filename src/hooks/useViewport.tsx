import { FC, useState, useEffect, createContext, useContext } from "react";

const ViewportContext = createContext({});

type Dimension = number | undefined;

interface ViewportProviderProps {
  children: React.ReactNode;
}

export const ViewportProvider: FC<ViewportProviderProps> = ({ children }) => {
  const isBrowser = () => typeof window !== "undefined";
  const [width, setWidth] = useState<Dimension>(undefined);
  const [height, setHeight] = useState<Dimension>(undefined);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  });

  /* Now we are dealing with a context instead of a Hook, so instead
     of returning the width and height we store the values in the
     value of the Provider */
  return (
    <ViewportContext.Provider value={{ width, height }}>
      {children}
    </ViewportContext.Provider>
  );
};

/* Rewrite the "useViewport" hook to pull the width and height values
   out of the context instead of calculating them itself */
export const useViewport = () => {
  /* We can use the "useContext" Hook to acccess a context from within
     another Hook, remember, Hooks are composable! */
  return useContext(ViewportContext);
};
