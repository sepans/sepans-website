/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import * as React from 'react'
import styled from 'styled-components'

import Header from './header'
import './layout.css'
import SEO from './seo'

export interface LayoutProps {
  children: React.ReactNode
  meta?: []
}

// TODO: query meta from mdx headers?
const Layout: React.FC<LayoutProps> = ({ meta, children }) => (
  <>
    <Header />
    <SEO meta={meta} />
    <Container>
      <MainArea>{children}</MainArea>
    </Container>
  </>
)

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 1.5em;
  margin-bottom: 30px;
  @media (min-width: 768px) {
    max-width: 90%; /* for diy grid */
    padding: 3em;
  }
`
const MainArea = styled.div`
  flex: 1;
`

export default Layout
