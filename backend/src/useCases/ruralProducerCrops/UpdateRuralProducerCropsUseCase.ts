import { IRepository, IValidations } from "../../depencies";
import { ValidationRequiredCrops } from "./validators/ValidationRequiredCrops";
import { AbstractUseCasePut } from "../../abstract/AbstractUseCasePut";

export class UpdateRuralProducerCropsUseCase extends AbstractUseCasePut {
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

        return await this.repository.update(this.data);
    }

}