require('dotenv').config;

const fetch = require("node-fetch");
const express = require('express');
const currRouter = express.Router();

const key = process.env.NOMICS_KEY;
const crypto = "BTC, AETH, DOGE"
const currency = "GBP"

currRouter.get("/", (req, res) => {
    // console.log("https://api.nomics.com/v1/currencies/ticker?key=${key}&ids=${crypto}&convert=${currency}");
    

    try {
        const reponse = fetch(`https://api.nomics.com/v1/currencies/ticker?key=${key}&ids=${crypto}&convert=${currency}`)
                        .then(response => {
                            if(!response.ok){
                                // Error
                                res.json({error: "There has been an error with the server!"})
                            }
                            response.json().then( resData => {
                                // Data Manipulation
                                // console.log(resData);

                                const currrenciesSchema = {
                                    "items": [
                                        {
                                            "title": "",
                                            "detail": ""
                                        },
                                        {
                                            "title": "",
                                            "detail": ""
                                        },
                                        {
                                            "title": "",
                                            "detail": ""
                                        }                                        
                                    ]
                                }
                                var count = 0;

                                resData.forEach( data => {
                                    // console.log("----------------------------------------------------------")
                                    // console.log("Currency: ", data.name);
                                    // console.log("Price: ", data.price);
                                    // console.log("----------------------------------------------------------")

                                    currrenciesSchema.items[count].title = data.name;
                                    currrenciesSchema.items[count].detail = `The Currrent price for one ${data.name} is £${data.price}`;
                                    
                                    count += 1;
                                })
                                res.json(currrenciesSchema);
                            })
                        })
    } catch(e) {
        console.log(e);
        console.log('could not search api');
    }
});


module.exports = currRouter;