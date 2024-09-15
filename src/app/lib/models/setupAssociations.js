export default ({
  User,
  Recipe,
  RecipeCategory,
  Like,
  RecipeRecipeCategory,
}) => {
  User.associate = () => {
    User.hasMany(Recipe, { foreignKey: "UserId" });
    User.hasMany(Like, { foreignKey: "UserId" });
    User.belongsToMany(Recipe, { through: Like, as: "LikedRecipes" });
  };

  Recipe.associate = () => {
    Recipe.belongsTo(User, { foreignKey: "UserId" });
    Recipe.hasMany(Like, { foreignKey: "RecipeId" });
    Recipe.belongsToMany(User, { through: Like });
    Recipe.belongsToMany(RecipeCategory, { through: RecipeRecipeCategory });
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
