const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.delete('/tasks/:id', auth, async(req, res)=>{
    try{
        const task = await Task.findOneAndDelete({_id: req.params.id, owner:req.user._id})

        if(!task){
            return res.status(404).send()
       }
       res.send(task)
    }catch{
        res.status(500).send()

    }
})

router.patch('/tasks/:id', auth, async (req,res)=>{
    const update = Object.keys(req.body)
    const allowedUpdate = ['description', 'completed']
    const isValidOperation = update.every((update) => allowedUpdate.includes(update))
    // error for valid operation
    if(!isValidOperation){
        return res.status(404).send({ error : 'Invalid Update!!!!'})
    }

    try{
        const task = await Task.findOne({_id: req.params.id, owner:req.user._id})


        if(!task){
            // error for not found task
            return res.status(404).send({error : 'Not found!!!!'})
        }   

        update.forEach((update) => task[update]= req.body[update])
        await task.save()

        res.send(task)
    }catch (e){
        // error
        res.status(400).send(e)
    }
})

router.get('/tasks', auth, async(req,res) =>{ 
    try{
        // const tasks = await Task.find({owner: req.user._id})
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send()
    }
})

// using route parameters
router.get('/tasks/:id', auth, async(req,res) => {
    const _id = req.params.id

    try{
        const task = await Task.findOne({_id, owner: req.user._id})

        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        return res.status(500).send(e)
    }
})

router.post('/tasks', auth, async(req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(404).send(e)
    }
})

module.exports = router