import {Component} from 'react'
import {v4 as uuid4} from 'uuid'

import './index.css'

const colors = [
  '#7683cb',
  '#f59e0b',
  '#10b981',
  '#f97316',
  '#14b8a6',
  '#b91c1c',
  '#0ea5e9',
  '#64748b',
]

class PasswordManager extends Component {
  state = {
    username: '',
    website: '',
    password: '',
    passwordsList: [],
    showPassword: false,
    searchInput: '',
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {website, username, password} = this.state

    if (website !== '' && username !== '' && password !== '') {
      const color = colors[Math.floor(Math.random() * colors.length)]
      this.setState(prevState => ({
        passwordsList: [
          ...prevState.passwordsList,
          {
            id: uuid4(),
            website,
            username,
            password,
            color,
          },
        ],
        website: '',
        username: '',
        password: '',
      }))
    }
  }

  onChangeWebsiteName = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeCheckbox = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  filterPasswords = id => {
    const {passwordsList} = this.state
    const filters = passwordsList.filter(each => each.id !== id)
    this.setState({passwordsList: filters})
  }

  onClickDltBtn = id => {
    this.filterPasswords(id)
  }

  render() {
    const {
      website,
      username,
      password,
      passwordsList,
      showPassword,
      searchInput,
    } = this.state
    const searchResults = passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    console.log(searchResults)
    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo-img"
        />
        <div className="upper-part-container">
          <div className="sm-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
            />
          </div>
          <form className="card" onSubmit={this.onSubmitForm}>
            <h1 className="card-heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                type="text"
                placeholder="Enter Website"
                value={website}
                onChange={this.onChangeWebsiteName}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <div className="btn-container">
              <button className="add-btn" type="submit">
                Add
              </button>
            </div>
          </form>
          <div className="md-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
          </div>
        </div>

        <div className="lower-part-container">
          <div className="lower-part-header">
            <div className="password-count">
              <h1>Your Passwords</h1>
              <p>{searchResults.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr />
          <div className="show-password-container">
            <input
              id="checkbox"
              type="checkbox"
              onChange={this.onChangeCheckbox}
            />
            <label htmlFor="checkbox">Show Passwords</label>
          </div>
          {searchResults.length === 0 ? (
            <div className="no-passwords-view">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p>No Passwords</p>
            </div>
          ) : (
            <ul className="passwords-view">
              {searchResults.map(each => (
                <li key={each.id}>
                  <div className="details">
                    <p
                      className="profile"
                      style={{backgroundColor: each.color}}
                    >
                      {each.username.slice(0, 1).toUpperCase()}
                    </p>
                    <div className="details-container">
                      <p className="web-name">{each.website}</p>
                      <p>{each.username}</p>
                      {showPassword ? (
                        <p>{each.password}</p>
                      ) : (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                        />
                      )}
                    </div>
                  </div>
                  <button
                    data-testid="delete"
                    type="button"
                    className="dlt-container"
                    onClick={() => this.onClickDltBtn(each.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
