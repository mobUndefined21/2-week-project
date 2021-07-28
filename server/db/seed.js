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

const musicGenre = [
  'rap',
  'jazz',
  'pop',
  'techno',
  'dubstep',
  'rock',
  'gospel',
  'classical',
  'country',
  'disco',
  'metal',
  'punk',
  'blues',
  'soul',
  'reggae',
  'ali-g',
  'house',
  'afroman',
  'opera',
  'orchestra'
]

const getEmbedMusic = () => {
  let music = [];
  const randomNumber = Math.floor(Math.random() * 20);
  const genre = musicGenre[randomNumber];

  switch(genre) {
    case 'rap':
      music.push({type: 'spotify', link: 'https://open.spotify.com/track/3pndPhlQWjuSoXhcIIdBjv?si=feb9b4eefd2442ed'});
      break;
    case 'jazz':
      music.push({type: 'spotify', link: 'https://open.spotify.com/track/3zisTIB0hCEZQTzRX0h35S?si=977b1e35a2284b59'});
      break;
    case 'pop':
      music.push({type: 'spotify', link: 'https://open.spotify.com/track/5HCyWlXZPP0y6Gqq8TgA20?si=b7e39dc8e52f4221'});
      break;
    case 'techno':
      music.push({type: 'spotify', link: 'https://open.spotify.com/track/2LXQ0BZf5tQL4TkFKEH0eK?si=48ae2aa67e194cf7'});
      break;
    case 'dubstep':
      music.push({type: 'spotify', link: 'https://open.spotify.com/track/3SJuQeKTvH83bFPbfQOWJF?si=888e6c69c9b84bec'});
      break;
    case 'rock':
      music.push({type: 'spotify', link: 'https://open.spotify.com/track/6KxDdy6asuOagDjO4fjE5Q?si=767335ed04104189'});
      break;
    case 'gospel':
      music.push({type: 'spotify', link: 'https://open.spotify.com/track/74crNF63DNXE5J20s1IjNg?si=289fd69762514b62'});
      break;
    case 'classical':
      music.push({type: 'spotify', link: 'https://open.spotify.com/track/4SFBV7SRNG2e2kyL1F6kjU?si=4b0d460256884bee'});
      break;
    case 'country':
      music.push({type: 'spotify', link: 'https://open.spotify.com/track/5f3MXmTmstozFg0BH1yPUk?si=3b0786c44b264006'});
      break;
    case 'disco':
      music.push({type: 'spotify', link: 'https://open.spotify.com/track/4ocfGuRDytBDjTeJLDIDjL?si=8aab206353dd43f3'});
      break;
    case 'metal':
      music.push({type: 'spotify', link: 'https://open.spotify.com/track/7sZTvm0Sx8umbyQViTE2Qc?si=2cf096b18c17423c'});
      break;
    case 'punk':
      music.push({type: 'spotify', link: 'https://open.spotify.com/track/6L89mwZXSOwYl76YXfX13s?si=b0e48e662f4d4f64'});
      break;
    case 'blues':
      music.push({type: 'spotify', link: 'https://open.spotify.com/track/5Sjk7BIiPGx6BPsBYPrIPF?si=90dcf352ef0d457b'});
      break;
    case 'soul':
      music.push({type: 'spotify', link: 'https://open.spotify.com/track/4F12hJKprmgWGmxvygf4nx?si=753c8e58f251468d'});
      break;
    case 'reggae':
      music.push({type: 'spotify', link: 'https://open.spotify.com/track/3PQLYVskjUeRmRIfECsL0X?si=1bcb7fc1dbc44835'});
      break;
    case 'ali-g':
      music.push({type: 'spotify', link: 'https://open.spotify.com/track/1xlsIjz89XJwc3z5S8SrPh?si=0616dd5ceb7948ca'});
      break;
    case 'house':
      music.push({type: 'spotify', link: 'https://open.spotify.com/track/7pk1VW7qa7zBQDbqMWydUD?si=d0ee83ba216e4820'});
      break;
    case 'afroman':
      music.push({type: 'spotify', link: 'https://open.spotify.com/track/0rRboI6IRuGx56Dq3UdYY4?si=ac8a84ec85f948bb'});
      break;
    case 'opera':
      music.push({type: 'spotify', link: 'https://open.spotify.com/track/5bPTYGxlal1XBHIvyAIaaQ?si=276fd87adef64dfa'});
      break;
    case 'orchestra':
      music.push({type: 'spotify', link: 'https://open.spotify.com/track/0AmPp1dsvdWFNTBs0nJBsC?si=dd3db66b9a6e4d3b'});
      break;
    default:
      music.push({type: 'spotify', link: 'https://open.spotify.com/track/4fxF8ljwryMZX5c9EKrLFE?si=e9b398e768734229'});
  }
  return music;
}

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
          const instr = getInstruments(titles[i]).map(i => ({name: i}));
          const profile = {
            name: `${user.firstName} ${user.lastName}`,
            description: `hello my name is ${user.firstName} ${user.lastName}`,
            user: user,
            avatar: faker.image.avatar(),
            title: titles[i],
            instruments: instr,
            skills: [{name: skills[i]}, {name: skills[i+1]}],
            music: getEmbedMusic()
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
