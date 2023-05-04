import * as express from 'express'
import * as dotenv from 'dotenv'
import * as cors from 'cors'
import routes from './routes'

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors())
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(routes);