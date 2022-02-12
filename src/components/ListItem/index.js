import {AiOutlineDelete} from 'react-icons/ai'

import './index.css'

const ListItem = props => {
  const {memberDetails, deleteMemberListItem, updateSelectedMembersList} = props

  const onClickCheckbox = event => {
    if (event.target.checked) {
      updateSelectedMembersList(event.target.id)
    }
  }

  const onClickDelete = () => {
    deleteMemberListItem(memberDetails.id)
  }

  return (
    <li className="member-list-item">
      <input type="checkbox" id={memberDetails.id} onChange={onClickCheckbox} />
      <p className="column-text">{memberDetails.name}</p>
      <p className="column-text">{memberDetails.email}</p>
      <p className="column-text">{memberDetails.role}</p>
      <button type="button" className="delete-button" onClick={onClickDelete}>
        <AiOutlineDelete />
      </button>
    </li>
  )
}

export default ListItem
