// @ts-nocheck
import React from 'react';
import { Carousel, Typography, Card, Row } from 'antd';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'antd/dist/antd.css';
const { Text, Title } = Typography;
const { Meta } = Card;
const styles = {
  contentStyle: {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  },
};

interface HeaderBannerProps {
  walletAddress: string;
  isClientView: boolean;
}

export function HeaderBanner(props: HeaderBannerProps) {
  const { walletAddress, isClientView } = props;
  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
      originalHeight: 400,
      originalWidth: 3000,
      description: 'Discover remote developers',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
      originalHeight: 400,
      originalWidth: 3000,
      description: 'Pay after completion of project',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
      originalHeight: 400,
      originalWidth: 3000,
      description: 'Pay with crypto',
    },
  ];
  return (
    <>
      <div
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Title
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {props.isClientView ? "DownWork: Client view" : "DownWork: Freelancer view"}
        </Title>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Card
          hoverable
          style={{ width: 240, height: 180 }}
          cover={
            <div
              style={{
                marginTop: '50px',
                marginLeft: '10px',
                marginRight: '10px',
                whiteSpace: 'normal',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Row>
                <Text style={{ wordBreak: 'break-all' }} strong>
                  {`Hello ${walletAddress}`}
                </Text>
              </Row>
              <Row>
                <Text style={{ marginTop: '50px' }}>
                  {isClientView
                    ? `Discover remote developers`
                    : `Find remote projects`}
                </Text>
              </Row>
            </div>
          }
        ></Card>
        <ImageGallery
          items={images}
          showNav={false}
          showPlayButton={false}
          showFullscreenButton={false}
          showThumbnails={false}
          showBullets={true}
        />
      </div>
    </>
  );
}

export default HeaderBanner;
