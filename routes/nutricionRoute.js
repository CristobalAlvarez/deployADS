const express = require("express");
const router = express.Router();
const {Nutricion} = require("../models");

//  Get form by id
router.get("/:id", async (req, resp) => {

    try{
        req.params['id'] = req.params['id']
        const nutricionExact = await nutricion.findAll({where:req.params});
        resp.send(nutricionExact);
    }catch(error){
        resp.status(400).send("Error 400");
    }
    
});

//  Create nutricion form, if exist, we update it
router.post("/", async (req, resp) => {
    
    try{
       
        if(true){

            const NutricionExact = await Nutricion.findAll({where:{
                child_id : req.body["child_id"]
            }});

            console.log(NutricionExact)

            if(NutricionExact.length == 0){
                

                
                const genNutricion = await Nutricion.create(req.body);

                resp.send(genNutricion);
    
            }else{
    
                const genNutricion = await Nutricion.update(req.body,{
                    where:{
                        child_id : req.body["child_id"]
                    }
                });

                resp.send(
                    //  Quitamos JSON
                    await Nutricion.findOne({
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