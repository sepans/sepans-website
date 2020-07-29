import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Home" />
    <Title>Sepand Ansari</Title>
    
    </Layout>
)

const Title = styled.h1 `
  &::first-letter {
    font-style:italic;
    font-weight:400;
  }
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
