module.exports = function(sequelize,dataTypes){
    let alias = "usercategories"

    let cols = {
        id: {
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoincrement:true,
            allowNull:false,
        },
        nombre: {
            type:dataTypes.STRING,
            allowNull:false,
        },

    };
    
    let config = {
        timestamps:false,
        tableName: 'users_categories'
    };

    let UserCategory = sequelize.define(alias, cols, config);

    UserCategory.associate = function (models) {
        UserCategory.hasMany(models.User, {
          as: "users", 
          foreignKey: "id_categoria",
        });
      };
      return UserCategory;
    };