const express = require("express");
const router = express.Router();
const {Reservation, Child, Mother, User} = require("../models");
const jwt_decode = require('jwt-decode');

//  All information for voucher view
router.get("/token=:token&id_child=:id_child&id_cite=:id_cite", async (req, resp) => {

    try{
        
        var decoded = jwt_decode(req.params['token'])
        user_id = decoded.id

        const cite = await Reservation.findOne({
            where:{
                id : req.params['id_cite']
            }
        })

        cite.user_id = user_id
        cite.save()

        const child = await Child.findOne({
            where:{
                id : req.params['id_child']
            }
        })

        const mother = await Mother.findOne({
            where: {
                id: child.mother_id
            }
        });

        resp.status(200).send({
            mother_name: mother.name,
            mother_rut: mother.rut,
            child_rut: child.rut, 
            type: cite.type,
            date: cite.start,
            date_end: cite.end,
            amount: 22000,
            email: mother.email
        });
        
    }catch(error){
        resp.status(400).send("Error 400");
    }
    
});

router.get("/getEmail/token=:token", async (req, resp) => {

    try{
        
        var decoded = jwt_decode(req.params['token'])
        user_id = decoded.id

        const userExact = await User.findOne({
            where:{
                id : user_id
            }
        })
        
        resp.status(200).send({
            email: userExact.email,
            id:user_id
        });
        
    }catch(error){
        console.log(error)
        resp.status(400).send(error);
    }
    
});

router.get("/test", async (req, resp) => {

    try{

        resp.status(200).send("Perfect");
        
    }catch(error){
        resp.status(400).send(error);
    }
    
});

module.exports = router;