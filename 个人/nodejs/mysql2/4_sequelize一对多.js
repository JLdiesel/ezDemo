const { Sequelize, DataTypes, Model, Op } = require('sequelize')
const sequelize = new Sequelize('hundredyear', 'root', 'm1317662314', {
    host: 'localhost',
    dialect: 'mysql'
})

class Brand extends Model { }
Brand.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    website: DataTypes.STRING,
    phoneRank: DataTypes.INTEGER,
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'brand',
    sequelize
})
class Product extends Model {

}
Product.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    price: DataTypes.DOUBLE,
    score: DataTypes.DOUBLE,
    brandId: {
        //映射字段名
        field: 'brand_id',
        type: DataTypes.INTEGER,
        //指定外键
        references: {
            model: Brand,
            key: 'id'
        }
    }
}, {
    tableName: 'products',
    sequelize,
    createdAt: false,
    updatedAt: false
});
//将两张表联系起来
Product.belongsTo(Brand, {
    foreignKey: 'brandId'
})

async function queryProducts() {
    const result = await Product.findAll({
        //包含brand内的信息
        include: {
            model: Brand
        }
    })
    console.log(result[2].dataValues.Brand);
}


queryProducts();


/*
sequelize.authenticate().then(() => {
    console.log('连接成功');
}).catch(err => {
    console.log('连接数据库失败', err);
}) */