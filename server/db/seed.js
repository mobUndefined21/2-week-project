const seeder = require('mongoose-seed');
const faker = require('faker');
require('dotenv').config();

// try {
//   mongoose.connect(process.env.DB_CONNECTION, 
//     { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
//     () => console.log(`db connected on user ${process.env.DB_USER}!`)
//   );
//   // const collection = client.db("iot").collection("kitty-litter-time-series");
//   // collection.drop();

// } catch(err) {
//   console.log(err.message);
// }

const createSeedFile = () => {
  try {
    seeder.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
      seeder.loadModels(['server/db/models/users']);
      console.log('connected...');
      
      let usersCollection = [{ 'model': 'Users', 'documents': [] }];


      for(let i=0; i<=20; i++){
        const user = {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          password: 'pass123',
        }
          console.log(`Adding user ${user.firstName}`);
          usersCollection.documents.push(user);
      }
          
      seeder.clearModels(['Users'], () => {
        console.log('db dropped...');
        seeder.populateModels(usersCollection, () => {
          console.log(`populated db with ${usersCollection}`);
          seeder.disconnect();
        });
      });

      console.log(`${usersCollection.length} users created!`);
    });

  } catch (err) {
    console.log(err.message);
  }
}

createSeedFile();