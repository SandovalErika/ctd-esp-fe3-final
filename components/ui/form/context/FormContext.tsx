import { createContext, useState, ReactNode } from "react";

type AddressType = {
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
};

type CustomerType = {
    name: string;
    lastname: string;
    email: string;
    address: AddressType;
};

type CardType = {
    number: string;
    cvc: string;
    expDate: string;
    nameOnCard: string;
};

type OrderType = {
    name: string;
    image: string;
    price: number;
};

type CheckoutContextType = {
  data: {
    customer: CustomerType;
    card: CardType;
    order: OrderType;
  };
  setData: React.Dispatch<React.SetStateAction<typeof defaultValues>>;
  handlerCustomer: (data: Partial<CustomerType>) => void;
  handlerAddress: (data: AddressType) => void;
  handlerCard: (data: CardType) => void;
};

interface CheckoutProviderProps {
    children: ReactNode;
}

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

    const handlerCustomer = (customerData: Partial<CustomerType>) => {
        setData(prevData => ({ ...prevData, customer: {...prevData.customer, ...customerData} }));
    };

    const handlerAddress = (addressData: AddressType) => {
        setData(prevData => ({ ...prevData, customer: { ...prevData.customer, address: addressData } }));
    };

    const handlerCard = (cardData: CardType) => {
        setData(prevData => ({ ...prevData, card: cardData }));
    };

    return (
      <CheckoutContext.Provider value={{ data, setData, handlerCustomer, handlerAddress, handlerCard }}>
        {children}
      </CheckoutContext.Provider>
    );
};
