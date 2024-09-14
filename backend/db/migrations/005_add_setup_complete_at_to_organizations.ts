import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('organizations', (table) => {
    table.timestamp('setup_complete_at').nullable();
  });

  await knex.schema.alterTable('user_organizations', (table) => {
    table.string('membership_type').nullable();
  });
  
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('organizations', (table) => {
    table.dropColumn('setup_complete_at');
  });
}