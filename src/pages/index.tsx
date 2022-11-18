import { random } from 'lodash'
import React from 'react'

import styled from 'styled-components'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { useFlickrImages } from '../hooks/useFlickrImages'

const IndexPage: React.FC = () => {
  const { photoGroups } = useFlickrImages()

  const groupsSize = Object.keys(photoGroups).length
  const groupsToPick = 6
  const start = random(0, groupsSize - groupsToPick)
  const randomGroups = Object.entries(photoGroups).slice(
    start,
    start + groupsToPick
  )

  return (
    <Layout>
      <SEO title="sepans.com" />
      <Title>Sepand Ansari</Title>
      <Links>
        <Link target="_blank" href="https://purplebulldozer.com">
          work
        </Link>
        <div>
          <PreviewContainer>
            <img
              src="https://purplebulldozer.com/img/posts/encartopedia.png"
              alt="Encartopedia"
            />
            <img
              src="https://user-images.githubusercontent.com/687513/81590005-c3016680-937f-11ea-8b76-50590f07cbbd.png"
              alt="ctzen"
            />
            <img
              src="https://purplebulldozer.com/img/posts/lenses.png"
              alt="lenses"
            />
            <img
              src="https://purplebulldozer.com/img/posts/lohgic.png"
              alt="lohgic"
            />
            <img
              src="https://purplebulldozer.com/img/posts/historylab.png"
              alt="history lab"
            />
          </PreviewContainer>
        </div>
        <Link
          target="_blank"
          href="https://web.archive.org/web/20140208010957/http://sepans.com/sp/"
        >
          old work (web archive)
        </Link>
        <PreviewContainer>
          <img
            src="https://camo.githubusercontent.com/56c0d87a4feb8bd15277e3438066375d49f0d5ef6ecb62068febb8b84ae2de90/687474703a2f2f736570616e732e6769746875622e696f2f70622d6c65707261637572736f722f636f6d706f6e656e74732f70622d6c65707261637572736f722f707265766965772e706e67"
            alt="lepra cursor"
          />
          <img
            src="https://user-images.githubusercontent.com/687513/202743886-e1602ba2-3685-4ace-a9f5-18753508a6fb.jpeg"
            alt="wikistalker"
          />
          <img
            src="https://user-images.githubusercontent.com/687513/202745453-ce13a00c-0854-43db-91c2-c55f3298aea4.png"
            alt="theuse.info"
          />
        </PreviewContainer>
        <Link
          target="_blank"
          href="https://www.goodreads.com/user/show/22717-sepand"
        >
          books
        </Link>
        <Link href="content/diy">diy projects</Link>
        <div>
          {randomGroups.map(([label, group]) => {
            const randomIndex = random(0, group.length - 1)
            return (
              <PreviewContainer key={`group-${label}`} title={label}>
                {group.slice(randomIndex, randomIndex + 1).map((photo) => (
                  <img src={photo.imageSrc} alt={photo.label} />
                ))}
              </PreviewContainer>
            )
          })}
        </div>
        <Link target="_blank" href="https://github.com/sepans/">
          code
        </Link>
        <Link target="_blank" href="https://www.strava.com/athletes/14784454">
          rides
        </Link>
        <Link target="_blank" href="https://www.linkedin.com/in/sepans/">
          jobs
        </Link>
      </Links>
    </Layout>
  )
}

const PreviewContainer = styled.span`
  display: inline-block;
  img {
    margin: 10px 10px 0 0;
    width: 75px;
    filter: grayscale(100%);

    height: 75px;
    object-fit: cover;
    border: 1px solid black;
  }
`

const Links = styled.div`
  font-family: Inter;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
`

const Link = styled.a`
  color: #333;
  display: inline-block;
  &:visited {
    color: #353535;
  }
  &:hover {
    color: #000;
  }
  margin-top: 20px;
  margin-bottom: -5px;

  font-size: 16px;

  @media (min-width: 768px) {
    margin-top: 10px;
    font-size: 14px;
  }
  text-decoration: none;
`

const Title = styled.h1`
  font-family: Inter;
  font-size: 18px;
  color: black;
  font-weight: normal;
`

export default IndexPage
