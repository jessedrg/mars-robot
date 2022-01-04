import { app } from './app';
import 'dotenv';

const port = process.env.port || 4011;

app.listen(port, () => {
  console.log(`server listeing on port: ${port}`);
});
