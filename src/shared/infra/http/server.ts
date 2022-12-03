import { app } from './app';
import { Signale } from 'signale';

const PORT = process.env.PORT;
const log = new Signale();

app.listen(PORT, () => {
  log.scope('Server').success(`Server running on port ${PORT}`);
});
