import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
    TableIndex,
  } from 'typeorm';

export class RuralProducer1728235322886 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'rural_producer_crops',
            columns: [
              {
                name: 'id',
                type: 'bigint',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
              },
              {
                name: 'rural_producer_id',
                type: 'bigint',
                isNullable: false,
              },
              {
                name: 'type',
                type: 'varchar(255)',
              },
              {
                name: 'total_area',
                type: 'numeric',
              },
              {
                name: 'agricultural_area_hectares',
                type: 'numeric(10,2)',
              },
              {
                name: 'vegetation_area_hectares',
                type: 'numeric(10,2)',
              },
              {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
              },
              {
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()',
              },
              {
                name: 'deleted_at',
                type: 'timestamp',
                default: null,
                isNullable: true,
              },
            ],
          }),
        );
    
        await queryRunner.createIndex(
          'rural_producer_crops',
          new TableIndex({
            name: 'IDX_1728235322886',
            columnNames: ['type'],
            isUnique: false,
          }),
        );
    
        // Add foreign keys
        await queryRunner.createForeignKey(
          'rural_producer_crops',
          new TableForeignKey({
            name: 'fk_rural_producer_id',
            columnNames: ['rural_producer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'rural_producer',
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('rural_producer_crops', 'IDX_1728235322886');
        await queryRunner.dropForeignKey('rural_producer_crops', 'fk_rural_producer_id');
        await queryRunner.dropTable('rural_producer_crops');
      }

}
