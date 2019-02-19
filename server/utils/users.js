/**
 * class for creating users
 */
export default class Users {
  /**
   * constructor for creating users array
   */
  constructor() {
    this.users = [];
  }

  /**
   *
   * @param {string} id
   * @param {string} name
   * @param {string} room
   * @returns {object}
   */
  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
    return user;
  }

  /**
   *
   * @param {string} id
   * @returns {object}
   */
  removeUser(id) {
    const index = this.users.findIndex(user => user.id === id);
    if (index >= 0) return this.users.splice(index, 1)[0];
  }

  /**
   *
   * @param {string} id
   * @returns {object}
   */
  getUser(id) {
    return this.users.find(user => user.id === id);
  }

  /**
   *
   * @param {string} room
   * @returns {object}
   */
  getUserList(room) {
    const users = this.users.filter(user => user.room === room);
    return users.map(user => user.name);
  }
}
