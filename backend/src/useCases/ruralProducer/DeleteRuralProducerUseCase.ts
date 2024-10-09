import { ErrorCustomization, i18n, IRepository, AbstractUseCases } from "../../depencies";
import { DeleteRuralProducerCropsUseCase } from "../ruralProducerCrops/DeleteRuralProducerCropsUseCase";
import { RuralProducerCropsRepository } from "../../repositories/RuralProducerCropsRepository";

export class DeleteRuralProducerUseCase extends AbstractUseCases {
    protected repository: IRepository = this.repository;

    public async execute(): Promise<boolean> {
        try {
            await new DeleteRuralProducerCropsUseCase(
                (new RuralProducerCropsRepository()).setConfig(this.repository.getConfig()),
                this.data
            ).execute();
        } catch (error: any) {
            console.log(error.message)
        }

        try {        
            await this.repository.delete(this.data);
        } catch (error: any) {
            throw new ErrorCustomization('', [{"message": i18n.__('crud.delete_error')}]);
        }

        return true;
    }

}