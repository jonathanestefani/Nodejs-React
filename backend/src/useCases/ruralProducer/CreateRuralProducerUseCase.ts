import { ValidationRequired } from "./validators/ValidationRequired";
import { IRepository, IValidations } from "../../depencies";
import { AbstractUseCasePost } from "../../abstract/AbstractUseCasePost";

export class CreateRuralProducerUseCase extends AbstractUseCasePost {
    protected repository: IRepository = this.repository;
    protected validations: IValidations[] = [
        new ValidationRequired,
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