const express = require('express');
const bcrypt = require('bcrypt');
const authRouter = express.Router();
const User = require('../models/User.js');

const hashCred = async (cred) => {
    const saltRounds = 10;
    return await bcrypt.hash(cred, saltRounds);
}

authRouter.get('/login', async (req, res) => {
    const _email = req.body.email; 
    const _username = req.body.username;
    const _password = req.body.password; 
    try {
        const isEmailRegistered = await User.exists({email: _email});
        if (isEmailRegistered){
            const userCreds = User.find({email: _email}, async function(err, doc){
                const usernamesMatch =  await bcrypt.compare(_username, doc[0].username); 
                const passwordMatch =  await bcrypt.compare(_password, doc[0].password);  
                if (usernamesMatch && passwordMatch){
                    return res.send({
                        message: 'Succesfuly logged in.'
                    });
                }else{
                    return res.send({
                        message: 'Provided credentials are invalid.'
                    });
                };          
            });
        }else{
            return res.send({
                message: 'Provided email credential not registered.'
            });
        }
    }catch(error){
        console.log('Error', error);
    }
});

authRouter.post('/sign-up', async (req, res) => {
    const _email = req.body.email; 
    const _username = req.body.username;
    const _password = req.body.password;
    try {
        const isEmailRegistered = await User.exists({email: _email});
        if (isEmailRegistered){
            return res.send({
                message: 'Account already exists, existing registered email was used.'
            });
        }else{
            const user = new User({
                email: _email,
                username: await hashCred(_username),
                password: await hashCred(_password)
            });
            await user.save();
            return res.send({
                message: 'Account created.'
            })
        }
    }catch (error){
        if (error === undefined){
            res.send({
                message : 'Failed to post user credentials.'
            })
        }
        console.log('Error', error);
    }
}); 

module.exports = {
    authRouter
}

