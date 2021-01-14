export default class UserInfo {
  constructor({userName, userDescription}) {
    this._userName = userName;
    this._userDescription = userDescription;
  }

  getUserInfo() {
    const infoUser = {
      name: this._userName.textContent,
      description: this._userDescription.textContent
    }
    return infoUser;
  }

  setUserInfo(name, description) {
    this._userName.textContent = name;
    this._userDescription.textContent = description
  }
}