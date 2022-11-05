// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Jokes", () => {
    describe("GET /", () => {
        // Test to get all jokes record
        it("should get all jokes record", (done) => {
            chai.request(app)
                .get('/api/jokes')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        // Test to get single joke record
        it("should get a single joke record", (done) => {
            const valid_joke_id = 1;
            chai.request(app)
                .get(`/api/jokes/${valid_joke_id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        // Test to get single joke record
        it("should not get a single student record", (done) => {
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
