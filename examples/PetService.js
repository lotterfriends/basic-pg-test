'use strict';

const { Client } = require('pg')
const dbConfig = require('../../../db.json');
const client = new Client(dbConfig.conncetion);
const prefix = dbConfig.options.table_prefix;

/**
 * Add a new pet to the store
 *
 * pet Pet Pet object that needs to be added to the store
 * no response value expected for this operation
 **/
exports.addPet = function(pet) {
  return new Promise(function(resolve, reject) {
    client.connect();
    client.query(`INSERT INTO  ${prefix}Pet (category, name, photourls, tags, status) VALUES ('$1', '$2', '$3', '$4', '$5')`, [
      pet.category,
      pet.name,
      pet.photoUrls,
      pet.tags,
      pet.status
    ], (err, res) => {
      if (err) {
        console.log(err.stack);
        reject(err);
      } else {
        console.log(res);
        resolve(res);
      }
      client.end()
    })
  });
}


/**
 * Deletes a pet
 *
 * petId Long Pet id to delete
 * apiUnderscorekey String  (optional)
 * no response value expected for this operation
 **/
exports.deletePet = function(petId,apiUnderscorekey) {
  return new Promise(function(resolve, reject) {
    client.connect();
    client.query(`DELETE FROM ${prefix}Pet WHERE id = $1`, [
      petId
    ], (err, res) => {
      if (err) {
        console.log(err.stack);
        reject(err);
      } else {
        console.log(res);
        resolve(res);
      }
      client.end()
    })
  });
}


/**
 * Finds Pets by status
 * Multiple status values can be provided with comma separated strings
 *
 * status List Status values that need to be considered for filter
 * returns List
 **/
exports.findPetsByStatus = function(status) {
  return new Promise(function(resolve, reject) {
    client.connect();
    client.query(`SELECT * FROM ${prefix}Pet WHERE status = $1`, [
      status
    ], (err, res) => {
      if (err) {
        console.log(err.stack);
        reject(err);
      } else {
        console.log(res);
        resolve(res);
      }
      client.end()
    })
//     var examples = {};
//     examples['application/json'] = {
//   "photoUrls" : [ "photoUrls", "photoUrls" ],
//   "name" : "doggie",
//   "id" : 0,
//   "category" : {
//     "name" : "name",
//     "id" : 6
//   },
//   "tags" : [ {
//     "name" : "name",
//     "id" : 1
//   }, {
//     "name" : "name",
//     "id" : 1
//   } ],
//   "status" : "available"
// };
//     if (Object.keys(examples).length > 0) {
//       resolve(examples[Object.keys(examples)[0]]);
//     } else {
//       resolve();
//     }
  });
}


/**
 * Finds Pets by tags
 * Muliple tags can be provided with comma separated strings. Use         tag1, tag2, tag3 for testing.
 *
 * tags List Tags to filter by
 * returns List
 **/
exports.findPetsByTags = function(tags) {
  return new Promise(function(resolve, reject) {
    client.connect();
    let a=[];
    tags.forEach((e, i) => a.push('$' + (i+1)));
    client.query(`SELECT * FROM ${prefix}Pet WHERE json_object_values(tags) in ${a.join()}`, tags, (err, res) => {
      if (err) {
        console.log(err.stack);
        reject(err);
      } else {
        console.log(res);
        resolve(res);
      }
      client.end()
    })
  });

//   
//     var examples = {};
//     examples['application/json'] = {
//   "photoUrls" : [ "photoUrls", "photoUrls" ],
//   "name" : "doggie",
//   "id" : 0,
//   "category" : {
//     "name" : "name",
//     "id" : 6
//   },
//   "tags" : [ {
//     "name" : "name",
//     "id" : 1
//   }, {
//     "name" : "name",
//     "id" : 1
//   } ],
//   "status" : "available"
// };
//     if (Object.keys(examples).length > 0) {
//       resolve(examples[Object.keys(examples)[0]]);
//     } else {
//       resolve();
//     }

}


/**
 * Find pet by ID
 * Returns a single pet
 *
 * petId Long ID of pet to return
 * returns Pet
 **/
exports.getPetById = function(petId) {
  return new Promise(function(resolve, reject) {
    client.connect();
    let a=[];
    tags.forEach((e, i) => a.push('$' + (i+1)));
    client.query(`SELECT * FROM ${prefix}Pet WHERE id = $1`, [petId], (err, res) => {
      if (err) {
        console.log(err.stack);
        reject(err);
      } else {
        console.log(res);
        resolve(res);
      }
      client.end()
    })
  });
//   return new Promise(function(resolve, reject) {
//     var examples = {};
//     examples['application/json'] = {
//   "photoUrls" : [ "photoUrls", "photoUrls" ],
//   "name" : "doggie",
//   "id" : 0,
//   "category" : {
//     "name" : "name",
//     "id" : 6
//   },
//   "tags" : [ {
//     "name" : "name",
//     "id" : 1
//   }, {
//     "name" : "name",
//     "id" : 1
//   } ],
//   "status" : "available"
// };
//     if (Object.keys(examples).length > 0) {
//       resolve(examples[Object.keys(examples)[0]]);
//     } else {
//       resolve();
//     }
//   });
}


/**
 * Update an existing pet
 *
 * pet Pet Pet object that needs to be added to the store
 * no response value expected for this operation
 **/
exports.updatePet = function(pet) {
  return new Promise(function(resolve, reject) {
    client.connect();
    client.query(`UPDATE ${prefix}Pet SET category='$1', name = '$2', photourls = '$3', tags = '$4', status = '$5') WHERE id = $6`, [
      pet.category,
      pet.name,
      pet.photoUrls,
      pet.tags,
      pet.status,
      pet.id
    ], (err, res) => {
      if (err) {
        console.log(err.stack);
        reject(err);
      } else {
        console.log(res);
        resolve(res);
      }
      client.end()
    })
  });
}


/**
 * Updates a pet in the store with form data
 *
 * petId Long ID of pet that needs to be updated
 * name String Updated name of the pet (optional)
 * status String Updated status of the pet (optional)
 * no response value expected for this operation
 **/
exports.updatePetWithForm = function(petId,name,status) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * uploads an image
 *
 * petId Long ID of pet to update
 * additionalMetadata String Additional data to pass to server (optional)
 * file File file to upload (optional)
 * returns ApiResponse
 **/
exports.uploadFile = function(petId,additionalMetadata,file) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "code" : 0,
  "type" : "type",
  "message" : "message"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

