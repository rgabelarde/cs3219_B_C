// Import the dependencies for testing
const Joke = require('../models/jokeModel');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

// Configure chai
chai.use(chaiHttp);
chai.should();
var dummyId;
var usedTitle;

describe("Jokes", () => {
    describe("POST TO EMPTY /", () => {
        // Test to post joke record
        it("should successfully post to jokes record", (done) => {
            chai.request(app)
                .post('/api/jokes/')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    title: "ttest title123" + Math.random(),
                    joke: "testjogsdfgke",
                    author: "Jane Doe"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    dummyId = res.body.data._id;
                    usedTitle = res.body.data.title;
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should fail to post to jokes record due to joke of existing title already in database", (done) => {
            chai.request(app)
                .post('/api/jokes/')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    title: usedTitle,
                    joke: "test should fail ha ha or something",
                    author: "Jane Doe"
                })
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        it("should fail to post to jokes record due to missing param", (done) => {
            chai.request(app)
                .post('/api/jokes/')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    joke: "testjoke",
                    author: "Jane Doe"
                })
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    })

    describe("GET EMPTY /", () => {
        // Test to get all jokes record
        it("should get all jokes record", (done) => {
            chai.request(app)
                .get('/api/jokes/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });

        // Test to get single student record
        it("should successfully get a single joke record", (done) => {
            chai.request(app)
                .get(`/api/jokes/${dummyId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        // Test to get single student record
        it("should fail to get a joke record", (done) => {
            const id = 5;
            chai.request(app)
                .get(`/api/jokes/${id}`)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });

    describe("UPDATE POPULATED/", () => {
        // Test to delete jokes record at id: 1
        it("should successfully update joke at id", (done) => {
            chai.request(app)
                .patch(`/api/jokes/${dummyId}`)
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    joke: "TestUpdate",
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe("DELETE POPULATED/", () => {
        // Test to delete jokes record at id: 1
        it("should successfully delete joke at id", (done) => {
            chai.request(app)
                .delete(`/api/jokes/${dummyId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        // Test to delete invalid joke record at id: 5
        it("should fail to delete joke at id: 5 as id is invalid", (done) => {
            const id = "5";
            chai.request(app)
                .delete(`/api/jokes/${id}`)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });

});