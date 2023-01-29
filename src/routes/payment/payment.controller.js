const axios = require("axios");

// const URL_BACK = "http://localhost:3001"
const URL_BACK = "https://pf-back-the-revenge-production.up.railway.app"

// const URL_FRONT = "http://127.0.0.1:5173"
const URL_FRONT = "https://pf-front-the-revenge-h8gg.vercel.app"


const api = "https://api-m.sandbox.paypal.com"
const apiClient = "AWKfx6Uu8Kn1EafpDYEN-sX8ZfA5UZSZ8v3WlVioQiguW8WtFRGZPP-_oNlnOMqKjW0zUdriWOWr21JN"
const apiSecret = "EDNYEGG-2pDQDyGS2kkVd4pXHC3QdvnoZzEHVl9R4mdPbKho__A-c38alhbGZhpPPLrmKzJSZWAWXcLy"

const createOrder = async (req, res) => {
    try {
        const { value, description } = req.body;
        const order = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value
                    },     
                    description
                }
            ],
            application_context: {
                brand_name: "Galaxia Tech",
                landing_page: "LOGIN", // LOGIN/BILLING/NO_PREFERENCE
                user_action: "PAY_NOW",
                return_url: `${URL_BACK}/capture-order`,
                cancel_url: `${URL_BACK}/cancel-order`
            }
        }

        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");

        //Getting token: https://developer.paypal.com/reference/get-an-access-token/
        const { data: { access_token } } = await axios.post("https://api-m.sandbox.paypal.com/v1/oauth2/token", params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                username: apiClient,
                password: apiSecret
            }
        })

        //Create order: https://developer.paypal.com/api/rest/requests/
        const response = await axios.post(`${api}/v2/checkout/orders`, order, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        //response.config.data can be use to capture info
        // console.log(response.data)
        res.json(response.data);

    } catch(error) {
        console.log(error)
        return res.status(500).send("Something went wrong");
    }
    
}

const captureOrder = async (req, res) => {
    //Capture order: https://developer.paypal.com/docs/api/orders/v2/
    const { token } = req.query;

    const response = await axios.post(`${api}/v2/checkout/orders/${token}/capture`, {}, {
        auth: {
            username: apiClient,
            password: apiSecret
        }
    });
    // console.log(response.data.links[0].href)
    const link = await axios.get(response.data.links[0].href, {
        auth: {
            username: apiClient,
            password: apiSecret
        }
    })
    servicesId = JSON.parse(link.data.purchase_units[0].description);
    // await axios.post(`http://localhost:3001/orders`, {
    //     purchaseId: link.data.id,
    //     status: link.data.status,
    //     servicesId,
    //     userMail
    // });

    return res.redirect(`${URL_FRONT}/payment`);
}

const cancelOrder = (req, res) => {
    res.redirect(`${URL_FRONT}/decline`)
}

module.exports = {
    cancelOrder, 
    captureOrder,
    createOrder
};