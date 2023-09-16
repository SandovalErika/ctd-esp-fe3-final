import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import DirectionData from "./DirectionData.component";
import { CheckoutContext } from "./context/FormContext";

describe("DirectionData Component", () => {
  const handleNextMock = jest.fn();
  const handlerCustomerMock = jest.fn();
  const setDataMock = jest.fn();
  const handlerAddressMock = jest.fn();
  const handlerCardMock = jest.fn();

  const mockContextValue = {
    handlerCustomer: handlerCustomerMock,
    data: {
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
        },
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
    },
    setData: setDataMock,
    handlerAddress: handlerAddressMock,
    handlerCard: handlerCardMock,
  };

  beforeEach(() => {
    render(
      <CheckoutContext.Provider value={mockContextValue}>
        <DirectionData handleNext={handleNextMock} />
      </CheckoutContext.Provider>
    );
  });

  it("renders correctly", () => {
    expect(screen.getByText(/dirección de entrega/i)).toBeInTheDocument();
    expect(screen.getByText(/siguiente/i)).toBeInTheDocument();
  });

  it("shows errors when trying to submit with empty fields", () => {
    act(() => {
      fireEvent.click(screen.getByText(/siguiente/i));
    });
  });

  it("handles data entry and form submission", () => {
    fireEvent.input(screen.getByLabelText(/dirección/i), {
      target: { value: "Calle 123" },
    });
    fireEvent.input(screen.getByLabelText(/departamento, piso o altura/i), {
      target: { value: "4C" },
    });
    fireEvent.input(screen.getByLabelText(/ciudad/i), {
      target: { value: "cba" },
    });
    fireEvent.input(screen.getByLabelText(/provincia/i), {
      target: { value: "cba" },
    });
    fireEvent.input(screen.getByLabelText(/código postal/i), {
      target: { value: "5003" },
    });

    act(() => {
      fireEvent.click(screen.getByText(/enviar/i));
    });

    expect(handleNextMock).toBeCalled;
  });
});
