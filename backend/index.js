const express = require('express');  
const app = express();
const config = require('./config');
const {Op} = require("sequelize");
const User = require('./models/User');
const Event = require('./models/Event');
const Registration = require('./models/Registration');
const Journey = require('./models/Journey');
const Leg = require('./models/Leg');
const Contact = require('./models/Contact');

const cors =  require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const multer = require('multer');

app.use(cors());
app.use(express.json());
app.use('/images', express.static('uploads')); //making the uploads folder publicly accessible
app.use(express.urlencoded({extended: false}));

config.authenticate().then(() => {
    console.log('Database connected!');
}).catch((err) => {
    console.log(err);
});

//Configuring our upload folder and upload filename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const RegStatus = {
    N_A: 0,
    INVITED: 1,
    UNINVITED: 2,
    REGISTERED: 3,
    REG_PENDING_CONF: 4,
    REG_CXLD: 5
  }

const ActionsByOrg = {
    VIEW_DETAILS: 1,
    UN_INVITE: 2,
    CONFM_REGIST: 3,
    CANCEL_REGIST: 4,
    EDIT_NOTE: 5
}

const ActionOnContact = {
    CONFIRM: 1,
    DECLINE: 2,
    DELETE: 3
}

const ContactStatus = {
    PENDING: 1,
    CONFIRMED: 2,
    DECLINED: 3
}

Event.hasMany(Registration, {
    foreignKey: 'eventID'
});
Registration.belongsTo(Event,{
    foreignKey: 'eventID'
});

Journey.hasMany(Leg, {
    foreignKey: 'journeyID'
});
Leg.belongsTo(Journey,{
    foreignKey: 'journeyID'
});

app.post('/signup', multer({storage}).single('image'),function(req, res){

 
    let plainPassword = req.body.passWord;

    bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
        
        let user_data = {
            userName: req.body.userName,
            email: req.body.email,
            phone: req.body.phone,
            passWord: hash,
            image: req.file ? req.file.filename : null
        };

        User.create(user_data).then((result) => {
            console.log("User.create(user_data).then((result)");
            console.log(result);
            res.status(200).send(result);
        }).catch((err) => {
            console.log("catch((err)");
            console.log(err);
            res.status(500).send(err);
        });

    });    
});

app.post('/login', function(req, res){

    console.log("req.body");
    console.log(req.body);

    let userName = req.body.userName;
    let passWord = req.body.passWord;
    let user_data = {
        where: {userName: userName} // {userName: userName}
    }

    console.log("user_data");
    console.log(user_data);
    
    //Find a user that corresponds to the user name
    User.findOne(user_data).then((result) => {
        console.log("User.findOne(user_data).then((result)");
        console.log(result);
        if(result){
            console.log(result);
            bcrypt.compare(passWord, result.passWord, function(err, output) {
                console.log("bcrypt.compare(passWord, result.passWord, function(err, output)");
                console.log(output);
                if(output){
                    res.status(200).send(result);
                }else{
                    res.status(400).send('Incorrect password.');
                }
            });            
        }
        else{
            res.status(404).send('User does not exist.');
        }
    }).catch((err) => {
        res.status(500).send(err);
    });
        
});


//routes or endpoints
app.get('/users', function(req, res){
    User.findAll().then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.status(500).send(err);
    });
});

app.get('/users/:username', function(req, res){
    //Find 
    let thisUsername = req.params.username;
    let data = {
        where:{
            userName: thisUsername
        }
    }

    console.log("thisUsername");
    console.log(thisUsername);

    User.findOne(data).then(function(result){
        console.log("findUserIDByName result");
        console.log(result);

        res.status(200).send(result);

    }).catch(function(err){
        res.status(500).send(err);
    });
});

/*
app.post('/users', function(req, res){
    let user = req.body;
    user.image = req.file ? req.file.filename : null

    User.create(user).then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.send(err);
    })
});
*/

app.get('/contacts', function(req, res){
    Contact.findAll().then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.status(500).send(err);
    });
});

app.get('/contacts/:userID', function(req, res){

    let thisUserID = req.params.userID;
    let data = {
        where:{
            userID: thisUserID
        },
        order: [
            ['status', 'ASC'],
            ['reqDirection', 'DESC']
        ]
    }
    Contact.findAll(data).then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.status(500).send(err);
    });
});

