const RequestService = require('../Services/RequestService');



exports.Index = async function(req, res) {
    let reqInfo = RequestService.reqHelper(req);
    // res.json({login:res.body})
    res.render('Home/Index', { reqInfo:reqInfo
                            })
 
    
};

exports.Game = async function(req, res) {
    let reqInfo = RequestService.reqHelper(req);
    // res.json({login:res.body})

    
    res.sendFile('Views/Home/Game.html')
 
};
