
const { Sequelize, DataTypes, Model, Op } = require('sequelize')
const sequelize = new Sequelize('hundredyear', 'root', 'm1317662314', {
    host: 'localhost',
    dialect: 'mysql'
})

class Student extends Model { }
Student.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: DataTypes.INTEGER
}, {
    tableName: 'students',
    updatedAt: false,
    createdAt: false,
    sequelize
})

class Course extends Model { }
Course.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: DataTypes.DOUBLE
}, {
    tableName: 'courses',
    updatedAt: false,
    createdAt: false,
    sequelize
})

class StudentCourse extends Model { }
StudentCourse.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    stuId: {
        field: 'student_id',
        type: DataTypes.STRING,
        references: {
            model: Student,
            key: 'id'
        }
    },
    csId: {
        field: 'course_id',
        type: DataTypes.STRING,
        references: {
            model: Course,
            key: 'id'
        }
    }
}, {
    tableName: 'student_select_courses',
    updatedAt: false,
    createdAt: false,
    sequelize
})

//多对多关系的联系
Student.belongsToMany(Course, {
    through: StudentCourse,
    foreignKey: 'stuId',
    otherKey: 'csId'
})
Course.belongsToMany(Student, {
    through: StudentCourse,
    foreignKey: 'csId',
    otherKey: 'stuId'
})
async function queryProducts() {
    const result = await Student.findAll({
        include: {
            model: Course
        }
    })
    console.log(result);
}
queryProducts()