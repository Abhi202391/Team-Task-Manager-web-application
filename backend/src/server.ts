// server.ts

import dotenv from "dotenv";

dotenv.config();

import app from "./app";

import {connectDB} from "./config/prisma.config";

const PORT = process.env.PORT || 5000;

//////////////////////////////////////////////////////
// START SERVER
//////////////////////////////////////////////////////

const startServer = async () => {

  try {

    //////////////////////////////////////////////////////
    // CONNECT DATABASE
    //////////////////////////////////////////////////////

    await connectDB();

    //////////////////////////////////////////////////////
    // START EXPRESS SERVER
    //////////////////////////////////////////////////////

    app.listen(PORT, () => {

      console.log(`
==================================================
🚀 Server running on port ${PORT}
🌍 http://localhost:${PORT}
==================================================
`);

    });

  } catch (error) {

    console.log("Server startup failed");

    console.log(error);

    process.exit(1);
  }
};

startServer();