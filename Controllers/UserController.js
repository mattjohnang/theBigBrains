const User           = require('../Models/User');
const UserRepo = require('../Data/UserRepo')
const _userRepo = new UserRepo();
var   passport       = require('passport');
const RequestService = require('../Services/RequestService');
// var validator = require("email-validator")





exports.Register = async function(req, res) {
    let reqInfo = RequestService.reqHelper(req);
    

    res.render('User/Register', {errorMessage:"", user:{}, reqInfo:reqInfo})
};

exports.RegisterUser  = async function(req, res){
    let reqInfo = RequestService.reqHelper(req);

    // res.json({user:username, user:mail, user:password})

    const emailValidate = (email) => {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    const passValidate = (pswd) => {
        if (pswd.length >= 6){
            var re = /[A-Z]/;
            return re.test(pswd)
        }
        else{
            return false
        }
            
    };

    var mail            = req.body.email
    var password        = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;
    var username        = req.body.username;
    
    


    if ((password == passwordConfirm) && (emailValidate(mail)) && (passValidate(password))) {

        var newUser = new User({

            email:        req.body.email,
            username:     req.body.username,
        });

        // res.json({user:username, user:email})            
       

        User.register(new User(newUser), req.body.password, 
                function(err, account) {
                    if (err) {
                        let reqInfo = RequestService.reqHelper(req);

                        // res.json({user:username, user:email})            

                        return res.render('User/Register', 
                        { user : newUser, errorMessage: err, 
                          reqInfo:reqInfo });
                    }
                   
                    passport.authenticate('local') (req, res, 
                            function () { res.redirect('/User/SecureArea'); });
                });

    }
    else {
      res.render('User/Register', {user:username,
              errorMessage: "Something went wrong. Please check your password and email.", 
              reqInfo:reqInfo})
    }
};

exports.Login = async function(req, res) {
    let reqInfo      = RequestService.reqHelper(req);
    let errorMessage = req.query.errorMessage; 

    res.render('User/Login', { user:{}, errorMessage:errorMessage, 
                               reqInfo:reqInfo});
}

exports.LoginUser = (req, res, next) => {

  passport.authenticate('local', {
      successRedirect : '/User/SecureArea', 
      failureRedirect : '/User/Login?errorMessage=Invalid login.', 
  }) (req, res, next);
};

exports.Logout = (req, res) => {
    req.logout();
    let reqInfo = RequestService.reqHelper(req);

    res.render('User/Login', { user:{}, isLoggedIn:false, errorMessage : "", 
                               reqInfo:reqInfo});
};

exports.SecureArea  = async function(req, res) {
    let reqInfo = RequestService.reqHelper(req);

    if(reqInfo.authenticated) {

        // res.json({reqInfo:reqInfo})

        res.render('User/SecureArea', {errorMessage:"", reqInfo:reqInfo})
        res.json({reqInfo:reqInfo.username})
    }
    else {
        res.redirect('/User/Login?errorMessage=You ' + 
                     'must be logged in to view this page.')
    }
}


// exports.Profile= async function(req, response){
//     let reqInfo = RequestService.reqHelper(req);

//     console.log(reqInfo.username)
//     if(reqInfo.authenticated) {
        
//         response.render('User/Profile',{  reqInfo:reqInfo,
//          errorMessage: ""})
//     }
//     else {
//         response.redirect('/User/Login?errorMessage=You ' + 
//                      'must be logged in to view this page.')
//     }

// };

// exports.Edit_Profile = async function(req, response){
//     let reqInfo = RequestService.reqHelper(req);
    
//     console.log(reqInfo.username)
//     if(reqInfo.authenticated) {
//         let userObj = await _userRepo.getUserByID(reqInfo._id);
//         console.log(userObj)
//         console.log(reqInfo, "reqInfo")

//         response.render('User/Edit_Profile',{  reqInfo:reqInfo,
//          errorMessage: ""})
//     }
//     else {
//         response.redirect('/User/Login?errorMessage=You ' + 
//                      'must be logged in to view this page.')
//     }

// };

// exports.UpdateProfile = async function(req, response) {
//     let reqInfo = RequestService.reqHelper(req);
//     let username = req.body.username;
//     console.log("Your user name is: " + username);

//     var newUser = new User({
//         firstName:    req.body.firstName,
//         lastName:     req.body.lastName,
//         email:        req.body.email,
//         username:     req.body.username
//     });

//     let responseObject = await _userRepo.update(newUser, reqInfo.email);

//     if(responseObject.errorMessage == "") {
//         response.redirect('Profile');
//     }

//     else {
//         response.render('User/Edit_Profile', { 
//             reqInfo:reqInfo,
//             user:      responseObject.obj, 
//             errorMessage: responseObject.errorMessage });
//     }
// }
