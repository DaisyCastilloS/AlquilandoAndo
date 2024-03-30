const { db } = require('../dataBase/db.js');
const { Role } = require('../models');

db.sync().then(async () => {
  const existeTabla = (await db.getQueryInterface().showAllTables()).includes(
    'roles',
  );
  if (existeTabla) {
    const role = await Role.findAll();

    if (role.length <= 0) {
      try {
        await Role.create({ role: 'ADMIN_ROLE' });
        await Role.create({ role: 'USER_ROLE' });
      } catch (error) {
        console.log(error);
      }
    }
  }
});
