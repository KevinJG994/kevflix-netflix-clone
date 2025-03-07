import { createContext, useState } from "react";

const AlertContext = createContext();

function AlertProviderWrapper(props) {
  const [alert, setAlert] = useState(null);

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
}

export { AlertContext, AlertProviderWrapper };