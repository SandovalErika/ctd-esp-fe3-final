import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";

const url = process.env.API_ROUTE;
console.log('api_route', url);

export const postCheckOut = async (data: CheckoutInput) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    const req = await fetch(`http://localhost:3000/api/checkout-orden`, options)
    const res = await req.json()
    return res;
}