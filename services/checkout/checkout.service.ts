import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";

const url = "https://ctd-esp-fe3-final-git-main-sandovalerika.vercel.app/api/checkout"
// const url2 = "http://localhost:3000/api/checkout"

export const postCheckOut = async (data: CheckoutInput) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    const req = await fetch(`url`, options)
    const res = await req.json()

    return res;
}


