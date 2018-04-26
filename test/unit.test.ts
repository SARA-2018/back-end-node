import request from "supertest";
import app from "../src/app";
import {WrapperResponse} from "../src/models/wrapper-response.model";
import {HttpStatusCode} from "../src/util/http-status-codes.enum";

const chai = require("chai");
const expect = chai.expect;

describe("POST /unit", () => {
    it("should return 200 OK", (done) => {
      return request(app).post("/unit")
        .send({"name": "UnidadDePrueba"})
        .end( (err, res) => {
          expect("UnidadDePrueba").to.equal(res.body.name);
          done();
        });
    });
  });


describe("GET /unit", () => {
    it("should return 200 OK and entity", (done) => {
        return request(app).get("/unit")
            .end( (err, res) => {
                const wraperResponse: WrapperResponse = res.body;
                expect(HttpStatusCode.OK).to.equal(wraperResponse.statusCode);
                expect(52).to.equal(wraperResponse.entities.length);
                done();
            });
    });
});