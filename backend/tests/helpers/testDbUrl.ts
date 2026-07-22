// Shared location of the file holding the ephemeral test DB connection string.
// globalSetup writes it; per-file setup reads it so worker processes (which do
// not inherit globalSetup's process.env mutations) can find the test database.
import { join } from 'node:path';
import { tmpdir } from 'node:os';

export const tmpUrlFile = join(tmpdir(), 'dealership-test-db-url');
