const Problem=require('../models/problem');
const Ticket=require('../models/tickets');
const City=require('../models/city');
const Area=require('../models/area');

exports.createProblem=async(req,res)=>{
    try{
        const {title,description,city_id,area_id,user_id}=req.body;
        const problem=new Problem({
            title,
            description,
            city_id,
            area_id,
            user_id
        });
        await problem.save();
        res.status(201).json({message:"Problem created successfully"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}
exports.getProblemByUserId=async(req,res)=>{
    try{
        const {user_id}=req.params;
        const problems=await Problem.find({user_id:user_id});
        res.status(200).json(problems);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}
exports.getResolvedProblems=async(req,res)=>{
    try{
        const problems=await Problem.find({is_resolved:true,user_id:req.params.user_id});
        res.status(200).json(problems);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}
const deleteProblem=async(req,res)=>{
    try{
        const {problem_id}=req.params;
        await Problem.findByIdAndDelete(problem_id);
        res.status(200).json({message:"Problem deleted successfully"});
    }catch(err){
        res.status(500).json({error:err.message});
    }

}
exports.raiseTicketByProblemId=async(req,res)=>{
    try{
        const {problem_id}=req.params;
        const {problem_description}=req.body;
        const problem=await Problem.findById(problem_id);
        if(!problem.is_resolved){
            return res.status(400).json({message:"Problem is not resolved yet"});
        }
        const newTicket=new Ticket({
            problem_id,
            description:problem_description
        });
        await newTicket.save();
        res.status(201).json({message:"Ticket raised successfully"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}
exports.getTicketByUserId=async(req,res)=>{
    try{
        const {user_id}=req.params;
        const tickets=await Ticket.find({user_id:user_id});
        res.status(200).json(tickets);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}
exports.getResolvedTickets=async(req,res)=>{
    try{
        const tickets=await Ticket.find({status:"completed",user_id:req.params.user_id});
        res.status(200).json(tickets);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}
exports.getAllCities=async(req,res)=>{
    try{
        const cities=await City.find();
        res.status(200).json(cities);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

exports.getAreaByCityId=async(req,res)=>{
    try{
        const {city_id}=req.params;
        const areas=await Area.find({city_id:city_id});
        res.status(200).json(areas);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
