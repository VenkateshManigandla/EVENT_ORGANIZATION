const express = require('express')
const router = express.Router()
const connection = require('../config/db.js')



router.post('/registerevent', (req, res) => {

    connection.query('Insert into event_data (FirstName,LastName,Gender,UserName,Password,ConfirmPassword,Phoneno,Email,id) values(?,?,?,?,?,?,?,?,?)',
        [req.body.FirstName, req.body.LastName, req.body.Gender, req.body.UserName, req.body.Password, req.body.ConfirmPassword, req.body.Phoneno, req.body.Email, req.body.id], (err, data) => {

            if (err) {
                res.status(500).send({ "Status": 500, "Info": "Internal server error :" + err })

            }
            else {

                res.status(200).send({ "Status": 200, 'Info': 'Registeration  Successfull', data })
            }
        })
})



router.post('/loginevent', function (req, res) {

    connection.query("SELECT * FROM event_data", [req.body.UserName, req.body.Password], (err, result) => {
        if (err) {
            res.status(500).send({ "Status": 500, "Info": "Internal server error :" + err })
        };
        if (result.length > 0) {
            let userData;
            for (var i = 0; i < result.length; i++) {
                if ((result[i].UserName === req.body.UserName) && (result[i].Password === req.body.Password)) {
                    userData = result[i]
                }

            }
            if (userData) {

                res.status(200).send({ "Status": 200, "Info": "Login Successfull" })

            } else {
                res.status(401).send({ "Status": 401, "Info": "Invalid crediantals" })
            }
        }
        else {
            res.status(404).send({ "Status": 404, "Info": "user not found" })

        }
    });

});

router.get('/getdata', (req, res) => {

    connection.query(('SELECT * from event_data'), (err, result) => {
        if (!err) {
            if (result.length > 0) {
                res.status(200).send({ "Status": 200, "Info": result })

            }
            else
                res.status(404).send({ "Status": 404, "Info": "can not fetch the userpost data" })
        } else {
            res.status(500).send({ "Status": 500, "Info": "Internal server error :" + err })
        }
    })
})

router.get('/getdatabyid/:id', (req, res) => {
    connection.query((`SELECT * From event_data WHERE id= ${req.params.id}`), (err, result) => {
        if (!err) {
            if (result.length > 0) {
                res.status(200).send({ "Status": 200, "Info": result })
            }
            else
                res.status(404).send({ "Status": 404, "Info": "can not fetch the userpost data" })
        } else {
            res.status(500).send({ "Status": 500, "Info": "Internal server error :" + err })
        }
    })
})

router.put('/updatedata/:id', (req, res) => {
    connection.query(('update event_data set UserName=? where id=?'), [req.body.UserName, req.params.id], (err, result) => {
        if (!err) {
            if (result) {
                res.status(200).send({ "Status": 200, "Info": 'Data updated successfully' })
            }

        } else {
            res.status(404).send({ "Status": 404, "Info": "can't update " })
        }

        res.status(500).send({ "Status": 500, "Info": "Internal server error " })
    })
})


router.delete('/deletedata/:id', (req,res)=>{
    connection.query('DELETE from event_data WHERE id=?', [req.params.id],(err,result) =>{
        if(!err){
            if(result){
                res.status(200).send({"Status" :200, "Info" : 'Data deleted Successfully'})
            }
            else{
                res.status(404).send({ "Status": 404, "Info": "unable to delete post" })
            }
            res.status(500).send({ "Status": 500, "Info": "Internal server error " })
        }
    })
})



module.exports = router;