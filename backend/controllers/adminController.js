const Problem=require('../models/problem');
const Ticket=require('../models/tickets');
const City=require('../models/city');
const Area=require('../models/area');


exports.getAllProblems=async(req,res)=>{
    try{
        const problems=await Problem.find().populate('city_id').populate('area_id').populate('user_id','username email');
        res.status(200).json(problems);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

exports.getAllTickets=async(req,res)=>{
    try{
        const tickets=await Ticket.find().populate('user_id').populate({path:'problem_id',
            populate:{
                path:'city_id',
                model:'City'
            },
            populate:{
                path:'area_id',
                model:'Area'
            }
        });
        res.status(200).json(tickets);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

exports.markProblemAsResolved=async(req,res)=>{
    try{
        const {problem_id}=req.params;
        if(!problem_id){
            return res.status(400).json({message:"Problem id is required"});
        }
        
        const problem=await Problem.findByIdAndUpdate(problem_id,{is_resolved:true});
        res.status(200).json({message:"Problem marked as resolved"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}
exports.markTicketAsCompleted=async(req,res)=>{
    try{
        const {ticket_id}=req.params;

        await Ticket.findByIdAndUpdate(ticket_id,{status:"completed"});
        res.status(200).json({message:"Ticket marked as completed"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}
exports.getAllResolvedProblems=async(req,res)=>{
    try{
        const problems=await Problem.find({is_resolved:true}).populate('city_id').populate('area_id').populate('user_id');
        res.status(200).json(problems);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}
exports.getAllCompletedTickets=async(req,res)=>{
    try{
        const tickets=await Ticket.find({status:"completed"}).populate('user_id').populate({path:'problem_id',
            populate:{
                path:'city_id',
                model:'City'
            },
            populate:{
                path:'area_id',
                model:'Area'
            }
        });
        res.status(200).json(tickets);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}
exports.getProblemByCityId=async(req,res)=>{
    try{
        const {city_id}=req.params;
        const problems=await Problem.find({city_id:city_id}).populate('city_id').populate('area_id').populate('user_id');
        res.status(200).json(problems);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

exports.createCity=async(req,res)=>{
    try{
        // ?console.log(req.body);
        const {name}=req.body;
        const newCity=new City({
            name
        });
        await newCity.save();
        res.status(201).json({message:"City created successfully"});
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

exports.createArea=async(req,res)=>{
    try{
        const {name,city_id}=req.body;
        const newArea=new Area({
            name,
            city_id
        });
        await newArea.save();
        res.status(201).json({message:"Area created successfully"});
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


