const express = require("express");
const router = express.Router();
const { validate, clean, format } = require('rut.js')
const axios = require('axios');
const {Payment,Reservation, Child, Mother} = require("../models");

var querystring = require('querystring');
var CryptoJS = require("crypto-js");

require("dotenv").config();

//  Get flow url
router.post("/", async (req, resp) => {
    
    try{

        const newPayment = await Payment.create({
            ispaid: false,
            child_id: req.body['child_id'],
            type: req.body['type'],
            reservation_id: req.body['cite_id']
        });

        params = {
            "amount": 22000,
            "apiKey": process.env.API_KEY,
            "commerceOrder": newPayment,
            "currency":"CLP",
            "email": req.body['email'],
            "subject": "CitaBebeymami",
            "urlConfirmation": process.env.TUNEL_LINK + "/payment/callback/" + newPayment.id,
            "urlReturn": process.env.TUNEL_LINK + "/payment/redirect"
        };

        lista = []
        for(var key in params){
            lista.push(key)
        }

        lista2 = lista.sort()

        stringToSign = "";
        for(var key in lista2){
            stringToSign = stringToSign + lista2[key] + params[lista2[key]];
        }

        var key = process.env.SECRET_KEY;
        var hash = CryptoJS.HmacSHA256(stringToSign, key);

        params['s'] = String(hash);

        var url = ""
        await axios.post('https://sandbox.flow.cl/api/payment/create',  querystring.stringify(params), {headers: { "Content-Type": "application/x-www-form-urlencoded"}})
        .then(function (response){
            console.log()
            url = response.data.url + "?token=" + response.data.token;
        }).catch(function (error){
            console.log(error)
        });

        resp.status(200).send({
            "redirectUrl":url
        });
        
    }catch (error){
        console.log(error);
    }

});

//  Callback for flow
router.post('/callback/:id', async (req, resp) => {

    try{

        const pay = await Payment.findOne({
            where:{
                id: req.params['id']
            }
        })
        
        pay.ispaid = true;
        pay.save()

        if(pay.type == "RESERVATION"){

            const reser = await Reservation.findOne({
                where:{
                    id:pay.reservation_id
                }
            })
            
            reser.payment_id = pay.id;
            reser.paid = true;
            reser.save();
        
        }

        //-----------------------------
        //  Obtenemos mail de cliente

        //var child = await Child.findOne({
        //    where:{
        //        id: pay.child_id,
        //    }
        //})
//
        //var mother = await Mother.findOne({
        //    where:{
        //        id: child.mother_id,
        //    }
        //})

        //  Mandamos mail
        
        //  Admin
        //var email = sendEmail("testing.bebeymami@gmail.com","Pago obtenido","<h1>Exito</h1>");
        
        //  Cliente
        //var email = sendEmail(mother.email,"Pago realizado","<h1>Exito</h1>");

        resp.status(200).send()

    }catch(error){
        console.log(error)
    }

});

//  Redirect to payment success (flow)
router.post("/redirect/", async (req, resp) => {

    try{
        resp.redirect("http://localhost:3000/paymentsuccess")
    }catch(error){
        console.log(error)
    }

});

module.exports = router;