const admin = require("firebase-admin");
// import firebase from '@firebase/app';
// import '@firebase/firestore'
var serviceAccount = require("./pincwru-bb51d8cd21c5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

//test users
var usersRef = db.collection("users").doc("dlin@test.com");
var setAda = usersRef.set({
  first: "Dennis",
  last: "Lin",
  email: "dlin@test.com",
  password: "password"
});

// //test tag
// var tagsRef = db.collection('tags').doc('party');
// var setAda = tagsRef.set({
//   icon: 'party.png',
//   name: 'party_tag'
// })
// var setAda = tagsRef.set({
//   icon: 'sports.png',
//   name: 'sports_tag'
// });

//test group
var groupsRef = db.collection("groups").doc("The Den by Dennis");
var setAda = groupsRef.set({
  name: "The Den by Dennis",
  users: ["dlin@test.com"]
});

//test event
var start_time = new Date(2019, 2, 18, 21, 0, 0, 0);
var end_time = new Date(2019, 2, 18, 23, 0, 0, 0);
// var timestamp1 = Timestamp.fromDate(ourbigd);
var eventsRef = db.collection("events").doc("Game On Monday");
var setAda = eventsRef.set({
  name: "Game On Monday",
  description: "IM League Game on Monday, be there!",
  start_time: admin.firestore.Timestamp.fromDate(start_time),
  end_time: admin.firestore.Timestamp.fromDate(end_time),
  location: new admin.firestore.GeoPoint(0, 42),
  category: "sport"
});

// ADD/RETRIEVE FUNCTIONS

addEvent({
  name: "Team Lunch",
  description: "Let's go to lunch tgt!",
  start_time: new Date(2019, 2, 19, 12, 0, 0, 0),
  end_time: new Date(2019, 2, 19, 14, 0, 0, 0),
  geo_location: new admin.firestore.GeoPoint(40.7308619, -73.9871558),
  category: "sports"
});

addEvent({
  name: "Reading the Great Gatsby",
  description: "Read some books as a group!",
  start_time: new Date(2019, 2, 17, 16, 0, 0, 0),
  end_time: new Date(2019, 2, 17, 18, 0, 0, 0),
  geo_location: new admin.firestore.GeoPoint(41.504213, -81.609398),
  category: "education"
});

addEvent({
  name: "Lets take a swim",
  description: "Hop into the lagoon!",
  start_time: new Date(2019, 2, 19, 1, 0, 0, 0),
  end_time: new Date(2019, 2, 19, 2, 0, 0, 0),
  geo_location: new admin.firestore.GeoPoint(41.506579, -81.611415),
  category: "misc"
});

function addEvent(event) {
  firebase
    .database()
    .ref("users/" + userId)
    .set({
      name: event.name,
      description: event.description,
      start_time: event.start_time,
      end_time: event.end_time,
      geo_location: event.geo_location,
      category: event.category
    });
  // var eventsRef = db.collection("events").doc(event.name);
  // var setAda = eventsRef.set({
  //   name: event.name,
  //   description: event.description,
  //   start_time: event.start_time,
  //   end_time: event.end_time,
  //   geo_location: event.geo_location,
  //   category: event.category
  // });
}

addGroup({ name: "TallBoys", users: ["rkp43@case.edu"] });
function addGroup(group) {
  //test group
  var groupsRef = db.collection("groups").doc(group.name);
  var setAda = groupsRef.set({
    name: group.name,
    users: group.users
  });
}

addGroupEvent(
  { name: "TallBoys", users: ["rkp43@case.edu"] },
  {
    name: "Team Lunch",
    description: "Let's go to lunch tgt!",
    start_time: new Date(2019, 2, 19, 12, 0, 0, 0),
    end_time: new Date(2019, 2, 19, 2, 0, 0, 0),
    geo_location: new admin.firestore.GeoPoint(40.7308619, -73.9871558),
    category: "sports"
  }
);
function addGroupEvent(group, event) {
  var groupEventsRef = db
    .collection("group_events")
    .doc(group.name + ": " + event.name);
  var setAda = groupEventsRef.set({
    groupName: group.name,
    eventName: event.name
  });
}
addGroupEvent({ name: "The Den by Dennis" }, { name: "Game On Monday" });
addGroupEvent({ name: "TallBoys" }, { name: "Game On Monday" });

addUserEvent({ email: "rkp43@case.edu" }, { name: "Team Lunch" });
addUserEvent({ email: "rkp43@case.edu" }, { name: "Reading the Great Gatsby" });
addUserEvent({ email: "dlin@test.com" }, { name: "Lets take a swim" });
function addUserEvent(user, event) {
  var userEventsRef = db
    .collection("user_events")
    .doc(user.email + ": " + event.name);
  var setAda = userEventsRef.set({
    userEmail: user.email,
    eventName: event.name
  });
}

function addUserGroup(user, groupName) {
  var userGroupRef = db
    .collection("user_groups")
    .doc(groupName + ": " + user.email);
  var setAda = userGroupRef.set({
    userEmail: user.email,
    groupName: groupName
  });
}

addUserGroup({ email: "rkp43@case.edu" }, "TallBoys");
addUserGroup({ email: "rkp43@case.edu" }, "The Den by Dennis");
addUserGroup({ email: "dlin@test.com" }, "The Den by Dennis");

function findGroup(group) {
  var groupRef = db.collection("groups").doc(group);
  var getGroup = groupRef
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log("No such group!");
      } else {
        return doc.data().name;
      }
    })
    .catch(err => {
      console.log("Error getting document", err);
    });
}

