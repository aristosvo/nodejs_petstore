var pool = require('./database')


/**
 * @param {Object} options
 * @param {Integer} options.limit How many items to return at one time (max 100)
 * @throws {Error}
 * @return {Promise}
 */
module.exports.listPets = async (options) => {
  try {
    var result = await pool.query('SELECT * from product')
  } catch (err) {
    throw new Error(err)
  }

  return {
    status: 200,
    data: result
  };

};

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
module.exports.createPets = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new Error({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });
  pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!
    console.log('connected as id ' + connection.threadId);
    // Use the connection

    connection.release();
  });

  return {
    status: 200,
    data: 'createPets ok!'
  };
};

/**
 * @param {Object} options
 * @param {String} options.petId The id of the pet to retrieve
 * @throws {Error}
 * @return {Promise}
 */
module.exports.showPetById = async (options) => {
  try {
    var result = await pool.query({
      sql: 'SELECT * FROM `product` WHERE `id` = ?',
      timeout: 40000, // 40s
      values: [options.petId]
    })
    //if result.ResultSetHeaderPacket.length == 
  } catch (err) {
    throw new Error({
       status: 500, 
        error: 'Could not find pet' 
     });
  }

  return {
    status: 200,
    data: result[0]
  };
};

