module.exports = function(sequelize,dataTypes){
    let alias = "User"

    let cols = {
        id: {
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
        },
        nombre: {
            type:dataTypes.STRING,
            allowNull:false,
        },
        apellido: {
            type:dataTypes.STRING,
            allowNull:false,
        },
        email: {
            type:dataTypes.STRING,
            allowNull:false,
        },
        contrasenia: {
            type:dataTypes.STRING,
            allowNull:false,
        },
        direccion: {
            type:dataTypes.STRING,
            allowNull:false,
        },
        telefono: {
            type:dataTypes.BIGINT,
            allowNull:false,
        },
        imagen: {
            type:dataTypes.STRING,
            allowNull:false,
        },    
        id_categoria: {
            type:dataTypes.INTEGER,
            allowNull:false,
        },
        activo: {
            type:dataTypes.TINYINT,
            allowNull:false,
        },
        

    };

    let config = {
        timestamps: false,
        tableName: 'users'
    }

    const User = sequelize.define(alias, cols, config);

    User.associaciate = function (models) {
        User.belongsTo(model.UserCategory,{
            as:"usercategories",
            foreignKey: "id_categoria",
        })
    }

    return User;
};