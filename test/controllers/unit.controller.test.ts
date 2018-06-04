import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import { DbService } from "../../src/services/db.service";
import logger from "../../src/util/logger";
import { UnitOutputDto } from "../../src/dtos/unitOutput.dto";
import { NeighborsOutputDto } from "../../src/dtos/neighborsOutput.dto";
import { RelatedUnitsOutputDto } from "../../src/dtos/relatedUnitsOutput.dto";

const chai = require("chai");
const expect = chai.expect;

const dbService: DbService = new DbService();


describe("POST /unit", () => {
    it("should return: 201 - CREATED + Unit", (done) => {
        return request(app).post("/unit")
            .send({"name": "Unidad2000" })
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                const unitOutputDto: UnitOutputDto = res.body;
                expect(unitOutputDto.name).to.equal("Unidad2000");
                done();
            });
    });
});

describe("DELETE /unit/99999", () => {
    it("should return 404 - NOT FOUND", (done) => {
        const unitCode = 99999;
        return request(app).delete("/unit/" + unitCode)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NOT_FOUND);
                done();
            });
  });
});

describe("DELETE /unit/60", () => {
    it("should return 204 - NOT CONTENT", (done) => {
        const unitCode = 60;
        return request(app).delete("/unit/" + unitCode)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});

describe("DELETE /unit/52", () => {
    it("should return 204 - NOT CONTENT", (done) => {
        const unitCode = 52;
        return request(app).delete("/unit/" + unitCode)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});

describe("DELETE /unit/58", () => {
    it("should return 204 - NOT CONTENT", (done) => {
        const unitCode = 58;
        return request(app).delete("/unit/" + unitCode)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});

describe("GET /unit", () => {
    it("should return 200 - OK and Unit[]", (done) => {
        return request(app).get("/unit")
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const unitOutputDtos: UnitOutputDto[] = res.body;
                expect(unitOutputDtos.length).to.be.above(9);
                done();
            });
    });
});

describe("GET /unit/61", () => {
    it("should return 200 - OK and Unit", (done) => {
        const unitCode = 61;
        return request(app).get("/unit/" + unitCode)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const unitOutputDto: UnitOutputDto = res.body;
                expect(unitOutputDto.code).to.equal(unitCode);
                done();
            });
    });
});

describe("GET /unit/search?name=Unidad", () => {
    it("should return 200 - OK and Unit[]", (done) => {
        const nameToSearch = "Unidad";
        return request(app).get("/unit/search?name=" + nameToSearch)
        .end( (err, res) => {
            expect(res.status).to.equal(HttpStatusCode.OK);
            const relatedUnitsOutputDtos: RelatedUnitsOutputDto[] = res.body;
            expect(relatedUnitsOutputDtos.length).to.be.above(9);
            done();
        });
  });
});

describe("GET /unit/friends/51", () => {
    it("should return 200 - OK and Unit[]", (done) => {
        const unitCode = 51;
        return request(app).get("/unit/friends/" + unitCode)
            .end( (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const cincoNivelesOutputDto: NeighborsOutputDto = res.body;
                expect(cincoNivelesOutputDto.unit.code).to.equal(51);
                expect(cincoNivelesOutputDto.topUnits[0].code).to.equal(50);
                expect(cincoNivelesOutputDto.lowerUnits.length).to.equal(3);
                expect(cincoNivelesOutputDto.relations.length).to.equal(4);
                done();
          });
    });
});

describe("GET /unit/friends/99999", () => {
    it("should return 404 - NOT_FOUND", (done) => {
        const unitCode = 99999;
        return request(app).get("/unit/friends/" + unitCode)
            .end( (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NOT_FOUND);
                done();
            });
    });
});

