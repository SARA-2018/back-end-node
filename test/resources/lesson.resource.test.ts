import logger from "../../src/util/logger";
import { DbService } from "../../src/services/db.service";
import { LessonResource } from "../../src/resources/lesson.resource";

const chai = require("chai");
const expect = chai.expect;
const dbService: DbService = new DbService();
const lessonResource: LessonResource = new LessonResource();

describe("true", () => {
    it("true", async (done) => {
        expect(0).to.equal(0);
        done();
    });
});

