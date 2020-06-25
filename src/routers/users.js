const express = require('express')
const User = require('../models/user')
const router = new express.Router()

// post to create
router.post('/users', async(req, res) => {
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    }catch (e) {
        res.status(404).send(e)
    }
    // Not async
    // user.save().then(() => {
    //     res.send(user)
    // }).catch((e)=>{
    //    res.status(404).send(e)
    // })
})

// post
router.post('/users/login',async(req,res) =>{ 
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)

    } catch (e) {
        res.status(400).send()
    }
})

// read
router.get('/users',async(req,res) =>{ 
    try{
        const users = await User.find({})
        res.send(users)
    }catch (e){
        res.status(500).send()
    }
})

// using route parameters
router.get('/users/:id',async (req,res) => {
    const _id = req.params.id

    try{
        const user = await User.findById({_id})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        return res.status(500).send(e)
    }
})

// patch() for updating an existing resource
router.patch('/users/:id', async (req,res)=>{
    const update = Object.keys(req.body)
    const allowedUpdate = ['name', 'email', 'password', 'age']
    const isValidOperation = update.every((update) => allowedUpdate.includes(update))

    if(!isValidOperation){
        return res.status(404).send({ error : 'Invalid Update!!!!'})
    }

    try{
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true, runValidators: true
        // })

        const user = await User.findById(req.params.id)
        update.forEach((update) => user[update]= req.body[update])
        await user.save()
        

        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch (e){
        res.status(400).send(e)
    }
})

//delete for delete
router.delete('/users/:id', async(req, res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            return res.status(404).send()
       }
       res.send(user)
    }catch{
        res.status(500).send()

    }
})

module.exports = router