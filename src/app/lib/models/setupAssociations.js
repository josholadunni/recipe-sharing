export default ({
  User,
  Recipe,
  RecipeCategory,
  Like,
  RecipeRecipeCategory,
}) => {
  User.associate = () => {
    User.hasMany(Recipe, { foreignKey: "UserId", onDelete: "CASCADE" });
    User.hasMany(Like, { foreignKey: "UserId", onDelete: "CASCADE" });
    User.belongsToMany(Recipe, {
      through: Like,
      as: "LikedRecipes",
      onDelete: "CASCADE",
    });
  };

  Recipe.associate = () => {
    Recipe.belongsTo(User, { foreignKey: "UserId", onDelete: "CASCADE" });
    Recipe.hasMany(Like, { foreignKey: "RecipeId", onDelete: "CASCADE" });
    Recipe.belongsToMany(User, { through: Like, onDelete: "CASCADE" });
    Recipe.belongsToMany(RecipeCategory, {
      through: RecipeRecipeCategory,
      onDelete: "CASCADE",
    });
  };

  RecipeCategory.associate = () => {
    RecipeCategory.belongsToMany(Recipe, { through: RecipeRecipeCategory });
  };

  Like.associate = () => {
    Like.belongsTo(User);
    Like.belongsTo(Recipe);
  };

  // Call associate methods
  [User, Recipe, RecipeCategory, Like, RecipeRecipeCategory].forEach(
    (model) => {
      if (model.associate) {
        model.associate();
      }
    }
  );
};
