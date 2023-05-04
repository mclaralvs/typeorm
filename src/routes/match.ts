import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const router = Router();

router.post('/', MatchController.create)
router.get('/', MatchController.read)
router.get('/:id', MatchController.readById)
router.put('/', MatchController.update)
router.delete('/', MatchController.delete)

export default router;