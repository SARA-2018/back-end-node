import { Solution } from "./solution.model";
import { Interaction } from "./interaction.model";

export class Exercise extends Interaction {
    private _id: number;
    private formulation: string;
    private solutions: Solution[];

    constructor() {
        super();
        this.solutions = [];
    }

    setId(id: number): Exercise {
        this._id = id;
        return this;
    }
    setFormulation(formulation: string): Exercise {
        this.formulation = formulation;
        return this;
    }
    setSolutions(solutions: Solution[]): Exercise {
        this.solutions = solutions;
        return this;
    }
    getId(): number {
        return this._id;
    }
    getFormulation(): string {
        return this.formulation;
    }
    getSolutions(): Solution[] {
        return this.solutions;
    }
}
