const User           = require('../Models/User');
const UserRepo = require('../Data/UserRepo')
const _userRepo = new UserRepo();
var   passport       = require('passport');
const RequestService = require('../Services/RequestService');


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

    let username = req.body.reqInfo

    if(reqInfo.authenticated) {
        // res.json({reqInfo:reqInfo.username})

        res.json({reqInfo:reqInfo})

        res.render('User/SecureArea', {errorMessage:"", reqInfo:reqInfo})
        // res.json({reqInfo:reqInfo.username})
    }
    else {
        res.redirect('/User/Login?errorMessage=You ' + 
                     'must be logged in to view this page.')
    }
}
