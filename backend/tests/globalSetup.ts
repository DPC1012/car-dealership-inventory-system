// Jest globalSetup: start one ephemeral Postgres container for the whole test
// run, apply Prisma migrations to it, and expose its connection string via
// process.env.DATABASE_URL (also written to a temp file for worker processes).
import { GenericContainer, Wait } from 'testcontainers';
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { tmpUrlFile } from './helpers/testDbUrl';

module.exports = async function globalSetup(): Promise<void> {
  const container = await new GenericContainer('postgres:16-alpine')
    .withEnvironment({
      POSTGRES_USER: 'postgres',
      POSTGRES_PASSWORD: 'postgres',
      POSTGRES_DB: 'test',
    })
    .withExposedPorts(5432)
    .withWaitStrategy(
      Wait.forLogMessage(/database system is ready to accept connections/, 2),
    )
    .start();

  const url = `postgresql://postgres:postgres@${container.getHost()}:${container.getMappedPort(
    5432,
  )}/test?schema=public`;

  process.env.DATABASE_URL = url;
  writeFileSync(tmpUrlFile, url, 'utf8');

  // Apply the schema to the fresh container.
  execSync('npx prisma migrate deploy', {
    env: { ...process.env, DATABASE_URL: url },
    stdio: 'ignore',
  });

  // Keep a handle so globalTeardown can stop the container.
  (globalThis as unknown as { __PG_CONTAINER__: unknown }).__PG_CONTAINER__ =
    container;
};
