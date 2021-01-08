const express = require("express");
const router = express.Router();
const {Mother} = require("../models");
const { validate, clean, format } = require('rut.js')

//  Get mother by rut
router.get("/:rut", async (req, resp) => {

    
    try{

        if(validate(req.params['rut'])){
            req.params["rut"] = clean(req.params['rut'])
            const motherExact = await Mother.findAll({where:req.params});
            resp.send(motherExact);
        }else{
            resp.status(400);
        }

    }catch(error){
        resp.status(400).send("Error 400");
    }
    
});

//  Create mother, if exist, we update
router.post("/", async (req, resp) => {
    
    try{
       
        if(true){

            
            req.body["rut"] = clean(req.body["rut"])

            const motherExact = await Mother.findAll({where:{
                rut : clean(req.body["rut"])
            }});

            console.log(motherExact)

            if(motherExact.length == 0){
                
                const genmother = await Mother.create(req.body);
                resp.send(genmother);
    
            }else{
    
                const genmother = await Mother.update(req.body,{
                    where:{
                        rut : req.body["rut"]
                    }
                });

                resp.send(
                    
                    //  Quitamos JSON
                    await Mother.findOne({
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