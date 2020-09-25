import React, { Fragment, useState } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import PhotoWidgetCropper from './PhotoWidgetCropper';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';
import cuid from 'cuid';
import { getFileExtention } from '../util/util';
import { UploadToFirebaseStorage } from '../../firestore/firebaseService';
import { toast } from 'react-toastify';
import { UpdateUserProfilePhoto } from '../../firestore/firestroeService';
const PhotoUploadWidget = ({ setEditMode }) => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUploadImage = () => {
    setLoading(true);
    const filename = cuid() + '.' + getFileExtention(files[0].name);
    const uploadTask = UploadToFirebaseStorage(image, filename);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is:' + progress + '% done');
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          UpdateUserProfilePhoto(downloadURL, filename)
            .then(() => {
              setLoading(false);
              handleCancelCrop();
              setEditMode(false);
            })
            .catch((error) => {
              toast.error(error.message);
              setLoading(false);
            });
        });
      }
    );
  };

  const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
  };
  return (
    <Grid>
      <Grid.Column width={4}>
        <Header color='teal' sub content='Step 1- Add Photo' />
        <PhotoWidgetDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />

      <Grid.Column width={4}>
        <Header color='teal' sub content='Step 2- Resize' />
        {files.length > 0 && (
          <PhotoWidgetCropper
            setImage={setImage}
            imagePreview={files[0].preview}
          />
        )}
      </Grid.Column>
      <Grid.Column width={1} />

      <Grid.Column width={4}>
        <Header color='teal' sub content='Step 3- Preview And Upload' />
        {files.length > 0 && (
          <Fragment>
            <div
              className='img-preview'
              style={{ minHeight: 200, minWidth: 200, overflow: 'hidden' }}
            />
            <Button.Group>
              <Button
                loading={loading}
                style={{ width: 100 }}
                positive
                icon='check'
                onClick={handleUploadImage}
              />
              <Button
                style={{ width: 100 }}
                icon='close'
                onClick={handleCancelCrop}
                disabled={loading}
              />
            </Button.Group>
          </Fragment>
        )}
      </Grid.Column>
      <Grid.Column width={1} />
    </Grid>
  );
};

export default PhotoUploadWidget;
