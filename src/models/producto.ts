import { DataTypes } from 'sequelize';
import sequelize from '../db/conectiondb';

const producto = sequelize.define('productos', {
    nombre_producto:{
        type: DataTypes.STRING
    },
    description_producto:{
        type: DataTypes.STRING 
    },
    price_producto:{
        type: DataTypes.DOUBLE
    },
    stock_producto:{
        type: DataTypes.INTEGER
    },

},{
    timestamps: false
}

);

export default producto