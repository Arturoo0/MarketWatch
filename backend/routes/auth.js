const { v4: uuidv4 } = require('uuid');
const express = require('express');
const bcrypt = require('bcrypt');
const authRouter = express.Router();
const User = require('../models/User.js');
const Session = require('../models/Session.js');

const hashCred = async (cred) => {
    const saltRounds = 10;
    return await bcrypt.hash(cred, saltRounds);
}

authRouter.post('/login', async (req, res) => {
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
                    const createdSessionID = uuidv4();
                    const session = new Session({
                        email: _email,
                        sessionID: createdSessionID
                    });
                    await session.save();
                    res.header('Access-Control-Allow-Credentials', true)
                    res.cookie('authSession', createdSessionID);
                    return res.status(201).send({
                        message: 'Succesfuly logged in.'
                    });
                }else{
                    return res.status(401).send({
                        message: 'Provided credentials are invalid.'
                    });
                };          
            });
        }else{
            return res.status(401).send({
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
            return res.status(409).send({
                message: 'Account already exists, existing registered email was used.'
            });
        }else{
            const user = new User({
                email: _email,
                username: await hashCred(_username),
                password: await hashCred(_password)
            });
            await user.save();
            return res.status(201).send({
                message: 'Account created.'
            })
        }
    }catch (error){
        if (error !== undefined){
            res.status(400).send({
                message : 'Failed to process provided user credentials.'
            })
        }
    }
}); 

module.exports = {
    authRouter
}

