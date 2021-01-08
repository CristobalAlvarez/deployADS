const express = require("express");
const router = express.Router();
const {Course, course_inscriptions} = require("../models");
const { post } = require("./paymentRoute");
const jwt_decode = require('jwt-decode');

//Get all Courses
router.get("/", async (req, resp) => {

    try{
        const allCourse = await Course.findAll();
        resp.send(allCourse);
        
    }catch(error){
        resp.status(400).send(error);
    }
    
});

//  Create new Course and send it
router.post("/inscription", async (req, resp) => {

    try{

        const newEvent = await course_inscriptions.create(req.body);

        resp.send(newEvent);

    }catch (error){
        resp.status(400).send(error);
    }

});

//Get all Courses
router.get("/:id", async (req, resp) => {

    try{
        const allCourse = await Course.findOne({
            where:{
                id:req.params['id']
            }
        });
        resp.send(allCourse);
        
    }catch(error){
        resp.status(400).send(error);
    }
    
});

//  Create new Course and send it
router.post("/", async (req, resp) => {

    try{
        const newEvent = await Course.create(req.body);

        newEvent.paid = false;
        newEvent.save()
        
        // ---------------------------------------------
        // Mail una vez creado


        
        var email = sendEmail("testing.bebeymami@gmail.com","Curso creado","<h1>EXITO</h1>");

        resp.send(newEvent);

    }catch (error){
        resp.status(400).send(error);
    }

});

//  Delete Course by ID
router.delete("/:id", async (req, resp) => {

    try{
        
        const newEvent = await Course.destroy({
            where:{
                id:req.params['id']
            }
        });

        resp.status(200).send();
        
    }catch (error){
        resp.status(400).send(error);
    }

});

// Update Course
router.put("/:id", async (req, resp) => {

    try{
        
        const newEvent = await Course.findOne({
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