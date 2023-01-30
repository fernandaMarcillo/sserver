import { Router } from "express";
import { deleteProduct, getProduct, getProducts,createProduct, updateProduct } from "../controllers/product";
const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.delete('/:id', deleteProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);


export default router;