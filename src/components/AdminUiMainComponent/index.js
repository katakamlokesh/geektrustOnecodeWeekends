import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import ListItem from '../ListItem'

import Pagination from '../Pagination'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class AdminUi extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    membersList: [],
    activePage: 1,
    limit: 10,
    searchInput: '',
    showSearchResults: false,
    searchResults: [],
  }

  componentDidMount() {
    this.getMembersList()
  }

  getMembersList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activePage, limit} = this.state

    const apiUrl =
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'

    const response = await fetch(apiUrl)

    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.map(eachObject => ({
        id: eachObject.id,
        name: eachObject.name,
        email: eachObject.email,
        role: eachObject.role,
        checked: false,
      }))

      const offset = (activePage - 1) * limit

      const ListOfMembers = formattedData.filter(
        eachMember => eachMember.id > offset && eachMember.id <= offset + limit,
      )

      this.setState({
        membersList: ListOfMembers,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  onKeyDownEnter = event => {
    const {membersList, searchInput} = this.state
    if (event.key === 'Enter') {
      const searchResults = membersList.filter(
        each =>
          each.name.toLowerCase().includes(searchInput) ||
          each.email.toLowerCase().includes(searchInput) ||
          each.role.toLowerCase().includes(searchInput),
      )

      this.setState(prevState => ({
        showSearchResults: !prevState.showSearchResults,
        searchResults,
      }))
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value.toLowerCase()})
  }

  renderSearchbar = () => {
    const {searchInput} = this.state

    return (
      <div className="search-input-container">
        <input
          type="search"
          value={searchInput}
          placeholder="Search by name,email or role"
          onChange={this.onChangeSearch}
          onKeyDown={this.onKeyDownEnter}
          className="input-container"
        />
        <button type="button" className="search-button">
          <BsSearch />
        </button>
      </div>
    )
  }

  onClickMainCheckbox = event => {
    const {membersList} = this.state

    const newList = membersList.map(each => ({
      ...each,
      checked: event.target.checked,
    }))

    this.setState({membersList: newList})
  }

  updateSelectedMembersList = (value, id) => {
    const {membersList} = this.state

    const newList = membersList.map(each =>
      each.id === id ? {...each, checked: value} : each,
    )

    this.setState({membersList: newList})
  }

  onClickDeleteSelected = event => {
    event.preventDefault()
    const {membersList} = this.state
    const newList = membersList.filter(each => each.checked === false)

    this.setState({membersList: newList})
  }

  deleteMemberListItem = memberId => {
    const {membersList} = this.state

    const filteredList = membersList.filter(
      eachMember => eachMember.id !== memberId,
    )

    this.setState({membersList: filteredList})
  }

  incrementActivePage = () => {
    const {activePage} = this.state
    if (activePage < 5) {
      this.setState({activePage: activePage + 1}, this.getMembersList)
    }
  }

  decrementActivePage = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState({activePage: activePage - 1}, this.getMembersList)
    }
  }

  updateActivePage = number => {
    this.setState({activePage: number}, this.getMembersList)
  }

  renderSearchResults = () => {
    const {searchResults} = this.state

    return searchResults.length > 0 ? (
      <>
        {searchResults.map(eachMember => (
          <ListItem
            key={eachMember.id}
            memberDetails={eachMember}
            deleteMemberListItem={this.deleteMemberListItem}
            updateSelectedMembersList={this.updateSelectedMembersList}
          />
        ))}
      </>
    ) : (
      <h1> No search results Found</h1>
    )
  }

  renderMembersList = () => {
    const {
      membersList,
      isAllItemsChecked,
      activePage,
      showSearchResults,
    } = this.state

    return (
      <form className="content-container" onSubmit={this.onClickDeleteSelected}>
        <ul className="list-container">
          <div className="column-line">
            <input
              type="checkbox"
              className="checkbox-class"
              onChange={this.onClickMainCheckbox}
            />
            <h1 className="column-heading">Name</h1>
            <h1 className="column-heading-email">Email</h1>
            <h1 className="column-heading">Role</h1>
            <h1 className="column-heading">Actions</h1>
          </div>
          {showSearchResults ? (
            this.renderSearchResults()
          ) : (
            <>
              {membersList.map(eachMember => (
                <ListItem
                  key={eachMember.id}
                  memberDetails={eachMember}
                  deleteMemberListItem={this.deleteMemberListItem}
                  isChecked={isAllItemsChecked}
                  updateSelectedMembersList={this.updateSelectedMembersList}
                />
              ))}
            </>
          )}
        </ul>
        <Pagination
          activePage={activePage}
          incrementActivePage={this.incrementActivePage}
          decrementActivePage={this.decrementActivePage}
          updateActivePage={this.updateActivePage}
        />
        <button type="submit" className="delete-selected-button">
          Delete Selected
        </button>
      </form>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container">
      <Loader type="Oval" color="#F7931E" width="50" height="50" />
    </div>
  )

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMembersList()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        {this.renderSearchbar()}
        {this.renderApiStatusView()}
      </div>
    )
  }
}

export default AdminUi
