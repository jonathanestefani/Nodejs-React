import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
    TableIndex,
  } from 'typeorm';

export class RuralProducer1728235322885 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'rural_producer',
            columns: [
              {
                name: 'id',
                type: 'bigint',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
              },
              {
                name: 'producer_name',
                type: 'varchar(255)',
              },
              {
                name: 'inscrition',
                type: 'varchar(255)',
              },
              {
                name: 'farm_name',
                type: 'varchar(255)',
              },
              {
                name: 'state_id',
                type: 'bigint',
                isNullable: false,
              },
              {
                name: 'city_id',
                type: 'bigint',
                isNullable: false,
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
          'rural_producer',
          new TableIndex({
            name: 'IDX_1728235322885_1',
            columnNames: ['producer_name'],
            isUnique: false,
          }),
        );

        await queryRunner.createIndex(
          'rural_producer',
          new TableIndex({
            name: 'IDX_1728235322885_2',
            columnNames: ['inscrition'],
            isUnique: false,
          }),
        );

        await queryRunner.createIndex(
          'rural_producer',
          new TableIndex({
            name: 'IDX_1728235322885_3',
            columnNames: ['farm_name'],
            isUnique: false,
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('rural_producer', 'IDX_1728235322885_1');
        await queryRunner.dropIndex('rural_producer', 'IDX_1728235322885_2');
        await queryRunner.dropIndex('rural_producer', 'IDX_1728235322885_3');
        await queryRunner.dropTable('rural_producer');
      }

}
