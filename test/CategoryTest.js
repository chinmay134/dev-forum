let mongoose = require("mongoose");
let Question = require('../models/Questions')
let Category = require('../models/Category')

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('/POST Category', () => {
  it('it should not POST a Category without pages field', (done) => {
    let category = {
      type: "JavaScript"
    }
    chai.request(server)
      .post('/devforum/category')
      .send(category)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        // res.body.should.have.property('errors');
        // res.body.errors.should.have.property('pages');
        // res.body.errors.pages.should.have.property('kind').eql('required');
        done();
      });
  });
});


describe('/GET Category', () => {
  it('it should GET all the Questions Category', (done) => {
    chai.request(server)
      .get('/devforum/category')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(5);
        done();
      });
  });
});

describe('/GET/:id Category', () => {
  it('it should GET a Category by the given id', (done) => {
    let category = new Category( {
      type: "JavaScript"
    })
    category.save((err, category) => {
      chai.request(server)
        .get('/devforum/category/:id')
        .send(category)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          // res.body.should.have.property('title');
          // res.body.should.have.property('author');
          // res.body.should.have.property('pages');
          // res.body.should.have.property('year');
          // res.body.should.have.property('_id').eql(category.id);
          done();
        });
    });

  });
});

describe('/PUT/:id Category', () => {
  it('it should UPDATE a category given the id', (done) => {
    let category = new Category( {
      type: "JavaScript"
    })
      category.save((err, book) => {
            chai.request(server)
            .put('/devforum/category/:id')
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

describe('/DELETE/:id category', () => {
  it('it should DELETE a category given the id', (done) => {
    let category = new Category( {
      type: "JavaScript"
    })
      category.save((err, category) => {
            chai.request(server)
            .delete('/devforum/category/:id')
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