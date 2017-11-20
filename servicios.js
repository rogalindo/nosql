'use strict'
const express = require('express')
const http = require('http')
const bodyParser=require('body-parser')
var firebase= require('firebase')
let items=[]
let contador=0
//comentario1
 
 
var miRuta = {
  apiKey: "AIzaSyBguUXipVx6q3_N8H61AA_-2cCAUPrcwpk",
  authDomain: "crud-6f747.firebaseapp.com",
  databaseURL: "https://crud-6f747.firebaseio.com/cliente",
  storageBucket: "crud-6f747.appspot.com",
};
//firebase.initializeApp(miRuta);
let router=express.Router()
router.use(bodyParser())
router.route('/')
.get(function(request,response){
    items=[]
    miRuta.once("value",function(snap){
        let nuevoCliente=snap.val()
        items.push(nuevoCliente)
        console.log(contador++)
        return response.send(items)
        //response.status(200).send(items)
     })
     //setTimeout(function(){
     //    response.json(items)
     //},1000)
 
})
.post(function(req,res,next){
    miRuta.child(req.body.cedula).set(req.body)
    res.status(200).send('post version 1')
})
.put(function(req,res,next){
 
    miRuta.child(req.body.cedula).set(req.body)
     res.status(200).send(req.body.codigo)
})
.delete(function(req,res,next){
    miRuta.child(req.body.cedula).remove(function(error){
        if (error)
         {
             return res.status(404).send('error de todas')
         }
     })
    return res.status(200).send('ok')
});
 
let app= express()
.use('/todo',router)
.use(express.static(__dirname+'/public'))
.listen(3000)


//escribes tu codigo :v