// findGroup('The Den by Dennis');

function findEvent(event) {
  var eventRef = db.collection("events").doc(event);
  var getEvent = eventRef
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log("No such event! => ", event);
      } else {
        console.log(doc.id, "=>", doc.data());
        return doc;
      }
    })
    .catch(err => {
      console.log("Error getting document", err);
    });
}

// findEvent('Team Lunch');

function getAllEvents() {
  var eventsRef = db.collection("events");
  var eventList = [];
  var query = eventsRef
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }

      snapshot.forEach(doc => {
        // console.log(doc.id, '=>', doc.data());
        var event = findEvent(doc.data().eventName);
        console.log(event);
        eventList.push(event);
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
  return { events: "all events", elements: eventList };
}
console.log(getAllEvents());

function findGroupEvent(group_name, event_name) {
  var groupEventRef = db
    .collection("group_events")
    .doc(group_name + ": " + event_name);
  var getGroupEventRef = groupEventRef.get().then(doc => {
    if (!doc.exists) {
      console.log("No such event/group pair!");
    } else {
      var event = findEvent(event_name);
      console.log("FIdnign group event: ", event);
      return event;
    }
  });
}
// findGroupEvent('TallBoys', "Team Lunch");

// find events of group
function findAllGroupEvents(group_name) {
  var groupEventsRef = db.collection("group_events");
  var eventList = [];
  var query = groupEventsRef
    .where("groupName", "==", group_name)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }

      snapshot.forEach(doc => {
        // console.log(doc.id, '=>', doc.data());
        var event = findEvent(doc.data().eventName);
        console.log(event);
        eventList.push(event);
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
  return { groupName: group_name, elements: eventList };
}
// console.log(findAllGroupEvents('TallBoys'));

function findUserEvents(user_email) {
  var userEventsRef = db.collection("user_events");
  var query = userEventsRef
    .where("userEmail", "==", user_email)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("No events for user.");
        return;
      }

      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
        return findEvent(doc.data().eventName);
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
}

// findUserEvents("rkp43@case.edu");
// findUserEvents("dlin@test.com");

function findUserGroupEvents(user_email) {
  var userGroupRef = db.collection("user_groups");
  var query = userGroupRef
    .where("userEmail", "==", user_email)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("No groups for user.");
        return;
      }

      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
        return findAllGroupEvents(doc.data().groupName);
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
}

// find all events for user
// filter out based on category (subquery)
// somehow store it in JSON object

function findUserEventsWithCategory(user_email, category) {
  var userEventsRef = db.collection("user_events");
  var query = userEventsRef
    .where("userEmail", "==", user_email)
    .where("userEmail", "==", user_email)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("No events for user.");
        return;
      }

      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
        return findEvent(doc.data().eventName);
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
}

// findUserGroupEvents('rkp43@case.edu');

function findAllUserEvents(user_email) {
  findUserEvents(user_email);
  findUserGroupEvents(user_email);
}

// findAllUserEvents('rkp43@case.edu');

// AUTHETICATION FUNCTIONS
function createUser(user) {
  admin
    .auth()
    .createUser({
      uid: user.email,
      email: user.email,
      displayName: user.first + " " + user.last,
      password: user.password
    })
    .then(function(userRecord) {
      console.log("Successfully added user: " + user.first);
    })
    .catch(function(error) {
      console.log("Error in creating user: " + user.first);
    });
}

//createUser({"first":"Isaac", "last": "Ng", "email": "isaac.ng@case.edu", "password": "password"});

function findUser(email) {
  admin
    .auth()
    .getUser(email)
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully fetched user data:", userRecord.toJSON());
    })
    .catch(function(error) {
      console.log("Error fetching user data:", error);
    });
}

// Change all outputs to be returning the values in a list type object

// Sort by category for user
// Parse to remove duplicates
