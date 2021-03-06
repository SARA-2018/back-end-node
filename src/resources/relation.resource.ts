import { RelationDao } from "../daos/relation.dao";
import { Relation } from "../models/relation.model";
import { RelationInputDto } from "../dtos/input/relationInput.dto";
import { Unit } from "../models/unit.model";
import logger from "../utils/logger";

export class   RelationResource {
    private relationDao: RelationDao;

    constructor() {
        this.relationDao = new RelationDao();
    }

    async findAll(): Promise<Relation[]> {
        return await this.relationDao.findAll();
    }
    async findByLowerUnit(unitId: string): Promise<Relation[]> {
        return await this.relationDao.findByLowerUnit(unitId);
    }
    async findByTopUnit(unitId: string): Promise<Relation[]> {
        return await this.relationDao.findByTopUnit(unitId);
    }
    async create(relationDto: RelationInputDto): Promise<Relation> {
        return await this.relationDao.create(relationDto);
    }
    async deleteByConexion(unit: Unit): Promise<boolean> {
        const relationsLower: Relation[] = await this.findByLowerUnit(unit.getId());
        const relationsTop: Relation[] = await this.findByTopUnit(unit.getId());
        let sucessDeleteLowers: boolean = true;
        let sucessDeleteTops: boolean = true;
        if (relationsLower) {
            for (let i = 0 ; i < relationsLower.length ; i++ ) {
                const success: boolean = await this.delete(relationsLower[i].getId());
                sucessDeleteLowers = sucessDeleteLowers && success;
            }
        }
        if (relationsTop) {
            for (let i = 0 ; i < relationsTop.length ; i++ ) {
                const success: boolean = await this.delete(relationsTop[i].getId());
                sucessDeleteTops = sucessDeleteTops && success;
            }
        }
        return sucessDeleteLowers && sucessDeleteTops;
    }
    async delete(id: string): Promise<boolean> {
        return await this.relationDao.delete(id);
    }
    async findIdByTopUnit(unitId: string): Promise<string[]> {
        const relations: Relation[] = await this.findByTopUnit(unitId);
        const topUnits: string[] = [];
        for ( let i = 0; i < relations.length ; i++) {
            topUnits.push(relations[i].getLowerUnit().getId());
        }
        return topUnits;
    }
    async findIdByLowerUnit(unitId: string): Promise<string[]> {
        const relations: Relation[] = await this.findByLowerUnit(unitId);
        const topUnits: string[] = [];
        if (relations.length) {
            for ( let i = 0; i < relations.length ; i++) {
                topUnits.push(relations[i].getTopUnit().getId());
            }
        }
        return topUnits;
    }
    async findByTopAndLowerUnit(topUnit: Unit, lowerUnit: Unit): Promise<Relation[]> {
        return this.relationDao.findByTopAndLowerUnit(topUnit, lowerUnit);
    }
    async getRelations(units: Unit[]): Promise<Relation[]> {
        const resultRelations: Relation[] = [];
        for (let i = 0; i < units.length; i++) {
            for (let j = 0; j < units.length; j++) {
                const peersRelations: Relation[] = await this.findByTopAndLowerUnit(units[i], units[j]);
                if (peersRelations && peersRelations.length > 0) {
                    const existingRelation: Relation = resultRelations.find(element => {
                        return peersRelations[i] === element;
                    });
                    if (!existingRelation) {
                        resultRelations.push(peersRelations[0]);
                    }
                }
            }
        }
        return resultRelations;
    }
}