app.get('/contacts/:userID/:contactUserID', function(req, res){
    //Find 
    let thisUserID = req.params.userID;
    let thisContactUserID = req.params.contactUserID;
   
    let data = {
        where:{
            userID: thisUserID,
            contactUserID: thisContactUserID
        }
    }
    Contact.findOne(data).then(function(result){
        res.status(200).send(result);
        console.log(result);
    }).catch(function(err){
        res.status(500).send(err);
    });
});

app.post('/contacts', function(req, res){
    let contact = req.body;
    Contact.create(contact).then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.send(err);
    })
});

app.patch('/contacts', function(req, res){

    console.log("Req");
    console.log(req.body);
    let instruction = req.body;
    let actionID = parseInt(instruction.actionID);
    let thisUserID = instruction.userID;
    let thisContactUserID = instruction.contactUserID;
    
    let thisStatus;

    switch(actionID) {
        case ActionOnContact.CONFIRM:
            thisStatus = ContactStatus.CONFIRMED;
            break;
        case ActionOnContact.DECLINE:
            thisStatus = ContactStatus.DECLINED;
     }

    console.log("actionID, thisStatus ");
    console.log(actionID);

    console.log(thisStatus);
    
        
    switch(actionID) {
        case ActionOnContact.CONFIRM:
        case ActionOnContact.DECLINE:
            Contact.update (
                {status: thisStatus}, 
                {
                    where:{
                        userID: thisUserID,
                        contactUserID: thisContactUserID
                    }
                }
            ).then(function(result){
                console.log(result);
            }).catch(function(err){
                console.log("err");
            });

            Contact.update (
                {status: thisStatus}, 
                {
                    where:{
                        userID: thisContactUserID,
                        contactUserID: thisUserID
                    }
                }
            ).then(function(result){
                res.status(200).send(result);
                console.log("updated");
            }).catch(function(err){
                res.status(500).send(err);
                console.log("err");
            });
    }
});

app.delete('/contacts/:relationID', function(req, res){
    let relationID = req.params.relationID;
    Contact.findByPk(relationID).then((result) => {
        result.destroy().then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err);
        });
    }).catch((err) => {
        res.send(err);
    });
});

app.get('/eventsByGoer/:goerId', function(req, res){
    let goerId = req.params.goerId;
    let data = {
        where:{
            userID: goerId
        },
        order: [
            [Event, 'dateFrom', 'ASC'],
        ],
        include: Event
    }
    Registration.findAll(data).then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.status(500).send(err);
    });
});

app.get('/eventsAndRegs/:orgID', function(req, res){
    let orgID = req.params.orgID;

    let data = {
        where:{
            orgID: orgID
        },
        order: [
            ['dateFrom', 'ASC'],
        ],
        include: Registration
    }

    Event.findAll(data).then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.status(500).send(err);
    });
});

app.post('/events', multer({storage}).single('image'), function(req, res){
    let event = req.body;
    event.image = req.file ? req.file.filename : null

console.log("event");
console.log(event);

    Event.create(event).then(function(result){
        console.log("result");
        console.log(result);
        res.status(200).send(result);
    }).catch(function(err){
        res.send(err);
    })
});

app.put('/events/:eventID',  multer({storage}).single('image'), function(req, res){
   
    let eventID = req.params.eventID;

    //Find 
    Event.findByPk(eventID).then(function(result){
        //Check if found
        if(result){
            Object.assign(result, req.body);
            result.image = req.file ? req.file.filename : null

           console.log(" Object.assign(result");
           console.log(result);

            //Save to DB
            result.save().then(function(result){
                res.status(200).send(result);
            }).catch(function(err){
                res.status(500).send(err);
            });
        }
        else {
            res.status(404).send(result);
        }

    }).catch(function(err){
        res.status(500).send(err);
    });
});

app.get('/registrations', function(req, res){
    Registration.findAll().then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.status(500).send(err);
    });
});

app.post('/registrations', function(req, res){
    let regsInitInfo = req.body;
    Registration.bulkCreate(regsInitInfo).then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.send(err);
    })
});

