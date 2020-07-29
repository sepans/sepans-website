/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const SIDEBAR_CATEGORIES = [
  "experience", 
  "process"]

const Sidebar: React.FC = () => {
  const postData = useStaticQuery(graphql`
    query SiteTitleQuery {
      allMdx(filter: {}) {
        nodes {
          id
          excerpt(pruneLength: 40)
          rawBody
          wordCount {
            words
          }
          frontmatter {
            title
            slug
            type
          }
          fileAbsolutePath
          timeToRead
          html
        }
      }
    }
  `)

  const makeMenuList = (items: [any]) => {
    return items.map(item => {
      return (
        <SidebarItem key={item.frontmatter.slug}>
          <Link href="/content/">{item.frontmatter.title}</Link>
          <div key={item.frontmatter.slug}>{item.excerpt}</div>
        </SidebarItem>
      )
    })
  }

  const sidebarCategories = SIDEBAR_CATEGORIES.map(categoryName => {
    const categoryItems = makeMenuList(postData.allMdx.nodes.filter(
      (item: any) => item.frontmatter.type === categoryName
    ))
    return <SidebarCategory key={categoryName}>{categoryItems}</SidebarCategory>
  })

  const staticItems = (
    <SidebarCategory>
      <SidebarItem>
        <Link href="http://medium.com">An external blog post</Link>
        <div>A description a about the link</div>
      </SidebarItem>
    </SidebarCategory>
  )

  return (
    <>
      <Container>
        {sidebarCategories}
        {staticItems}
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  `

const SidebarCategory = styled.div`
  padding: 20px;
`

const SidebarItem = styled.div`
  margin-bottom: 10px;
  a,
  a:visited,
  a:hover {
    color: #555;
  }
`

const Link = styled.a ``

export default Sidebar
