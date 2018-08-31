class Flash {
  static _messages = null;//making it null is easy to work with because it always returns falsey

  static setMessage(type, message) {
    this._messages = this._messages || {};//if messages is null i need to change it to an object
    this._messages[type] = message;//need to add type otherwise if type was [danger] it would say type of undefined so we need to say this first before we set messages and we're assigning it to what
  }

  static getMessages() {
    return this._messages;
  }

  static clearMessages() {
    this._messages = null;
  }
}

export default Flash;
