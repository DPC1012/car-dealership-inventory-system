// Express application. Routes are mounted here; the server entrypoint
// (server.ts) imports this app. Kept separate from server startup so tests can
// import the app without opening a port.
import express from 'express';

export const app = express();

app.use(express.json());

export default app;
