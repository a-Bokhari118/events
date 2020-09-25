import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react';
import PhotoUploadWidget from '../../../app/common/photos/PhotoUploadWidget';
import { deleteFromFirebaseStorage } from '../../../app/firestore/firebaseService';
import {
  deletePhotoFromCollection,
  getUserPhotos,
  setMainPhoto,
} from '../../../app/firestore/firestroeService';
import useFireStoreCollection from '../../../app/hooks/useFirestoreCollection';
import { listenToUserPhotos } from '../profileActions';
const PhotosTab = ({ profile, isCurrentUser }) => {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.async);
  const { photos } = useSelector((state) => state.profile);

  const [updating, setUpdating] = useState({ isUpdating: false, target: null });
  const [deleting, setdeleting] = useState({ isdeleting: false, target: null });
  useFireStoreCollection({
    query: () => getUserPhotos(profile.id),
    data: (photos) => dispatch(listenToUserPhotos(photos)),
    deps: [profile.id, dispatch],
  });

  const handelSetMainPhoto = async (photo, target) => {
    setUpdating({ isUpdating: true, target });
    try {
      await setMainPhoto(photo);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdating({ isUpdating: false, target: null });
    }
  };

  const handelDeletePhoto = async (photo, target) => {
    setdeleting({ isdeleting: true, target });
    try {
      await deleteFromFirebaseStorage(photo.name);
      await deletePhotoFromCollection(photo.id);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setdeleting({ isdeleting: false, target: null });
    }
  };

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='user' content={`Photos`} />
          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated='right'
              basic
              content={editMode ? 'Cancel' : 'Add'}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <PhotoUploadWidget setEditMode={setEditMode} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {photos.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  <Button.Group fluid widths={2}>
                    <Button
                      name={photo.id}
                      loading={
                        updating.isUpdating && updating.target === photo.id
                      }
                      basic
                      color='green'
                      content='Main'
                      onClick={(e) => handelSetMainPhoto(photo, e.target.name)}
                      disabled={photo.url === profile.photoURL}
                    />
                    <Button
                      name={photo.id}
                      loading={
                        deleting.isdeleting && deleting.target === photo.id
                      }
                      basic
                      color='red'
                      icon='trash'
                      onClick={(e) => handelDeletePhoto(photo, e.target.name)}
                      disabled={photo.url === profile.photoURL}
                    />
                  </Button.Group>
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default PhotosTab;
