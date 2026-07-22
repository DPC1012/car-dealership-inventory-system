// Jest globalTeardown: stop the ephemeral Postgres container.
import type { StartedTestContainer } from 'testcontainers';

module.exports = async function globalTeardown(): Promise<void> {
  const container = (
    globalThis as unknown as { __PG_CONTAINER__?: StartedTestContainer }
  ).__PG_CONTAINER__;
  if (container) {
    await container.stop();
  }
};
