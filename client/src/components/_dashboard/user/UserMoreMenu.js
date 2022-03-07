import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import { UsersActionCreators } from '../../../store/actions'

// ----------------------------------------------------------------------

export default function UserMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const openProfile = (props) => {
    console.log(props)
    localStorage.setItem('currentUserLogin', props.login || 'Не указано')
    localStorage.setItem('currentUserEmail', props.email)
    localStorage.setItem('currentUserName', props.name || 'Не указано')
    navigate(`/dashboard/users/id:${props.id}`, { replace: true })
  }
  const deleteProfile = (id) => {
    dispatch(UsersActionCreators.deleteUserProfile({id: id}))
    window.location.reload();
    // navigate(`/dashboard/users`, { replace: true })
  }
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={() => deleteProfile(props.id)}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Удалить" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={() => openProfile(props)} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Редактировать" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
