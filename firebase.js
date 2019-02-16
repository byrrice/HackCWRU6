const admin = require('firebase-admin');
// import firebase from '@firebase/app';
// import '@firebase/firestore'
var serviceAccount = require('/Users/dennis/Documents/HackCWRU6/pincwru-bb51d8cd21c5.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

//test users
var usersRef = db.collection('users').doc('dlin@test.com');
var setAda = usersRef.set({
  first: 'Dennis',
  last: 'Lin',
  email: 'dlin@test.com',
  password: 'password'
});

//test tag
var tagsRef = db.collection('tags').doc('party');
var setAda = tagsRef.set({
  icon: 'party.png',
  name: 'party_tag'
})
var setAda = tagsRef.set({
  icon: 'sports.png',
  name: 'sports_tag'
});

//test group
var groupsRef = db.collection('groups').doc('The Den by Dennis');
var setAda = groupsRef.set({
  name: 'The Den by Dennis',
  users: ['dlin@test.com']
});

//test event
var start_time = new Date(2019, 2, 18, 21, 0, 0, 0);
var end_time = new Date(2019, 2, 18, 23, 0, 0, 0)
// var timestamp1 = Timestamp.fromDate(ourbigd);
var eventsRef = db.collection('events').doc('Game on Monday');
var setAda = eventsRef.set({
  name: 'Game On Monday',
  description: 'IM League Game on Monday, be there!',
  start_time: admin.firestore.Timestamp.fromDate(start_time),
  end_time: admin.firestore.Timestamp.fromDate(end_time),
  location: new admin.firestore.GeoPoint(0, 42),
  tags: ['sports_tag'],
  users: ['dlin@test.com'],
  groups: ['The Den by Dennis'],
  category: 'sport'
});



// ADD/RETRIEVE FUNCTIONS

addEvent({"name":"Team Lunch", "description": "Let's go to lunch tgt!", 
"start_time": new Date(2019, 2, 19, 12, 0, 0, 0), 
"end_time": new Date(2019, 2, 19, 2, 0, 0, 0), 
"geo_location": new admin.firestore.GeoPoint(40.7308619, -73.9871558),
"tags": "sports",
"users": ["dlin@test.com", "rkp43@case.edu"],
"group": null,
"category": "sports"
});

function addEvent(event) {
  var eventsRef = db.collection('events').doc(event.name);
  var setAda = eventsRef.set({
    name: event.name,
    description: event.description,
    start_time: event.start_time,
    end_time: event.end_time,
    geo_location: event.geo_location,
    tags: event.tags,
    users: event.users,
    group: event.group,
    category: event.category
  });
}

addGroup({"name":"TallBoys", "users": ["rkp43@case.edu"]})
function addGroup(group){
  //test group
  var groupsRef = db.collection('groups').doc(group.name);
  var setAda = groupsRef.set({
    name: group.name,
    users: group.users
  });
}

function findGroup(group){
  var groupRef = db.collection('groups').doc(group);
  var getGroup = groupRef.get()
    .then(doc => {
      if (! doc.exists) {
        console.log('No such document!');
      }
      else {
        console.log(doc.id, '=>', doc.data());
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
}

findGroup('The Den by Dennis');

function findEvent(event) {
  var eventRef = db.collection('events').doc(event);
  var getEvent = eventRef.get()
    .then(doc => {
      if (! doc.exists) {
        console.log('No such document!');
      }
      else {
        console.log(doc.id, '=>', doc.data());
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    }); 
}

findEvent('Team Lunch');





// AUTHETICATION FUNCTIONS


function createUser(user) {
  admin.auth().createUser({
    uid: user.email,
    email: user.email,
    displayName: user.first + ' ' + user.last,
    password: user.password
  })
    .then(function(userRecord) {
      console.log("Successfully added user: " + user.first);
    })
    .catch(function(error) {
      console.log("Error in creating user: " + user.first);
    });
}

createUser({"first":"Isaac", "last": "Ng", "email": "isaac.ng@case.edu", "password": "password"});

function findUser(email) {
  admin.auth().getUser(email)
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully fetched user data:", userRecord.toJSON());
  })
  .catch(function(error) {
    console.log("Error fetching user data:", error);
  });
}

findUser("isaac.ng@case.edu");

// Add user to group

// Remove user from group

// Add group to event, in the inout feild?

// Add tag to event/edit 

// Get all events for a user
// Get groups of user, then get all events for a group, tie all these together, send a list of JSON objects?? somehow return multiple ones

// Get events for a group

// 