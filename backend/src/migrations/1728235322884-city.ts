import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class City1728235322884 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'city',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'state_id',
            type: 'bigint',
            isNullable: false,
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
      'city',
      new TableIndex({
        name: 'IDX_1728235322884',
        columnNames: ['state_id'],
        isUnique: false,
      }),
    );

    // Add foreign keys
    await queryRunner.createForeignKey(
      'city',
      new TableForeignKey({
        name: 'fk_state_id',
        columnNames: ['state_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'state',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('city', 'IDX_1728235322884');
    await queryRunner.dropForeignKey('city', 'fk_state_id');
    await queryRunner.dropTable('city');
  }
}
