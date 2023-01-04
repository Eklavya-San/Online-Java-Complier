const express = require ('express');
const mongoose = require ('mongoose')
const app = express();
const bodyParser = require ('body-parser')
const cors = require('cors')
const Code = require('./model/Code');
const fs = require('fs')
const shell = require('shelljs');
const command = "echo '8779' | sudo -s './codeRunner.sh' ";

app.use(cors())
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send("we are on home ");
})
app.post('/',(req,res)=>{
    const code1 = req.body.code;

    fs.writeFile('Output.java',code1,(err)=>{
        if (err) throw err;
        shell.exec(command);
    })
    
    // console.log(code1);
    const code = new Code ({
        "code": req.body.code
    }
    )
    // res.send(code);
    // console.log(code);

})

app.get('/display',(req,res)=>{
    fs.readFile('ans.txt',(err,data)=>{
        const respCode = new Code ({
            code:data
        })

        res.json(respCode);
})
})
app.get('/home',(req,res)=>{
    res.sendFile("public/index.html",{root:__dirname})
});




app.listen(3000,()=>{
    console.log("server running on 3000")
});