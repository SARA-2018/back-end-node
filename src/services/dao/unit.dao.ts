import { Unit } from "../../models/unit.model";
import logger from "../../util/logger";
import UnitSchema from "../../schemas/unit.schema";
import { UnitBuilder } from "../../models/builders/unit.builder";

export class UnitDao {
    constructor() {
    }

    async create(name: string): Promise<Unit> {
        const unitEntity = new UnitBuilder(name).build();
        const unit = new UnitSchema(unitEntity);
        return unit.save()
            .then( unit => {
                return new UnitBuilder(unit.get("name")).setId(unit.get("_id")).build();
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async findById(id: number): Promise<Unit> {
        console.log("DAO");
        return await UnitSchema.findById(id)
            .then( unit => {
                console.log("Then");
                console.log(unit);
                return new UnitBuilder(unit.get("name")).setId(unit.get("_id")).build();
            })
            .catch ( err => {
                console.log("Catch");
                return undefined;
            });
    }
    async findByName(name: string): Promise<Unit[]> {
        return await UnitSchema.find({name: new RegExp("^" + name + "[a-zA-Z]*?")})
            .then( units => {
                return units;
            })
            .catch ( err => {
                return undefined;
            });
    }
    async findAll(): Promise<Unit[]> {
        return await UnitSchema.find({})
            .then( units => {
                return units;
            })
            .catch ( err => {
                return undefined;
            });
    }
    async delete(id: number): Promise<boolean> {
        return await UnitSchema.deleteOne({"_id" : id})
            .then( unit => {
                return true;
            })
            .catch ( err => {
                return false;
            });
    }
}
