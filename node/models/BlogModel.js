import db from "../database/db.js";
import { DataTypes } from "sequelize";

const BlogModel = db.define('posts', {
    titulo: { type: DataTypes.STRING },
    contenido: { type: DataTypes.STRING }
}, {
    timestamps: true, 
    createdAt: true, 
    updatedAt: false,
    freezeTableName: true,
    tableName: "posts"
});

export default BlogModel;
