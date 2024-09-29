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
            <Link target="_blank" href="https://purplebulldozer.com">
              <img
                src="https://purplebulldozer.com/img/posts/encartopedia.png"
                alt="Encartopedia"
              />
            </Link>
            <Link target="_blank" href="https://purplebulldozer.com">
              <img
                src="https://user-images.githubusercontent.com/687513/81590005-c3016680-937f-11ea-8b76-50590f07cbbd.png"
                alt="ctzen"
              />
            </Link>
            <Link target="_blank" href="https://purplebulldozer.com">
              <img
                src="https://purplebulldozer.com/img/posts/lenses.png"
                alt="lenses"
              />
            </Link>
            <Link target="_blank" href="https://purplebulldozer.com">
              <img
                src="https://purplebulldozer.com/img/posts/lohgic.png"
                alt="lohgic"
              />
            </Link>
            <Link target="_blank" href="https://purplebulldozer.com">
              <img
                src="https://purplebulldozer.com/img/posts/historylab.png"
                alt="history lab"
              />
            </Link>
          </PreviewContainer>
        </div>
        <Link
          target="_blank"
          href="https://web.archive.org/web/20140208010957/http://sepans.com/sp/"
        >
          old work (web archive)
        </Link>
        <PreviewContainer>
          <Link
            target="_blank"
            href="http://sepans.github.io/pb-lepracursor/components/pb-lepracursor/demo.html"
          >
            <img
              src="https://camo.githubusercontent.com/7759a73b02ef5e0f300a07082f8bfd95583ae61394ff7509c44c8d909b8d5aff/687474703a2f2f736570616e732e6769746875622e696f2f70622d6c65707261637572736f722f636f6d706f6e656e74732f70622d6c65707261637572736f722f707265766965772e706e67"
              alt="lepra cursor"
            />
          </Link>
          <Link
            target="_blank"
            href="https://web.archive.org/web/20131223080911/http://sepans.com/sp/works/wikistalker/"
          >
            <img
              src="https://user-images.githubusercontent.com/687513/202743886-e1602ba2-3685-4ace-a9f5-18753508a6fb.jpeg"
              alt="wikistalker"
            />
          </Link>
          <Link target="_blank" href="https://theuse.info">
            <img
              src="https://user-images.githubusercontent.com/687513/202745453-ce13a00c-0854-43db-91c2-c55f3298aea4.png"
              alt="theuse.info"
            />
          </Link>
        </PreviewContainer>
        <Link href="content/diy">diy projects</Link>
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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          books
          <Link
            target="_blank"
            href="https://sepans-dashboards.netlify.app/books"
          >
            <PreviewContainer>
              <img
                src="https://covers.openlibrary.org/b/id/12921955-L.jpg"
                alt="unnamable"
              />
            </PreviewContainer>
          </Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          rides
          <PreviewContainer>
            <Link href="content/gdmbr">
              <svg name="great divide">
                <g transform="translate(-10, 10) scale(1.6, 1)">
                  <path
                    strokeWidth={0.5}
                    fill="none"
                    stroke="#444"
                    d="M10,25.507L10.198,24.776L10.396,23.313L10.593,29.164L10.791,33.553L10.989,33.553L11.187,35.016L11.385,35.016L11.583,32.822L11.78,35.748L11.978,37.942L12.176,40.868L12.374,41.599L12.572,34.285L12.77,39.405L12.967,39.405L13.165,39.405L13.363,39.405L13.561,34.285L13.759,34.285L13.956,37.21L14.154,36.479L14.352,34.285L14.55,32.09L14.748,32.09L14.946,32.09L15.143,29.164L15.341,31.359L15.539,26.97L15.737,26.239L15.935,26.239L16.132,26.97L16.33,33.553L16.528,31.359L16.726,27.702L16.924,27.702L17.122,27.702L17.319,28.433L17.517,21.85L17.715,21.85L17.913,27.702L18.111,28.433L18.309,27.702L18.506,26.239L18.704,20.387L18.902,26.97L19.1,26.239L19.298,23.313L19.495,25.507L19.693,23.313L19.891,27.702L20.089,21.118L20.287,21.118L20.485,22.581L20.682,19.656L20.88,11.61L21.078,10.878L21.276,16.73L21.474,13.804L21.671,13.073L21.869,15.267L22.067,10.878L22.265,13.073L22.463,18.924L22.661,21.85L22.858,21.118L23.056,17.461L23.254,17.461L23.452,18.924L23.65,18.193L23.848,17.461L24.045,19.656L24.243,21.85L24.441,22.581L24.639,21.85L24.837,21.118L25.034,23.313L25.232,22.581L25.43,21.118L25.628,21.85L25.826,21.85L26.024,21.118L26.221,21.85L26.419,20.387L26.617,19.656L26.815,21.118L27.013,23.313L27.211,23.313L27.408,23.313L27.606,13.073L27.804,21.118L28.002,21.118L28.2,20.387L28.397,20.387L28.595,15.267L28.793,15.998L28.991,13.073L29.189,13.073L29.387,13.073L29.584,12.341L29.782,13.804L29.98,10.878L30.178,12.341L30.376,13.073L30.573,10.878L30.771,11.61L30.969,16.73L31.167,12.341L31.365,10.147L31.563,8.684L31.76,15.998L31.958,15.267L32.156,10.878L32.354,16.73L32.552,16.73L32.75,18.193L32.947,16.73L33.145,10.878L33.343,9.415L33.541,4.295L33.739,3.564L33.936,2.832L34.134,2.832L34.332,2.101L34.53,11.61L34.728,8.684L34.926,8.684L35.123,8.684L35.321,7.221L35.519,6.489L35.717,10.147L35.915,11.61L36.112,13.804L36.31,13.804L36.508,18.193L36.706,20.387L36.904,18.924L37.102,23.313L37.299,17.461L37.497,16.73L37.695,10.878L37.893,9.415L38.091,7.952L38.289,13.804L38.486,22.581L38.684,22.581L38.882,24.776L39.08,24.776L39.278,24.776L39.475,19.656L39.673,13.804L39.871,21.118L40.069,24.044L40.267,24.044L40.465,23.313L40.662,20.387L40.86,18.924L41.058,18.924L41.256,19.656L41.454,19.656L41.652,18.193L41.849,22.581L42.047,19.656L42.245,21.118L42.443,22.581L42.641,22.581L42.838,21.85L43.036,20.387L43.234,18.193L43.432,21.118L43.63,25.507L43.828,21.85L44.025,26.239L44.223,32.822L44.421,32.822L44.619,32.822L44.817,32.822L45.014,32.822L45.212,32.822L45.41,32.822L45.608,32.822L45.806,32.822L46.004,36.479L46.201,34.285L46.399,35.016"
                  />
                </g>
                <text x="1</g>" y="70">
                  GDMBR
                </text>
              </svg>
            </Link>
            <Link href="content/ct">
              <svg name="colorado trail">
                <g transform="translate(-10, 10) scale(1.6, 1)">
                  <path
                    strokeWidth={0.6}
                    fill="none"
                    stroke="#444"
                    d="M10,35.925L10.586,33.249L11.171,30.573L11.757,29.681L12.342,28.79L12.928,30.573L13.514,27.006L14.099,27.898L14.685,27.898L15.27,27.898L15.856,30.573L16.441,27.006L17.027,26.114L17.613,16.303L18.198,14.52L18.784,22.547L19.369,21.655L19.955,19.871L20.541,13.628L21.126,12.736L21.712,10.06L22.297,7.385L22.883,6.493L23.469,18.087L24.054,17.195L24.64,16.303L25.225,9.168L25.811,6.493L26.396,5.601L26.982,14.52L27.568,14.52L28.153,16.303L28.739,16.303L29.324,16.303L29.91,15.412L30.496,18.979L31.081,20.763L31.667,18.087L32.252,23.438L32.838,19.871L33.424,17.195L34.009,16.303L34.595,10.952L35.18,9.168L35.766,19.871L36.351,20.763L36.937,21.655L37.523,21.655L38.108,12.736L38.694,10.06L39.279,8.277L39.865,4.709L40.451,2.925L41.036,0.25L41.622,4.709L42.207,7.385L42.793,8.277L43.379,18.979L43.964,14.52L44.55,9.168L45.135,7.385L45.721,11.844L46.306,10.06L46.892,9.168L47.478,11.844L48.063,13.628L48.649,35.033"
                  />
                </g>
                <text x="1" y="70">
                  CT
                </text>
              </svg>
            </Link>
          </PreviewContainer>
        </div>
        <Link target="_blank" href="https://github.com/sepans/">
          code
        </Link>
        <Link target="_blank" href="https://www.linkedin.com/in/sepans/">
          resume
        </Link>
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
    margin-top: 0px;
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
