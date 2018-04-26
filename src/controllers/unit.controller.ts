import { Request, Response } from "express";
import Relation from "../models/relation.model";
import { TypeRelation } from "../models/typeralation.enum";
import { UnitService } from "../services/unit.service";
import { UnitEntity } from "../entities/unit";

export class HomeController {
  unitService: UnitService = new UnitService();
  constructor() {
  }

  forceCreateUnit(req: Request, res: Response): void {
    const unit = "{ type: " + TypeRelation.USE + ", topUnit: new ObjectId(\"5adf231d85dded040f3f6d03\"), lowerUnit: new ObjectId(\"5adf231d85dded040f3f6d03\")}";
    this.unitService.forceGenerate(unit);
    res.send("OK");
  }

  async create(req: Request, res: Response) {
    const unit: UnitEntity = new UnitEntity(req.body.name);
    await res.status(400).json( await this.unitService.create(unit));
  }

  async findByName(req: Request, res: Response) {
    const name: String = req.param("name");
    res.status(200).json(JSON.stringify(await this.unitService.findByName(new RegExp(name + "[a-zA-Z]+"))));
  }
}