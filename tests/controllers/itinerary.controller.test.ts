import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/utils/http-status-codes.enum";
import logger from "../../src/utils/logger";
import { ItineraryInputDto } from "../../src/dtos/input/itineraryInput.dto";
import { ItineraryOutputDto } from "../../src/dtos/output/itineraryOutput.dto";

const chai = require("chai");
const expect = chai.expect;

describe("POST /itinerary", () => {
    it("should return: 201 - CREATED + Itinerary", (done) => {
        const itineraryInputDto: ItineraryInputDto = {"name": "Itinerario10"};
        return request(app).post("/itinerary")
            .send(itineraryInputDto)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                const itineraryOutputDto: ItineraryOutputDto = res.body;
                expect(itineraryOutputDto.name).to.equal(itineraryInputDto.name);
                expect(itineraryOutputDto.formations.length).to.equal(0);
                done();
            });
    });
});
describe("GET /itinerary/:id", () => {
    it("should return: 200", (done) => {
        const itineraryId = "515d87b4b122cf35117198c2";
        return request(app).get("/itinerary/" + itineraryId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const itineraryOutputDto: ItineraryOutputDto = res.body;
                expect(itineraryOutputDto.name).to.equal("Itinerario0");
                expect(itineraryOutputDto.formations.length).to.equal(0);
                done();
            });
    });
});
describe("GET /itinerary/:id", () => {
    it("should return: 200", (done) => {
        const itineraryId = "415d87b4b122cf35117198c3";
        return request(app).get("/itinerary/" + itineraryId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const itineraryOutputDto: ItineraryOutputDto = res.body;
                expect(itineraryOutputDto.name).to.equal("Itinerario1");
                expect(itineraryOutputDto.formations.length).to.equal(1);
                done();
            });
    });
});
describe("GET /itinerary/:id", () => {
    it("should return: 200", (done) => {
        const itineraryId = "315d87b4b122cf35117198c4";
        return request(app).get("/itinerary/" + itineraryId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const itineraryOutputDto: ItineraryOutputDto = res.body;
                expect(itineraryOutputDto.name).to.equal("Itinerario2");
                expect(itineraryOutputDto.formations.length).to.equal(1);
                done();
            });
    });
});
describe("GET /itinerary/:id", () => {
    it("should return: 200", (done) => {
        const itineraryId = "215d87b4b122cf35117198c5";
        return request(app).get("/itinerary/" + itineraryId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const itineraryOutputDto: ItineraryOutputDto = res.body;
                expect(itineraryOutputDto.name).to.equal("Itinerario3");
                expect(itineraryOutputDto.formations.length).to.equal(2);
                done();
            });
    });
});
describe("GET /itinerary/:id", () => {
    it("should return: 200", (done) => {
        const itineraryId = "115d87b4b122cf35117198c5";
        return request(app).get("/itinerary/" + itineraryId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const itineraryOutputDto: ItineraryOutputDto = res.body;
                expect(itineraryOutputDto.name).to.equal("Itinerario4");
                expect(itineraryOutputDto.formations.length).to.equal(2);
                done();
            });
    });
});
describe("DELETE /itinerary/:id", () => {
    it("should return: 204", (done) => {
        const itineraryId = "426d87b4b122cf35117198c6";
        return request(app).delete("/itinerary/" + itineraryId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});
describe("DELETE /itinerary/:id", () => {
    it("should return: 204", (done) => {
        const itineraryId = "326d87b4b122cf35117198c7";
        return request(app).delete("/itinerary/" + itineraryId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});
