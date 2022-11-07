// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Jokes", () => {
    describe("POST TO EMPTY /", () => {
        // Test to post joke record at id = 1
        it("should successfully post to jokes record at id = 1", (done) => {
            chai.request(app)
                .post('/api/jokes/')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    id: 1,
                    title: "test title",
                    joke: "testjoke",
                    author: "Jane Doe"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should fail to post to jokes record due to duplicate id", (done) => {
            chai.request(app)
                .post('/api/jokes/')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    id: 1,
                    title: "test same id failure",
                    joke: "testjoke",
                    author: "Jane Doe"
                })
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it("should fail to post to jokes record due to missing param", (done) => {
            chai.request(app)
                .post('/api/jokes/')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    id: 2,
                    joke: "testjoke",
                    author: "Jane Doe"
                })
                .end((err, res) => {
                    res.should.have.status(400);
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
                    res.body.should.be.a('object');
                    done();
                });
        });

        // Test to get single student record
        it("should successfully get a single joke record", (done) => {
            const id = 1;
            chai.request(app)
                .get(`/api/jokes/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        // Test to get single student record
        it("should fail to get a single joke record", (done) => {
            const id = 5;
            chai.request(app)
                .get(`/api/jokes/${id}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe("UPDATE POPULATED/", () => {
        // Test to delete jokes record at id: 1
        it("should successfully update joke at id:1", (done) => {
            const id = 1;
            chai.request(app)
                .patch(`/api/jokes/${id}`)
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
        it("should successfully delete joke at id:1", (done) => {
            const id = 1;
            chai.request(app)
                .delete(`/api/jokes/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        // Test to delete non-existent joke record at id: 5
        it("should fail to delete joke at id: 5 as it does not exist yet", (done) => {
            const id = 5;
            chai.request(app)
                .delete(`/api/jokes/${id}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

});
