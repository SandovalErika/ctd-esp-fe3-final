import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import PaymentData from "./PaymentData.component";
import { CheckoutContext } from "./context/FormContext";

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock("dh-marvel/services/checkout/checkout.service", () => ({
  postCheckOut: jest.fn(() => Promise.resolve(true)),
}));

describe("PaymentData Component", () => {
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
        <PaymentData
          result={{
            title: "Test Comic",
            thumbnail: { path: "test-path", extension: "jpg" },
            price: 100,
          }}
        />
      </CheckoutContext.Provider>
    );
  });

  it("renders correctly", () => {
    expect(screen.getByText(/datos del pago/i)).toBeInTheDocument();
    expect(screen.getByText(/siguiente/i)).toBeInTheDocument();
  });

  it("shows errors when trying to submit with empty fields", () => {
    act(() => {
      fireEvent.click(screen.getByText(/siguiente/i));
    });
  });

  it("handles data entry and form submission", async () => {
    fireEvent.input(screen.getByLabelText(/número de tarjeta/i), {
      target: { value: "42424242 4242 4242" },
    });
    fireEvent.input(
      screen.getByLabelText(/nombre como aparece en la tarjeta/i),
      { target: { value: "Test Name" } }
    );
    fireEvent.input(screen.getByLabelText(/fecha de expiración/i), {
      target: { value: "12/25" },
    });
    fireEvent.input(screen.getByLabelText(/código de seguridad/i), {
      target: { value: "123" },
    });

    act(() => {
      fireEvent.click(screen.getByText(/siguiente/i));
    });

    expect(handlerCardMock).toBeCalled();
  });
});
