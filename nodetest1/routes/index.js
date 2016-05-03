var express = require('express');
var router = express.Router();

/* GET: aloitus sivu. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET: Hello World sivu */
router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', { title: 'Hello World!' });
});

/*GET: Userlist sivu. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/*GET: New User sivu */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add new user' });
});

/* POST: Uuden käyttäjän lisäys */
router.post('/adduser',function (req, res){
    
    // Asetetaan sisäinen tietokantamuuttuja
    var db = req.db;
    
    // Otetaan lomakkeesta arvot. Nämä ovat kiinni lomakkeen "name" -attribuuteissa
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    
    // Asetetaan collection
    var collection = db.get('usercollection');
    
    //Lisätään tietokantaan:
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // Jos lisäys epäonnistui, palautetaan error
            res.send("There was a problem adding the information to the data-base");
        }
        else {
            // Onnistumisen jälkeen uudelleenohjataan userlist -sivulle
            res.redirect("userlist");
        }
    });
});

// Lähetetään eteenpäin router -olio
module.exports = router;
