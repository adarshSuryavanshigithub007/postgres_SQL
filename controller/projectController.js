const projects = require("../db/models/projects");
const { sendResponse } = require("../utils/service/responseService");


const createProject = async(req,res,next)=>{
    const  body = req.body;
    // const userId = req.user.id
    const newProject = await projects.create({
        title:body.title,
        isFeature:body.isFeature,
        productImage:body.productImage,
        price:body.price,
        shortDescription:body.shortDescription,
        description:body.description,
        productUrl:body.productUrl,
        category:body.category,
        tags:body.tags,
        createdBy:1
        
    })
    return  res.status(201).json({
        message:"Project created successfully",
        data:newProject
        
    })
    
}

module.exports = {createProject}