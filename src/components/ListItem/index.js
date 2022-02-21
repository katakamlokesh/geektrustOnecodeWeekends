import {AiOutlineDelete} from 'react-icons/ai'

import './index.css'

const ListItem = props => {
  const {memberDetails, deleteMemberListItem, updateSelectedMembersList} = props

  const onClickCheckbox = event => {
    updateSelectedMembersList(event.target.checked, memberDetails.id)
  }

  const onClickDelete = () => {
    deleteMemberListItem(memberDetails.id)
  }

  const itemClass = memberDetails.checked
    ? 'selected-active member-list-item'
    : 'member-list-item'

  return (
    <li className={itemClass}>
      <input
        type="checkbox"
        id={memberDetails.id}
        onChange={onClickCheckbox}
        checked={memberDetails.checked}
        className="checkbox-class"
      />
      <p className="column-text">{memberDetails.name}</p>
      <p className="column-text-email">{memberDetails.email}</p>
      <p className="column-text">{memberDetails.role}</p>
      <button type="button" className="delete-button" onClick={onClickDelete}>
        <AiOutlineDelete />
      </button>
    </li>
  )
}

export default ListItem
