import { InteractionResource } from "../resources/interaction.resource";
import { Request, Response } from "express";
import { VideoInteractionInput } from "../dtos/videoInteractionInput.dto";
import { ExerciseInteractionInput } from "../dtos/exerciseInteractionInput.dto";
import { InteractionInputDto } from "../dtos/interactionInputDto";
import { Interaction } from "../models/interaction.model";
import { HttpStatusCode } from "../util/http-status-codes.enum";

export class InteractionController {
    private interactionResource: InteractionResource;

    constructor() {
        this.interactionResource = new InteractionResource();
    }

    async findAll(req: Request, res: Response) {
        const interaction: Interaction[] = await this.interactionResource.findAll();
        interaction ? res.status(HttpStatusCode.OK).json(interaction) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
    // async create(req: Request, res: Response) {
    //     if ( req.body.kind == "Video") {
    //         const videoII: VideoInteractionInput = req.body;
    //         this.interactionResource.createVideo(videoII);
    //     }
    //     else if ( req.body.kind == "Exercise") {
    //         const exerciseII: ExerciseInteractionInput = req.body;
    //         this.interactionResource.createExercise(exerciseII);
    //     }
    //
    // }

}
