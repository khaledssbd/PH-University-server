// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
import { Server } from 'http';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    // all app listening will be here
    server = app.listen(config.port, () => {
      console.log(`The app is running on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

// handlling unhandledRejection error
process.on('unhandledRejection', () => {
  console.log(`😈 unhandledRejection is detected , shutting down ...`);
  if (server) {
    // if server is running, then close the server gracefully === service clore kore server thamao
    server.close(() => {
      process.exit(1);
    });
  }

  // if no service in server then close the server immediately
  process.exit(1);
});

// handlling uncaughtException error
process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
