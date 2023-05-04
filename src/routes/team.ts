import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();

router.post('/', TeamController.create)
router.get('/', TeamController.read)
router.get('/:name', TeamController.readByName)
router.put('/', TeamController.update)
router.delete('/', TeamController.delete)

export default router;