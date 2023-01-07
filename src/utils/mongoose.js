import { connect, connection } from "mongoose";

const conn = {
  isConected: false,
};

export async function dbConnect() {
  
  if (conn.isConected) {
    console.log(conn);
    return;
  }
  const db = await connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  conn.isConected = db.connections[0].readyState;



  console.log('Connected to:', db.connection.db.databaseName);
}
connection.on("connected", () => {
  console.log("Database connected");
});
connection.on("error", (err) => {
  console.log("Connection error", err);
});
