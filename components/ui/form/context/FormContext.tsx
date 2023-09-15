import { createContext, useContext, useState } from "react";

type CheckoutContextType = {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  handlerCustomer: (data: any) => void;
  handlerAddress: (data: any) => void;
  handlerCard: (data: any) => void;
};

type CheckoutProviderProps = {
    children: React.ReactNode;
  };

  const defaultValues = {
    customer: {
        name: "",
        lastname: "",
        email: "",
        address: {
            address1: "",
            address2: "",
            city: "",
            state: "",
            zipCode: "",
        }
    },
    card: {
        number: "",
        cvc: "",
        expDate: "",
        nameOnCard: "",
    },
    order: {
        name: "",
        image: "",
        price: 0,
    },
};

export const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<CheckoutProviderProps> = ({ children }) => {
   
  
    const [data, setData] = useState(defaultValues);
   
  
    const handlerCustomer = (data: any) => {
        setData(prevData => ({ ...prevData, customer: {...prevData.customer, ...data} }));
    };
  
    const handlerAddress = (data: any) => {
        setData(prevData => ({ ...prevData, customer: { ...prevData.customer, address: data } }));
    };
  
  
    const handlerCard = (data: any) => {
        console.log("Data received in handlerCard:", data);
      setData(prevData => ({ ...prevData, card: data }));
    };
    
  
    return (
      <CheckoutContext.Provider value={{ data, setData, handlerCustomer, handlerAddress, handlerCard }}>
        {children}
      </CheckoutContext.Provider>
    );
  };