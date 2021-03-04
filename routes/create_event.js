const express = require('express')
const router = express.Router()
const connection = require('../config/db.js')


router.post('/createevent', (req, res) => {
    //console.log(req.body)

    connection.query('Insert into create_event (userName,eventDetails,venue,place,pid) values(?,?,?,?,?)',
        [req.body.userName, req.body.eventDetails, req.body.venue, req.body.place, req.body.pid], (err, data) => {
           // console.log(req.body)
            if (err) {
                res.status(500).send({ "Status": 500, "Info": "Internal server error :" + err })
                //console.log(req.body)
            }
            else {
                //console.log(req.body)
                res.status(200).send({ "Status": 200, 'Info': 'Created Successfull', data })
            }
        })
})



router.get('/geteventbypid/:pid', (req, res) => {
    connection.query((`SELECT * From create_event WHERE pid= ${req.params.pid}`), (err, result) => {
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

router.put('/updateevent', (req, res) => {
    connection.query(`update create_event set userName=?,eventDetails=?,venue=?,place=? where pid=${req.body.pid}`,
            [req.body.userName, req.body.eventDetails, req.body.venue,req.body.place], (err, data) => {
                if (!err) {


                    if (data) {
                        res.status(200).send({ "Status": 200, "Info": "update event data successfully" })
                    }
                    else {
                        res.status(404).send({ "Status": 404, "Info": "can't update the event data" })
                    }
                } else {
                    res.status(500).send({ "Status": 500, "Info": "Internal server error " })
                }
            })
    
})




router.delete('/deleteevent/:pid', (req,res)=>{
    connection.query('DELETE from create_event WHERE pid=?', [req.params.pid],(err,result) =>{
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