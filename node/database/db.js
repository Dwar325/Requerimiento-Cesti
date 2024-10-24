import { Sequelize } from "sequelize";

const db = new Sequelize('cesti', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-05:00'
})

export default db