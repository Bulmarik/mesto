export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  
  _handleResponse(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(this._handleResponse)
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(this._handleResponse)
  }

  setUser(name, description) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: description
      })
    })
    .then(this._handleResponse)
  }

  setAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(this._handleResponse)
  }

  addNewCard(item) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      })
    })
    .then(this._handleResponse)
  }

  delCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        _id: cardId,
      })
    })
    .then(this._handleResponse)
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify({
        _id: cardId,
      })
    })
    .then(this._handleResponse)
  }

  delLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        _id: cardId,
      })
    })
    .then(this._handleResponse)
  }
}