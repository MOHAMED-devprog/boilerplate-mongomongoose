require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true});



const Schema = mongoose.Schema;

const personSchema = new Schema({
  name : {type : String , required : true},
  age : Number,
  favoriteFoods : [String]
});

let Person = mongoose.model("Person", personSchema);


const createAndSavePerson = (done) => {
  let person = new Person({name:"ouassama", age:21, favoriteFoods:["pizza", "burger"]});
  person.save(function(err, data){
    if (err) return console.error('error');
    done(null , data);
  });
};

var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

var createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function(err, data){
    if (err) return console.error('error');
    done(null , data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name : personName}, function(err, data){
    if (err) return console.log("error");
    done(null , data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods : food}, function(err, data){
    if (err) return console.error('error');
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({_id : personId}, function(err, data){
    if (err) return console.error("error");
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  
  Person.findById(personId, function(err, data){
    if (err) return console.error("error");

    data.favoriteFoods.push(foodToAdd);

    data.save((err, updatedPerson) => {
      if (err) return console.error("error");
      done(null, updatedPerson);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name : personName},{age : ageToSet}, {new : true}, (err, updatedPerson) => {
    if (err) return console.error("error");
    done(null ,updatedPerson);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.error("error");
    done(null , data);
  })
  
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name : nameToRemove}, (err, data) => {
    if (err) return console.error("error");
    done(null , data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";


  Person.find({favoriteFoods : foodToSearch})
    .sort({name: -1})
    .limit(2)
    .select({age : 0})
    .exec(function(err, data){

      if (err) return console.error("error");
      done(null , data);
      
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
