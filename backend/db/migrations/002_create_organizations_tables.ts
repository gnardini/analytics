import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('organizations', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable('user_organizations', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
    table.uuid('organization_id').references('id').inTable('organizations').onDelete('CASCADE').notNullable();
    table.unique(['user_id', 'organization_id']);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user_organizations');
  await knex.schema.dropTable('organizations');
}
