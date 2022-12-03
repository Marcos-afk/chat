import { serverHttp } from './app';
import { Signale } from 'signale';

const PORT = process.env.PORT;
const log = new Signale();

serverHttp.listen(PORT, () => {
  log.scope('Server').success(`Server running on port ${PORT}`);
});
