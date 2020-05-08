var chai     = require('chai')
var chaiHttp = require('chai-http');
var app      = require('./app.js');

chai.use(chaiHttp);
chai.should();

describe("Users", () => {

    describe("functions in UserController", () => {
        it("tests user information returned by API", (done )=> {
            chai.request(app)
            .post(`/User/RegisterUser`)
            .send({'username': 'bob', 'email': 'emia@wer.com', 'password': 'asdfasdfDdff'})
            .end((err, res) => {
                // console.log("Showing output.")
                // console.log(JSON.stringify(res.body));
                let username = res.body.username;
                done();
            });

        });

        it("test secure area username is shown", (done) => {
            chai.request(app)
            .get(`/User/SecureArea`)
            // .send({'username': 'bob'})
            .end((err, res) => {
                res.body.should.be.a('object')

                done();

            });



        });



        it("login", (done) => {
            chai.request(app)
            .get(`/User/Login`)
            .end((err, res) => {
                // res.body.should.be.a('object')

                done();

            });



        });


        it("login a user", (done )=> {
            chai.request(app)
            .post(`/User/LoginUser`)
            .send({'username': 'user', 'password':'Password' })
            .end((err, res) => {
                // console.log("Showing output.")
                // console.log(JSON.stringify(res.body));
                let username = res.body.username;
                done();
            });

        });



    });


});