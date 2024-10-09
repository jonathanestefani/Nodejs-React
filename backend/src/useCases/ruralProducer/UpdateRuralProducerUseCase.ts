import { ValidationRequired } from "./validators/ValidationRequired";
import { IRepository, IValidations } from "../../depencies";
import { AbstractUseCasePut } from "../../abstract/AbstractUseCasePut";

export class UpdateRuralProducerUseCase extends AbstractUseCasePut {
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

        return await this.repository.update(this.data);
    }

}