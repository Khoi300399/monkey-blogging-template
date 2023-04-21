import { Dispatch, createContext, useContext, useState } from "react";

type values = {
  show: boolean;
  setShow: Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
};
const DropdownContext = createContext<values | undefined>(undefined);
function DropdownProvider(props: any) {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  const values: values = { show, setShow, toggle };
  return (
    <DropdownContext.Provider value={values!}>
      {props.children}
    </DropdownContext.Provider>
  );
}
function useDropdown() {
  const context = useContext(DropdownContext);
  if (typeof context === "undefined")
    throw new Error("useDropdown must be used within DropdownProvider");
  return context;
}
export { useDropdown, DropdownProvider };
