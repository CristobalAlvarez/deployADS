const express = require("express");
const router = express.Router();
const {Child} = require("../models");
const { validate, clean, format } = require('rut.js')

//  Get child by rut
router.get("/:rut", async (req, resp) => {

    try{

        if(validate(req.params['rut'])){
            req.params["rut"] = clean(req.params['rut'])
            const ChildExact = await Child.findAll({where:req.params});
            resp.status(200).send(ChildExact);
        }else{
            resp.status(400).send("Error 400");
        }

    }catch(error){
        resp.status(400).send("Error 400");
    }
    
});

//  Create child, if exist, we update
router.post("/", async (req, resp) => {
    
    try{
       
        if(true){

            req.body["rut"] = clean(req.body["rut"])

            const ChildExact = await Child.findAll({where:{
                rut : clean(req.body["rut"])
            }});

            if(ChildExact.length == 0){
                
                const genChild = await Child.create(req.body);
                resp.send(genChild);
    
            }else{
    
                const genChild = await Child.update(req.body,{
                    where:{
                        rut : req.body["rut"]
                    }
                });

                resp.send(

                    //  Quitamos JSON
                    await Child.findOne({
                        where:{
                            rut : req.body["rut"]
                        }
                    })
                    
                );
    
            }

        }else{
            resp.status(400)
        }
        
    }catch (error){
        
        resp.status(400).send(error);
    }

});

module.exports = router;