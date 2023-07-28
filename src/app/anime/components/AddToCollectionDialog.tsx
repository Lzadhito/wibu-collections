import { useContext, useState } from 'react';
import type { FormEvent } from 'react';
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PhotoIcon from '@mui/icons-material/Photo';

import type { AnimeListItem } from '@/app/types/anime';
import { AnimeContext } from '@/context/AnimeContext';

import { txtCreate, txtCreateNewCollection, txtNewCollection, txtSelectCollection } from './locales';

interface Props {
  onClose: () => void;
  selectedManageData: AnimeListItem[];
  onSubmit: () => void;
}

export default function AddToCollectionDialog({ onClose, onSubmit, selectedManageData }: Props) {
  const [isCreateNewCollection, setIsCreateNewCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const { collections, createCollection, addToCollection } = useContext(AnimeContext);

  function handleClickCollection(collectionName: string) {
    addToCollection(selectedManageData, collectionName);
    onSubmit();
  }

  function handleClickCreateNewCollection(event: FormEvent) {
    event.preventDefault();
    if (newCollectionName) {
      createCollection(newCollectionName, selectedManageData);
      onSubmit();
    }
  }

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{txtSelectCollection}</DialogTitle>
      <DialogContent>
        <List>
          {Object.keys(collections).map((collectionName) => (
            <ListItem disablePadding key={collectionName}>
              <ListItemButton onClick={() => handleClickCollection(collectionName)}>
                <ListItemAvatar>
                  {collections[collectionName].length > 1 ? (
                    <Avatar src={collections[collectionName][0].bannerImage} />
                  ) : (
                    <Avatar>
                      <PhotoIcon />
                    </Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText primary={collectionName} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem data-testid="createNewCollectionRow">
            {isCreateNewCollection ? (
              <form onSubmit={handleClickCreateNewCollection}>
                <TextField
                  placeholder={txtNewCollection}
                  required
                  variant="standard"
                  value={newCollectionName}
                  onChange={(event) => setNewCollectionName(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button size="small" type="submit">
                          {txtCreate}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
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
      </DialogContent>
    </Dialog>
  );
}
