import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import PersonalData from './PersonalData';
import { CheckoutContext } from './context/FormContext'; 

describe('PersonalData Component', () => {
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
    },
    setData: setDataMock,
    handlerAddress: handlerAddressMock,
    handlerCard: handlerCardMock
  };
  
  beforeEach(() => {
    render(
      <CheckoutContext.Provider value={mockContextValue}>
        <PersonalData handleNext={handleNextMock} />
      </CheckoutContext.Provider>
    );
  });

  it('renders correctly', () => {
    expect(screen.getByText(/datos personales/i)).toBeInTheDocument();
    expect(screen.getByText(/siguiente/i)).toBeInTheDocument();
  });

  it('shows errors when trying to submit with empty fields', async () => {
    act(() => {
        fireEvent.click(screen.getByText(/siguiente/i));
      });

  });

  it('handles data entry and form submission', async () => {
    fireEvent.input(screen.getByLabelText(/nombre/i), { target: { value: 'Erika' } });
    fireEvent.input(screen.getByLabelText(/apellido/i), { target: { value: 'Sandoval' } });
    fireEvent.input(screen.getByLabelText(/e-mail/i), { target: { value: 'erikasandoval@gmail.com' } });

    act(() => {
        fireEvent.click(screen.getByText(/siguiente/i));
    });
    
    expect(handleNextMock).toBeCalled();
  });
});
