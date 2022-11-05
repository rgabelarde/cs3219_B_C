// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Jokes", () => {
    describe("POST /", () => {
        // Test to get all jokes record
        it("should successfully post to jokes record", (done) => {
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
});


describe("Jokes", () => {
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
        it("should get a single joke record", (done) => {
            const id = 1;
            chai.request(app)
                .get(`/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });


        // Test to get single joke record
        it("should not get a single joke record", (done) => {
            const invalid_joke_id = 5;
            chai.request(app)
                .get(`/api/jokes/${invalid_joke_id}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});
