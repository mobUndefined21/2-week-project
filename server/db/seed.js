const seeder = require('mongoose-seed');
const faker = require('faker');
require('dotenv').config();
const db = require('./index');
const bcrypt = require('bcryptjs');

const createSeedFile = () => {
  try {
    seeder.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
      seeder.loadModels(['server/db/models/users', 'server/db/models/profiles']);
      console.log('connected...');
      
      let usersCollection = [];

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash('pass1234', salt, async (err, hash) => {
          for(let i=0; i<20; i++){
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();
            const user = {
              firstName,
              lastName,
              email: `${firstName}.${lastName}@strummer.com`,
              password: hash,
            }
              console.log(`Adding user ${user.firstName}`);
              usersCollection.push(user);
          }
        })
      })


      const titles = [
        'singer/songwriter',
        'drummer',
        'guitarist/songwriter',
        'artist',
        'beatboxer',
        'guitarist/drummer',
        'classical musician',
        'medieval music specialist',
        'hipster/old music enthusiast',
        'creative genius',
        'signer/songwriter',
        'dj/producer',
        'guitarist/songwriter',
        'artist',
        'beatboxer',
        'guitarist/drummer',
        'classical musician',
        'medieval music specialist',
        'hipster/old music enthusiast',
        'creative genius',
      ]

      const seedProfiles = async () => {
        let profileCollection = [];
        const allUsers = await db.users.findUsers();
        allUsers.forEach((user, i) => {
          const profile = {
            name: `${user.firstName} ${user.lastName}`,
            description: `hello my name is ${user.firstName} ${user.lastName}`,
            user: user,
            avatar: faker.image.avatar(),
            title: titles[i]
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
      
    } catch(err) {
      console.log(err.message);
    }
}
  
  createSeedFile();
