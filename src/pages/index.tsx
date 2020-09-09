import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Home" />
    <Title>Sepand Ansari</Title>
    <Links>
      <Link target="_blank" href="https://purplebulldozer.com">
        purple bulldozer
      </Link>
      <Link
        target="_blank"
        href="https://www.goodreads.com/user/show/22717-sepand"
      >
        goodreads
      </Link>
      <Link target="_blank" href="https://photos.app.goo.gl/5zZy6MCcMiavUdLx9">
        random projects
      </Link>
      <Link target="_blank" href="https://github.com/sepans/">
        github
      </Link>
      <Link target="_blank" href="https://www.linkedin.com/in/sepans/">
        linkedin
      </Link>
      <Link target="_blank" href="https://www.strava.com/athletes/14784454">
        strava
      </Link>
    </Links>
  </Layout>
)

const Links = styled.div`
  font-family: Inter;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
`

const Link = styled.a`
  color: #333;
  &:visited {
    color: #353535;
  }
  &:hover {
    color: #000;
  }
`

const Title = styled.h1 `
  font-family: Inter;
  font-size:48px;
  color:black;
`

const Description = styled.p`
  font-family: Inter;
  font-size: 24px;
  font-weight: 400;
  line-height: 1.4em;
  color: black;
  margin-top: 40px;
`


const Footnote = styled.p`
  font-family: Inter;
  font-size:16px;
  padding: 10px 0;
  line-height:1.6em;
  color:black;
`

const FootnoteArea = styled.div`
  margin-top: 30vh;
  /*overflow-y: scroll;
  max-height: 600px;*/
`

const FootnoteLink = styled.a`
color:black;
&:visited {
  color:black;
}
&:hover {
  color:red;
  cursor: s-resize;
}

`

export default IndexPage
