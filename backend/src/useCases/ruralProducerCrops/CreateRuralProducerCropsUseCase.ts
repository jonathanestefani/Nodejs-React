import { AbstractUseCasePost } from "../../abstract/AbstractUseCasePost";
import { IRepository, IValidations } from "../../depencies";
import { ValidationRequiredCrops } from "./validators/ValidationRequiredCrops";

export class CreateRuralProducerCropsUseCase extends AbstractUseCasePost {
    protected repository: IRepository = this.repository;
    protected validations: IValidations[] = [
        new ValidationRequiredCrops,
    ];

    public async execute() {
        try {
            await this.validation();
        } catch (error) {
            throw error;
        }

        return await this.repository.create(this.data);
    }

}