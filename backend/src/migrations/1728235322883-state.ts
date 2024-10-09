import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class State1728235322883 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'state',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'region_id',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'acronym',
            type: 'varchar(255)',
          },
          {
            name: 'name',
            type: 'varchar(255)',
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
      'state',
      new TableIndex({
        name: 'IDX_1728235322883',
        columnNames: ['region_id'],
        isUnique: false,
      }),
    );

    // Add foreign keys
    await queryRunner.createForeignKey(
      'state',
      new TableForeignKey({
        name: 'fk_region_id',
        columnNames: ['region_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'region',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('state', 'IDX_1728235322883');
    await queryRunner.dropForeignKey('state', 'fk_region_id');
    await queryRunner.dropTable('state');
  }
}
