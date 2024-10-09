import { ErrorCustomization, i18n, IRepository, AbstractUseCases } from "../../depencies";

export class DeleteRuralProducerCropsUseCase extends AbstractUseCases {
    protected repository: IRepository = this.repository;

    public async execute() {
        try {
            await this.repository.delete(this.data);
        } catch (error) {
            throw new ErrorCustomization('', [i18n.__('crud.delete_error')]);
        }

        return true;
    }
}