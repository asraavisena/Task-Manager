const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.delete('/tasks/:id', async(req, res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task){
            return res.status(404).send()
       }
       res.send(task)
    }catch{
        res.status(500).send()

    }
})

router.patch('/tasks/:id', async (req,res)=>{
    const update = Object.keys(req.body)
    const allowedUpdate = ['description', 'completed']
    const isValidOperation = update.every((update) => allowedUpdate.includes(update))
    // error for valid operation
    if(!isValidOperation){
        return res.status(404).send({ error : 'Invalid Update!!!!'})
    }

    try{
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true, runValidators: true
        // })

        const task = await Task.findById(req.params.id)
        
        update.forEach((update) => task[update]= req.body[update])
        await task.save()

        if(!task){
            // error for not found task
            return res.status(404).send({error : 'Not found!!!!'})
        }
        res.send(task)
    }catch (e){
        // error
        res.status(400).send(e)
    }
})
router.get('/tasks',async(req,res) =>{ 
    try{
        const tasks = await Task.find({})
        res.send(tasks)
    }catch(e){
        res.status(500).send()
    }
})

// using route parameters
router.get('/tasks/:id',async(req,res) => {
    const _id = req.params.id

    try{
        const task = await Task.findById({_id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        return res.status(500).send(e)
    }
})

router.post('/tasks', async(req, res) => {
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(404).send(e)
    }
})

module.exports = router