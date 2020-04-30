// Allowed to use 'class' structure on server if
// "use strict included."
"use strict";

class RequestService {
    constructor() {
    }

    reqHelper(req) {
        // Send username and login status to view if authenticated.
        if(req.isAuthenticated()) {
            return { authenticated: true, username : req.user.username, firstName: req.user.firstName, 
                lastName: req.user.lastName, email: req.user.email, id: req.user._id };
        }
        // Send logged out status to form if not authenticated.
        else {  
            return { authenticated: false };
        }
        
    }
}
module.exports = new RequestService();
