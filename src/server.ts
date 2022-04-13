import app from './app';
import {dbCreateConnection} from "./shared/database/connection";

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
  console.log('  App is running at http://localhost:%d', app.get('port'));
  console.log('  Press CTRL-C to stop\n');
});

(async () => {
  await dbCreateConnection(); // DB Connection
})();

export default server;
