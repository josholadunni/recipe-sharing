import sequelize from "./src/app/lib/db.js";

function logAssociations() {
  console.log("Sequelize Associations:");
  Object.keys(sequelize.models).forEach((modelName) => {
    console.log(`\nModel: ${modelName}`);
    const associations = sequelize.models[modelName].associations;
    if (Object.keys(associations).length === 0) {
      console.log("  No associations");
    } else {
      Object.keys(associations).forEach((associationName) => {
        const association = associations[associationName];
        console.log(`  ${associationName} (${association.associationType})`);
        console.log(`    - Target: ${association.target.name}`);
        console.log(`    - Foreign key: ${association.foreignKey}`);
        if (association.as) {
          console.log(`    - Alias: ${association.as}`);
        }
      });
    }
  });
}

logAssociations();
