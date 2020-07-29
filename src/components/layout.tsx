/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import * as React from "react"

import Header from "./header"
import Sidebar from "./sidebar"
import "./layout.css"
import styled from "styled-components"


export interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {

 
  return (
    <>
      <Header />
      <Container>
        <MainArea>{props.children}</MainArea>
        
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  max-width: 960px;
  width: 100%;
  padding: 30px;
  @media (min-width: 768px) {
    width: 780px;
    padding-left:80px;
    padding-top:120px;
  }

`
const MainArea = styled.div`
  flex: 1;

`


export default Layout