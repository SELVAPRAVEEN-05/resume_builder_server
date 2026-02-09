const bcrypt = require('bcryptjs');
const User = require('../models/user');

const users = [
  {
    name: 'Selva Praveen',
    email: 'selvapraveen@example.com',
    password: 'Password123!'
  },
  {
    name: 'Akshay Kumar',
    email: 'akshay.kumar@example.com',
    password: 'SecurePass456!'
  }
];

const seedUsers = async () => {
  try {
    await User.deleteMany({});
    
    // Hash passwords before inserting
    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }))
    );
    
    const result = await User.insertMany(usersWithHashedPasswords);
    console.log(`${result.length} users inserted into database`);
    console.log('Test Credentials:');
    users.forEach(user => {
      console.log(`  Email: ${user.email}, Password: ${user.password}`);
    });
  } catch (error) {
    console.error('Error seeding users:', error.message);
  }
};

module.exports = seedUsers;
