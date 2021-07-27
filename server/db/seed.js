const seeder = require('mongoose-seed');
const faker = require('faker');
require('dotenv').config();
const db = require('./index');
const bcrypt = require('bcryptjs');

const getRandomIndexes = (arrLength) => {
  const index1 = Math.floor(Math.random() * arrLength);
  const index2 = Math.floor(Math.random() * arrLength);
  return [index1, index2];
}

const getInstruments = (title) => {
  let instruments = [];
  switch(title) {
    case 'rapper':
      instruments = ['turntable', 'beatbox', 'voice'];
      break;
    case 'dj':
      instruments = ['synthesizer', 'sampler'];
      break;
    case 'singer/songwriter':
      instruments = ['voice', 'sampler'];
      break;
    case 'classical musician':
      instruments = ['harp', 'piano', 'violin'];
      break;
    case 'beatboxer':
      instruments = ['beatbox'];
      break;
    case 'medieval music specialist':
      instruments = ['flute', 'oboe', 'mandolin'];
      break;
    case 'dj/producer':
      instruments = ['turntable', 'beatbox', 'synthesizer', 'sampler'];
      break;
    case 'drummer':
      instruments = ['drums', 'beatbox', 'synthesizer', 'sampler'];
      break;
    case 'bass player':
      instruments = ['electric guitar', 'bass guitar'];
      break;
    default:
      index1 = getRandomIndexes(20)[0];
      index2 = getRandomIndexes(20)[1];
      if (index1 === index2) instruments.push(instrumentsArr[index1]);
      instruments.push(instrumentsArr[index1], instrumentsArr[index2]);
  }
  return instruments;
}

const titles = [
  'rapper',
  'dj',
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
  'bass player',
]

const skills = [
  'motivation', 'articulation', 'determination','tempo', 'good time management',
  'rhythm', 'reliability', 'flow', 'listening', 'crowd interaction',
  'motivation', 'articulation', 'determination','tempo', 'good time management',
  'rhythm', 'reliability', 'flow', 'listening', 'crowd interaction',
]

const instrumentsArr = [
  'acoustic guitar',
  'electric guitar',
  'drums',
  'flute',
  'harmonica',
  'mandolin',
  'oboe',
  'harp',
  'saxophone',
  'tambourine',
  'violin',
  'ukulele',
  'voice',
  'synthesizer',
  'piano',
  'accordion',
  'bass guitar',
  'turntable',
  'beatbox',
  'sampler',
  'double bass'
]
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
              email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@strummer.com`,
              password: hash,
            }
              console.log(`Adding user ${user.firstName}`);
              usersCollection.push(user);
          }
        })
      })

      const seedProfiles = async () => {
        let profileCollection = [];
        const allUsers = await db.users.findUsers();
        allUsers.forEach((user, i) => {
          const instr = getInstruments(titles[i]);
          const profile = {
            name: `${user.firstName} ${user.lastName}`,
            description: `hello my name is ${user.firstName} ${user.lastName}`,
            user: user,
            avatar: faker.image.avatar(),
            title: titles[i],
            instruments: instr,
            skills: [skills[i], skills[i+2]]
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
