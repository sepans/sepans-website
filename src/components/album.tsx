import React from 'react';
import styled from 'styled-components';
import { groupBy } from 'lodash';

type Props = {
  albumName: string
}

const PHOTO_WIDTH = 300;

export const Album: React.FC<Props> = () => {
  const photos: any[] = [];

  const groups = groupBy(
    photos.filter((photo) => photo.label),
    (photo) => photo.label,
  );
  const photosWithoutGroup = photos.filter((photo) => !photo.label);

  const renderPhotos = (photo: ImageProps) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <LinkedImage imageWidth={PHOTO_WIDTH} {...photo} />
  );

  return (
    <>
      <h2>A photostream of some random projects</h2>
      <AlbumWrapper>
        {Object.keys(groups).map((label) => (
          <ImageGroup key={`group-${label}`} title={label}>
            {groups[label].map(renderPhotos)}
          </ImageGroup>
        ))}
        <ImageGroup title="more">
          {photosWithoutGroup.map(renderPhotos)}
        </ImageGroup>
      </AlbumWrapper>
    </>
  );
};

interface ImageGroupProps {
  title: string
}

const ImageGroup: React.FC<ImageGroupProps> = (props) => {
  const { title, children } = props;
  return (
    <GroupWrapper>
      <GroupTitle>{title}</GroupTitle>
      <GroupPhotos>{children}</GroupPhotos>
    </GroupWrapper>
  );
};

type ImageProps = {
  imageSrc: string
  ratio: number
  link: string
  description: string
  label: string
}

interface LinkedImageProps extends ImageProps {
  imageWidth: number
}

const LinkedImage: React.FC<LinkedImageProps> = (props) => {
  const {
    imageSrc, link, imageWidth, description,
  } = props;
  return (
    <PhotoWrapper>
      <a href={link}>
        <img alt={description} width={imageWidth} src={imageSrc} />
      </a>
      {description && <PhotoDescription>{description}</PhotoDescription>}
    </PhotoWrapper>
  );
};

const AlbumWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const GroupTitle = styled.h4`
  margin-top: 10px;
  margin-bottom: 5px;
`;

const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const GroupPhotos = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
`;

const PhotoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  img {
    margin: 0;
  }
`;

const PhotoDescription = styled.div`
  font-size: 12px;
  max-width: ${PHOTO_WIDTH}px;
  text-align: center;
  line-height: 1.5em;
  font-family: arial, sans;
`;
