const bcrypt = require('bcryptjs');
const User = require('../models/user');

const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123'
  },
  {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  },
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: 'password123'
  },
  {
    name: 'Bob Wilson',
    email: 'bob@example.com',
    password: 'password123'
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
