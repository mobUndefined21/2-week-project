const seeder = require('mongoose-seed');
const faker = require('faker');
require('dotenv').config();
const db = require('./index');

const createSeedFile = () => {
  try {
    seeder.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
      seeder.loadModels(['server/db/models/users', 'server/db/models/profiles']);
      console.log('connected...');
      
      let usersCollection = [];

      for(let i=0; i<20; i++){
        const user = {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: `${firstName}.${lastName}@strummer.com`,
          password: 'pass123',
        }
          console.log(`Adding user ${user.firstName}`);
          usersCollection.push(user);
      }

      const seedProfiles = async () => {
        let profileCollection = [];
        const allUsers = await db.users.findUsers();
        allUsers.forEach(user => {
          const profile = {
            name: `${user.firstName} ${user.lastName}`,
            description: `hello my name is ${user.firstName} ${user.lastName}`,
            user: user,
            avatar: faker.image.avatar()
          }
          console.log(`Adding profile ${profile.name}`);
          profileCollection.push(profile);
        });
        return profileCollection;
      }
      
      seeder.clearModels(['Users', 'profiles'], () => {
        console.log('db dropped...');
        seeder.populateModels([{ 'model': 'Users', 'documents': usersCollection}], async () => {
          const profiles = await seedProfiles();
          seeder.populateModels([{ 'model': 'profiles', 'documents': profiles}], () => {
            seeder.disconnect();
            console.log(`populated db with ${usersCollection.length} users`);
          });
        });
        
        console.log(`${usersCollection.length} users created!`);
      });
    });
      
    } catch(err) {
      console.log(err.message);
    }
}
  
  createSeedFile();


  // const seedProfiles = async (callback) => {
  //   const allUsers = await db.users.findUsers();
  //   allUsers.forEach(async (user) => {
  //     await db.profiles.createProfile(
  //       {
  //         name: `${user.firstName} ${user.lastName}`,
  //         description: `hello my name is ${user.firstName} ${user.lastName}`,
  //         user: user,
  //         avatar: faker.image.avatar()
  //       }
  //     );
  //       console.log(`profile for ${user.firstName} created!`);
  //   });
  //   callback();
  // };