const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

// post to create
router.post('/users', async(req, res) => {
    const user = new User(req.body)

    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    }catch (e) {
        res.status(404).send(e)
    }
})

// post
router.post('/users/login',async(req,res) =>{ 
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })

    } catch (e) {
        res.status(400).send()
    }
})

// log out
router.post('/users/logout', auth, async(req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// log out all
router.post('/users/logoutAll', auth, async(req,res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// read
router.get('/users/me', auth, async(req,res) => { 
    res.send(req.user)
})

// patch() for updating an existing resource
router.patch('/users/me', auth, async (req,res)=>{
    const update = Object.keys(req.body)
    const allowedUpdate = ['name', 'email', 'password', 'age']
    const isValidOperation = update.every((update) => allowedUpdate.includes(update))

    if(!isValidOperation){
        return res.status(404).send({ error : 'Invalid Update!!!!'})
    }

    try{
        update.forEach((update) => req.user[update]= req.body[update])
        await req.user.save()
        res.send(req.user)
    }catch (e){
        res.status(400).send(e)
    }
})

//delete for delete
router.delete('/users/me', auth, async(req, res)=>{
    try{
        await req.user.remove()
       res.send(req.user)
    }catch{
        res.status(500).send()

    }
})

module.exports = router