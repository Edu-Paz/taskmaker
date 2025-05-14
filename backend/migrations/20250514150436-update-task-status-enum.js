module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Remover o default
    await queryInterface.sequelize.query(`
      ALTER TABLE "Tasks" ALTER COLUMN "status" DROP DEFAULT;
    `);

    // 2. Remover o tipo antigo de ENUM (se necessário)
    // await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Tasks_status";');

    // 3. Alterar o tipo da coluna para o novo ENUM
    await queryInterface.changeColumn("Tasks", "status", {
      type: Sequelize.ENUM("concluída", "pendente", "em andamento"),
      allowNull: false,
    });

    // 4. Definir o novo default
    await queryInterface.sequelize.query(` 
      ALTER TABLE "Tasks" ALTER COLUMN "status" SET DEFAULT 'pendente';
    `);
  },

  async down(queryInterface, Sequelize) {
    // Reverter para o ENUM antigo, se necessário
    await queryInterface.sequelize.query(`
      ALTER TABLE "Tasks" ALTER COLUMN "status" DROP DEFAULT;
    `);

    await queryInterface.changeColumn("Tasks", "status", {
      type: Sequelize.ENUM("concluido", "pendente", "em andamento"),
      allowNull: false,
    });

    await queryInterface.sequelize.query(`
      ALTER TABLE "Tasks" ALTER COLUMN "status" SET DEFAULT 'pendente';
    `);
  }
};