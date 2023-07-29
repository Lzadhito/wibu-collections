import { useContext, useState } from 'react';

import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PhotoIcon from '@mui/icons-material/Photo';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { AnimeContext } from '@/context/AnimeContext';

import LazyDeleteConfirmationModal from './components/DeleteConfirmationModal/lazy';
import LazySubmitInput from './components/SubmitInput/lazy';
import { txtCreate, txtCreateNewCollection, txtEdit, txtEditCollectionName, txtNewCollection } from '../locales';
import { StyledActionContainer } from '../styles';

interface Props {
  onClickCollection: (collectionName: string) => void;
  showActions?: boolean;
}

export default function CollectionPreviewList({ onClickCollection, showActions = false }: Props) {
  const { collections, createCollection, editCollectionName } = useContext(AnimeContext);

  const [isCreateNewCollection, setIsCreateNewCollection] = useState(false);
  const [selectedDeleteCollectionName, setSelectedDeleteCollectionName] = useState('');
  const [selectedEditCollectionName, setSelectedEditCollectionName] = useState('');

  function handleCreateNewCollection(newCollectionName: string) {
    if (newCollectionName) {
      createCollection(newCollectionName);
      setIsCreateNewCollection(false);
    }
  }
  function handleEditCollectionName(newCollectionName: string) {
    if (newCollectionName) {
      editCollectionName(selectedEditCollectionName, newCollectionName);
      setSelectedEditCollectionName('');
    }
  }

  function handleClickEditIcon(collectionName: string) {
    setSelectedEditCollectionName(collectionName);
  }

  function handleClickDeleteIcon(collectionName: string) {
    setSelectedDeleteCollectionName(collectionName);
  }

  return (
    <>
      <List>
        {Object.keys(collections)
          .sort()
          .map((collectionName) => (
            <>
              {selectedEditCollectionName === collectionName ? (
                <ListItem>
                  <LazySubmitInput
                    onCancel={() => setSelectedEditCollectionName('')}
                    defaultValue={selectedEditCollectionName}
                    onSubmit={handleEditCollectionName}
                    submitTxt={txtEdit}
                    placeholder={txtEditCollectionName}
                  />
                </ListItem>
              ) : (
                <ListItem
                  secondaryAction={
                    showActions ? (
                      <StyledActionContainer>
                        <IconButton onClick={() => handleClickEditIcon(collectionName)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleClickDeleteIcon(collectionName)}>
                          <DeleteIcon />
                        </IconButton>
                      </StyledActionContainer>
                    ) : null
                  }
                  disablePadding
                  key={collectionName}
                >
                  <ListItemButton onClick={() => onClickCollection(collectionName)}>
                    <ListItemAvatar>
                      {collections[collectionName].length > 1 ? (
                        <Avatar src={collections[collectionName][0]?.coverImage?.large} />
                      ) : (
                        <Avatar>
                          <PhotoIcon />
                        </Avatar>
                      )}
                    </ListItemAvatar>
                    <ListItemText primary={collectionName} />
                  </ListItemButton>
                </ListItem>
              )}
            </>
          ))}
        <ListItem data-testid="createNewCollectionRow">
          {isCreateNewCollection ? (
            <LazySubmitInput
              onCancel={() => setIsCreateNewCollection(false)}
              onSubmit={handleCreateNewCollection}
              submitTxt={txtCreate}
              placeholder={txtNewCollection}
            />
          ) : (
            <ListItemButton onClick={() => setIsCreateNewCollection(true)}>
              <ListItemIcon>
                <AddCircleOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={txtCreateNewCollection} />
            </ListItemButton>
          )}
        </ListItem>
      </List>
      {!!selectedDeleteCollectionName && (
        <LazyDeleteConfirmationModal
          collectionName={selectedDeleteCollectionName}
          handleClose={() => setSelectedDeleteCollectionName('')}
        />
      )}
    </>
  );
}
