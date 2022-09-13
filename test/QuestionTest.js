let mongoose = require("mongoose");
let Question = require('../models/Questions')
let Category = require('../models/Category')

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('/POST Question', () => {
    let question1 = {
        "questionName": "What is Postman?",
        "categoryName": "Postman",
        "asker": {},
        "status": "open",
        "answers": []
    };
    let question2 = {
        "categoryName": "Postman",
        "asker": {},
        "status": "open",
        "answers": []
    };
    it('it should POST a Question', (done) => {
        chai.request(server)
            .post('/devforum/question')
            .send(question1)
            .end((err, res) => {
                res.should.have.status(401);
                question1.should.be.a('object');
                question1.should.have.property('questionName');
                question1.should.have.property('categoryName');
                question1.should.have.property('asker');
                question1.should.have.property('status');
                question1.should.have.property('answers');
                // res.body.errors.should.have.property('pages');
                // res.body.errors.pages.should.have.property('kind').eql('required');
                done();
            });

        it('it should not post the question', (done) => {
            chai.request(server)
                .post("/devforum/question")
                .send(question2)
                .end((error, response) => {
                    // question2.should.have.status(401);
                    question2.body.should.be.a('object');
                    question2.body.should.have.property('questionName').eql('What is Postman?');
                    done();
                })
        })
    });
});

describe('/PUT/:id Question', () => {
    it('it should UPDATE a question given the id', (done) => {
        let question = new Question({
            "questionName": "What is Postman?",
            "categoryName": "Postman",
            "asker": {},
            "status": "open",
            "answers": []
        })
        question.save((err, question) => {
            chai.request(server)
                .put('/devforum/question/:id')
                .send({
                    type: "JavaScript"
                })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    // res.body.should.have.property('message').eql('Book updated!');
                    // res.body.book.should.have.property('year').eql(1950);
                    done();
                });
        });
    });
});

describe('/DELETE/:id question', () => {
    it('it should DELETE a question given the id', (done) => {
        let question = new Question({
            "questionName": "What is Postman?",
            "categoryName": "Postman",
            "asker": {},
            "status": "open",
            "answers": []
        })
        question.save((err, question) => {
            chai.request(server)
                .delete('/devforum/question/:id')
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    // res.body.should.have.property('message').eql('Book successfully deleted!');
                    // res.body.result.should.have.property('ok').eql(1);
                    // res.body.result.should.have.property('n').eql(1);
                    done();
                });
        });
    });
});

describe('/POST Reply to Question', () => {
    it('it should not POST a Reply to Question without pages field', (done) => {
        let question = {
            "questionName": "What is Postman?",
            "categoryName": "Postman",
            "asker": {},
            "status": "open",
            "answers": []
        }
        chai.request(server)
            .post('/devforum/question/:id/answer')
            .send(question)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                // res.body.should.have.property('errors');
                // res.body.errors.should.have.property('pages');
                // res.body.errors.pages.should.have.property('kind').eql('required');
                done();
            });
    });
});

describe('/GET Questions by Text', () => {
    it('it should GET all the questions by text', (done) => {
        chai.request(server)
            .get('/devforum/question/search/:id')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
    });
});

describe('/GET Questions by Category', () => {
    it('it should GET all the questions by text', (done) => {
        chai.request(server)
            .get('/devforum/question/search/category/:id')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
    });
});

describe('/GET List of Questions by Logged in User', () => {
    it('it should GET all the questions by logged in user', (done) => {
        chai.request(server)
            .get('/devforum/question')
            .end((err, res) => {
                res.should.have.status(401);
                // res.body.should.be.a('array');
                // res.body.length.should.be.eql(0);
                done();
            });
    });
});

describe('/GET all question by tag name', () => {
    it('it should get all the questions by tag name', (done) => {
        chai.request(server)
            .get("/question/search/:id")
            .end((error, response) => {
                response.should.have.status(404);
                // response.body.should.be.a('array');
                //response.body.length.should.be.eql(1);
                done();
            })
    })
});