app.put('/registrations/:regID', function(req, res){
   
    let regID = req.params.regID;

    //Find 
    Registration.findByPk(regID).then(function(result){
        //Check if found
        if(result){
            Object.assign(result, req.body);

            //Save to DB
            result.save().then(function(result){
                res.status(200).send(result);
            }).catch(function(err){
                res.status(500).send(err);
            });
        }
        else {
            res.status(404).send('Record not found');
        }

    }).catch(function(err){
        res.status(500).send(err);
    });
});

app.patch('/registrations', function(req, res){

    console.log("Req");
    console.log(req.body);
    let instructions = req.body;
    let actionID = parseInt(instructions.actionID);
    let regIDs = instructions.regIDs;
    let thisnoteByOrg = instructions.noteByOrg;    
    let thisStatus;

    switch(actionID) {
        case ActionsByOrg.CONFM_REGIST:
            thisStatus = RegStatus.REGISTERED;
            break;
        case ActionsByOrg.UN_INVITE:
            thisStatus = RegStatus.UNINVITED;
            break;
        case ActionsByOrg.CANCEL_REGIST:
            thisStatus = RegStatus.REG_CXLD;
    }

    console.log("actionID, regIDs, thisStatus ");
    console.log(actionID);
    console.log(regIDs);
    console.log(thisStatus);
    
        
    switch(actionID) {
        case ActionsByOrg.UN_INVITE:
        case ActionsByOrg.CONFM_REGIST:
        case ActionsByOrg.CANCEL_REGIST:
            Registration.update (
                {status: thisStatus}, 
                {
                    where:{
                        regID: {
                            [Op.in]:  regIDs,
                        } 
                    }
                }
            ).then(function(result){
                res.status(200).send(result);
                console.log("updated");
            }).catch(function(err){
                res.status(500).send(err);
                console.log("err");
            });
            break;
            
        case ActionsByOrg.EDIT_NOTE:
            Registration.update (
                {noteByOrg: thisnoteByOrg}, 
                {
                    where:{
                        regID: {
                            [Op.in]:  regIDs,
                        } 
                    }
                }
            ).then(function(result){
                res.status(200).send(result);
                console.log("updated");
            }).catch(function(err){
                res.status(500).send(err);
                console.log("err");
            });
    }
});



app.get('/journeys', function(req, res){
    Journey.findAll().then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.status(500).send(err);
    });
});

app.post('/journeys', function(req, res){
    let journey = req.body;
    Journey.create(journey).then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.send(err);
    })
});

app.get('/journeyLegs', function(req, res){
    Leg.findAll().then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.status(500).send(err);
    });
});

app.post('/journeyLegs', function(req, res){
    let leg = req.body;
    Leg.create(leg).then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.send(err);
    });
});

app.put('/journeyLegs/:legID', function(req, res){
   
    let legID = req.params.legID;

    //Find the task 
    Leg.findByPk(legID).then(function(result){
        //Check if found
        if(result){
            Object.assign(result, req.body);

            //Save to DB
            result.save().then(function(result){
                res.status(200).send(result);
            }).catch(function(err){
                res.status(500).send(err);
            });
        }
        else {
            res.status(404).send('Record not found');
        }

    }).catch(function(err){
        res.status(500).send(err);
    });
});

app.get('/journeysAndLegs/:goerId', function(req, res){
    let goerId = req.params.goerId;
    let data = {
        where:{
            userID: goerId
        },
        order: [
            [Leg, 'dateFrom', 'ASC'],
        ],
        include: Leg
    }
    Journey.findAll(data).then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.status(500).send(err);
    });
});

app.get('/journeyAndLegs/:goerId/:journeyID', function(req, res){
   
    console.log("journeysAndLegs/:goerId/:journeyID");
  //  console.log(thisJourneyLegs);

    let goerId = req.params.goerId;
    let journeyID = req.params.journeyID;
    let data = {
        where:{
            userID: goerId,
            journeyID: journeyID
        },
        include: Leg
    }
    Journey.findAll(data).then(function(result){
        console.log("result");
        console.log(result);
        res.status(200).send(result);
    }).catch(function(err){
        res.status(500).send(err);
    });
});

/*
app.delete('/tasks/:id', function(req, res){
    let id = req.params.id;
    Task.findByPk(id).then((result) => {
        result.destroy().then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err);
        });
    }).catch((err) => {
        res.send(err);
    });
});
*/

app.listen(3000, function(){
    console.log('Server running on port 3000...');
});