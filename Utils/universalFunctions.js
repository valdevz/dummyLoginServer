const USERS = require('../DummyData/Users')

  const capitalize = ( str ) => {
    if ( str == undefined || str == '' || typeof str != 'string' ) return str;
    else {
      const arr = str.split( ' ' );
      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice( 1 );
      }
      return arr.join( ' ' )
    }
  };
  const findByUnameOrMail = ( userOrMail ) => {
   let user = USERS.USERS.find((user) => user.userName == userOrMail || user.emailId == userOrMail);
   return user;
  };

  const findByMail = ( email ) => USERS.USERS.find((user) => user.emailId == email );

  const findByphone = ( phone ) => USERS.USERS.find((user) => user.phoneNo == phone );

  const getAllUsers = () => {
    //we use this to copy the USERS array and later modify the users2 array without affect the original array
    let  users2 = USERS.USERS.map(user => Object.assign({}, user));
    return users2.map((user) => {
      delete user.password
      delete user.token;
    });
  }

  const getUsersByFilter = ( name ) => {
    let result = [];
    let regex = new RegExp( name , "i" );
    USERS.USERS.map(( user ) => {
      if( regex.test( user.name ) || regex.test( user.lastname )) result.push( user );
    })
    return result;
  }

  const getUsersById = ( id ) => {
    return USERS.USERS.find(( user ) => user.userId == id );
  }

module.exports = {
  capitalize,
  findByUnameOrMail,
  findByMail,
  findByphone,
  getAllUsers,
  getUsersByFilter,
  getUsersById
}