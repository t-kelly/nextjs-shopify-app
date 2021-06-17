import Redis from 'ioredis'

export default class RedisStore {
  constructor(url) {
    // Create a new redis client
    this.client = new Redis(url);
  }

  /*
    The storeCallback takes in the Session, and sets a stringified version of it on the redis store
    This callback is used for BOTH saving new Sessions and updating existing Sessions.
    If the session can be stored, return true
    Otherwise, return false
  */
  storeCallback = async (session) => {
    try {
      // Inside our try, we use the `setAsync` method to save our session.
      // This method returns a boolean (true is successful, false if not)
      return await this.client.set(session.id, JSON.stringify(session))
    } catch (err) {
      // throw errors, and handle them gracefully in your application
      throw new Error(err)
    }
  };

  /*
    The loadCallback takes in the id, and uses the getAsync method to access the session data
     If a stored session exists, it's parsed and returned
     Otherwise, return undefined
  */
  loadCallback = async (id) => {
    try {
      // Inside our try, we use `getAsync` to access the method by id
      // If we receive data back, we parse and return it
      // If not, we return `undefined`
      let reply = await this.client.get(id);
      if (reply) {
        return JSON.parse(reply);
      } else {
        return undefined
      }
    } catch (err) {
      throw new Error(err)
    }
  };

  /*
    The deleteCallback takes in the id, and uses the redis `del` method to delete it from the store
    If the session can be deleted, return true
    Otherwise, return false
  */
  deleteCallback = async (id) => {
    try {
      // Inside our try, we use the `delAsync` method to delete our session.
      // This method returns a boolean (true is successful, false if not)
      return await this.client.del(id)
    } catch (err) {
      throw new Error(err)
    }
  };
}