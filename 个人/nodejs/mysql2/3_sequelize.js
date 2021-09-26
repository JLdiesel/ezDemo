const { Sequelize, DataTypes, Model, Op } = require('sequelize')
const sequelize = new Sequelize('hundredyear', 'root', 'm1317662314', {
    host: 'localhost',
    dialect: 'mysql'
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
    score: DataTypes.DOUBLE
}, {
    tableName: 'products',
    sequelize,
    createdAt: false,
    updatedAt: false
});

async function queryProducts() {
    //查询数据库product表中所有的内容
    const result = await Product.findAll({
        where: {
            price: {
                //gt表示大于  gte表示大于等于 lt小于 lte小于等于
                [Op.gte]: 5000
            }
        }
    })
    //添加
    const result2 = await Product.create({
        title: '三星',
        price: 8888,
        score: 5.5
    })
    //更新
    const result3 = await Product.update({
        price: 3000
    }, {
        where: {
            id: 1
        }
    })
    console.log(result);
    console.log(result2);
}


queryProducts();


/*
sequelize.authenticate().then(() => {
    console.log('连接成功');
}).catch(err => {
    console.log('连接数据库失败', err);
}) */