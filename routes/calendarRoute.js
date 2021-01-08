const express = require("express");
const router = express.Router();
const {Reservation} = require("../models");
const { post } = require("./paymentRoute");
const jwt_decode = require('jwt-decode');

//Get all Reservations
router.get("/", async (req, resp) => {

    try{
        const allReservation = await Reservation.findAll();
        resp.send(allReservation);
        
    }catch(error){
        resp.status(400).send(error);
    }
    
});


//Get all Reservations with Paid  = False
router.get("/userGet/", async (req, resp) => {

    try{
        
        const allReservation = await Reservation.findAll({
            where:{
                paid:false
            }
        });

        resp.send(allReservation);

    }catch(error){
        resp.status(400).send(error);
    }
    
});


//  Create new Reservation and send it
router.post("/", async (req, resp) => {

    try{
        const newEvent = await Reservation.create(req.body);

        newEvent.paid = false;
        newEvent.save();

        //---------------------------------------------
        //  Mandamos mail
        var email = sendEmail("testing.bebeymami@gmail.com","Cita creada","<h1>Exito</h1>");

        resp.send(newEvent);
        
    }catch (error){
        resp.status(400).send(error);
    }

});

//  Get all Reservations by id in token
router.get("/:token", async (req, resp) => {

    try{
        
        var decoded = jwt_decode(req.params['token']);
        var id = decoded.id

        const allReservation = await Reservation.findAll({
            where: {
                user_id: id,
            }
        })

        resp.send(allReservation);
        
    }catch (error){
        resp.status(400).send(error);
    }

});

//  Delete Reservation by ID
router.delete("/:id", async (req, resp) => {

    try{
        
        const newEvent = await Reservation.destroy({
            where:{
                id:req.params['id']
            }
        });

        resp.status(200).send();
        
    }catch (error){
        resp.status(400).send(error);
    }

});

// Update reservation
router.put("/:id", async (req, resp) => {

    try{
        
        const newEvent = await Reservation.findOne({
            where:{
                id:req.params['id']
            }
        });

        newEvent.update(req.body);

        resp.status(200).send(newEvent);
        
    }catch (error){
        resp.status(400).send(error);
    }

});

module.exports = router;