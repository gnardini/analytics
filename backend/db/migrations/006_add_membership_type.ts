import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user_organizations', (table) => {
    table.string('membership_type').notNullable();
  });
}

export async function down(_: Knex): Promise<void> {}
