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
        <Header>
          <Link target="_blank" href="https://purplebulldozer.com">
            work
          </Link>
        </Header>
        <div>
          <PreviewContainer>
            <Link target="_blank" href="https://purplebulldozer.com">
              <img
                src="https://live.staticflickr.com/65535/54239465448_5ce55bb954_q.jpg"
                alt="Encartopedia"
              />
            </Link>
            <Link target="_blank" href="https://purplebulldozer.com">
              <img
                src="https://live.staticflickr.com/65535/54239632480_120fc53887_q.jpg"
                alt="ctzen"
              />
            </Link>
            <Link target="_blank" href="https://purplebulldozer.com">
              <img
                src="https://live.staticflickr.com/65535/54239460653_272cb7fc3d_q.jpg"
                alt="lenses"
              />
            </Link>
            <Link target="_blank" href="https://purplebulldozer.com">
              <img
                src="https://live.staticflickr.com/65535/54239222946_bd6cf8af09_q.jpg"
                alt="lohgic"
              />
            </Link>
            <Link target="_blank" href="https://purplebulldozer.com">
              <img
                src="https://live.staticflickr.com/65535/54239223171_ef41555824_q.jpg"
                alt="history lab"
              />
            </Link>
          </PreviewContainer>
        </div>
        <Header>
          <Link
            target="_blank"
            href="https://web.archive.org/web/20140208010957/http://sepans.com/sp/"
          >
            old work
          </Link>
        </Header>
        <PreviewContainer>
          <Link
            target="_blank"
            href="http://sepans.github.io/pb-lepracursor/components/pb-lepracursor/demo.html"
          >
            <img
              src="https://live.staticflickr.com/65535/54239638410_34876579ac_q.jpg"
              alt="lepra cursor"
            />
          </Link>
          <Link
            target="_blank"
            href="https://web.archive.org/web/20131223080911/http://sepans.com/sp/works/wikistalker/"
          >
            <img
              src="https://live.staticflickr.com/65535/54239467003_e4a1b6dc31_q.jpg"
              alt="wikistalker"
            />
          </Link>
          <Link target="_blank" href="https://theuse.info">
            <img
              src="https://live.staticflickr.com/65535/54239468433_ed7242d142_q.jpg"
              alt="theuse.info"
            />
          </Link>
        </PreviewContainer>
        <Header>
          <Link href="content/diy">projects</Link>
        </Header>
        <div>
          {randomGroups.map(([label, group]) => {
            const randomIndex = random(0, group.length - 1)
            return (
              <PreviewContainer key={`group-${label}`} title={label}>
                {group.slice(randomIndex, randomIndex + 1).map((photo) => (
                  <Link href="content/diy">
                    <img src={photo.thumbnailSrc} alt={photo.label} />
                  </Link>
                ))}
              </PreviewContainer>
            )
          })}
        </div>
        <Header>books</Header>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Link
            target="_blank"
            href="https://sepans-dashboards.netlify.app/books"
          >
            <PreviewContainer>
              <img
                src="https://live.staticflickr.com/65535/54239222436_08c0a31eaf_q.jpg"
                alt="unnamable"
              />
            </PreviewContainer>
          </Link>
        </div>

        <Header>rides</Header>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <PreviewContainer>
            <Link href="content/gdmbr">
              <img
                src="https://live.staticflickr.com/65535/54238324297_dbb471603f_q.jpg"
                alt="Great divide ride"
              />
            </Link>
            <Link href="content/ct">
              <img
                src="https://live.staticflickr.com/65535/54239633205_beaf7959d9_q.jpg"
                alt="Colorado trail ride"
              />
            </Link>
          </PreviewContainer>
        </div>
        <Header style={{ margin: '0.5em 0' }}>
          <Link target="_blank" href="https://github.com/sepans/">
            code
          </Link>
        </Header>
        <Header>
          <Link target="_blank" href="https://www.linkedin.com/in/sepans/">
            resume
          </Link>
        </Header>
      </Links>
    </Layout>
  )
}

const PreviewContainer = styled.span`
  display: inline-block;
  img,
  svg {
    margin: 10px 10px 0 0;
    width: 75px;
    filter: grayscale(100%);

    height: 75px;
    object-fit: cover;
    border: 1px solid black;
    font-size: 10px;
    font-family: inherit;
    fill: #444;
  }
`

const Links = styled.div`
  font-family: Inter;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
`

const Header = styled.div`
  color: #333;

  margin: 1.2em 0;
  margin-bottom: -5px;

  font-size: 14px;

  @media (min-width: 768px) {
    margin-top: 0px;
    font-size: 14px;
  }
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
  text-decoration: none;
`

const Title = styled.h1`
  font-family: Inter;
  font-size: 18px;
  color: black;
  font-weight: normal;
`

export default IndexPage
