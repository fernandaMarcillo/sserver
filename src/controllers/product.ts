import { Request, Response } from "express";
import producto from "../models/producto";


export const createProduct = async (req:Request, res:Response) => {
    const {nombre_producto,description_producto,price_producto,stock_producto} = req.body;
  try{
    let newProducto = await producto.create({
     nombre_producto: nombre_producto ,
      description_producto: description_producto,
      price_producto: price_producto,
      stock_producto: stock_producto,
    },{
      fields: ['nombre_producto','description_producto','price_producto','stock_producto'],
    });
    if (newProducto) {
      return res.json({
        message: 'Producto created successfully',
        data: newProducto
      });
    }
  }catch (error) {
    console.log('the error is: ', error);
  }
  };



export const getProducts = async(req: Request, res: Response) => {
    try{
    const listProducts = await producto.findAll();
    res.json(listProducts)
    }catch (error) {
      console.log('the error is: ', error);
    }
}

export const getProduct = async(req: Request, res: Response) =>{
    const {id} = req.params;
    const prod = await producto.findByPk(id);

     if(prod){
        res.json(prod)   
     }else{
        res.status(404).json({
            msg: `Producto no encontrado con el id ${id}`
     })
    }
}
export const deleteProduct = async(req: Request, res: Response) =>{
    const {id} = req.params;
    try{
        const deleteRowCount = await producto.destroy({
            where: {
                id
            }
        });
        res.json({
            message: 'product deleted successfully',
            count: deleteRowCount
        });
    }catch(e){
        console.log("the error is: ", e);
    }
}
export const postProduct = async(req: Request, res: Response) =>{
    const {body} = req;

    try{
        await producto.create(body);

    res.json({
        msg: 'Producto fue agregado  con exito'
    })

} catch (error){
    console.log(error);
res.json({
        msg: 'Upps ah ocurrido un error, por favor comuniquese con soporte tecnico'
    })
}
}
/* export const updateProduct = async(req: Request, res: Response) =>{
    const {body} = req.body;
    const {id} = req.params;
    console.log({id})
  try {
    const prod = await producto.findByPk(id);
    if(!prod){
        await producto.update(body, {
        where: {
            id
        }});
        res.json({
            msg: 'Producto actualizado con exito'
        })
    }else {
        res.status(404).json({
            msg: 'No existe el producto con el id ${id}'
        });
    }
  } catch (error) {
    console.log(error);
    res.json({
        msg: 'Upps ah ocurrido un error, por favor comuniquese con soporte tecnico'
    })
  }
    

} */
export const updateProduct = async(req: Request, res: Response) =>{
    const {nombre_producto,description_producto,price_producto,stock_producto} = req.body;
    const {id} = req.params;
    console.log({id})
  try {
    const prod = await producto.findAll({
        attributes:['id', 'nombre_producto', 'description_producto','price_producto', 'stock_producto'],
        where: {
            id
        }
    })
    if (prod.length > 0) {
        prod.forEach(async (producto) => {
            await producto.update({
                nombre_producto,
                description_producto,
                price_producto,
                stock_producto
    })
        res.json({
        msg: 'Producto actualizado con exito'
        })
    })
}
}catch(error) {
    console.log(error)
}
}
