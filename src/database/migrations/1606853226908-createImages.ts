import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImages1606853226908 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
        name: 'images',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'path',
            type: 'varchar',
          },
          {
            name: 'productId',
            type: 'integer',
          }
        ],
        foreignKeys: [
          {
            name: 'ImageProduct',
            columnNames: ['productId'],
            referencedTableName: 'Products',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
        ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('images')
  }
}
