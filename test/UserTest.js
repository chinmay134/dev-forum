let mongoose = require("mongoose");
let Question = require('../models/Questions')
let Category = require('../models/Category')
let User = require('../models/User')

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('/login', () => {
    const Login = {
        userName: "avdhoot123",
        password: "Avdhoot123",
    };
    it('it should SignUp the page', (done) => {
        chai.request(server)
            .post("/user/login")
            .send(Login)
            .end((error, response) => {
                response.should.have.status(404);
                Login.should.have.a.property('userName');
                Login.should.have.a.property('password');
                response.body.should.be.a('object');
                done();
            })
    })
})

describe('/user', () => {

    const user = {

        firstName: "sunil",
        lastName: "Avhad",
        userName: "abhi123",
        password: "sunil123",
        email: "avdhootavhad@gmail.com",
        phone: "9168428019"

    };

    it('it should register the page', (done) => {

        chai.request(server)

            .post("/api/user")

            .send(user)

            .end((error, response) => {

                response.should.have.status(200);
                user.should.have.a.property('firstName');
                user.should.have.a.property('lastName');
                response.body.should.be.a('object');

                done();

            })

    })

});


describe('/logout ', () => {
    const user = {}
    it('it should logout the page', (done) => {
        chai.request(server)
            .delete("/api/logout")
            .send(user)
            .end((error, response) => {
                response.should.have.status(404);
                response.body.should.be.a('object');
                done();
            });
    });
});

describe('/user/:id ', () => {
    const Login = {
        userName: "avdhoot123",
        password: "Avdhoot123",
    };
    it('it should return the information of user ', (done) => {
        chai.request(server)
            .get("/api/user/1")
        // res.send(200).json({
        //     user: result
        // })
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            })
    })
})

