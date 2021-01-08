const express = require("express");
const router = express.Router();
const {Lactancia} = require("../models");

//  Get lactancia form by ID
router.get("/:id", async (req, resp) => {

    try{
        req.params['id'] = req.params['id']
        const LactanciaExact = await Lactancia.findAll({where:req.params});
        resp.send(LactanciaExact);
    }catch(error){
        resp.status(400).send("Error 400");
    }
    
});

//  Create lactancia form, if exist, we update it
router.post("/", async (req, resp) => {
    
    try{
       
        if(true){

            const LactanciaExact = await Lactancia.findAll({where:{
                child_id : req.body["child_id"]
            }});

            console.log(LactanciaExact)

            if(LactanciaExact.length == 0){
                
                const genLactancia = await Lactancia.create(req.body);
                resp.send(genLactancia);
    
            }else{
    
                const genLactancia = await Lactancia.update(req.body,{
                    where:{
                        child_id : req.body["child_id"]
                    }
                });

                resp.send(
                    
                    //  Quitamos JSON
                    await Lactancia.findOne({
                        where:{
                            child_id : req.body["child_id"]
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