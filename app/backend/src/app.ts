import * as express from 'express';
import usersRoutes from './routes/users.routes';
import teamsRoutes from './routes/teams.routes';
import matchesRoutes from './routes/matches.routes';
import errorMiddleware from './middlewares/error.middleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.use('/matches', matchesRoutes);
    this.app.use('/login', usersRoutes);
    this.app.use('/teams', teamsRoutes);
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use(errorMiddleware);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
