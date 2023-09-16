import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";

// const url = "http://localhost:3000/api/checkout"

export const postCheckOut = async (data: CheckoutInput) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    const req = await fetch(`/api/checkout`, options)
    const res = await req.json()

    return res;
}


