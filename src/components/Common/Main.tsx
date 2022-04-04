import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import Footer from './Footer'
import GlobalStyle from './GlobalStyle'
import Header from './Header'
import { graphql, useStaticQuery } from 'gatsby'
import Sidebar from './Sidebar'

type CategoryGroupProps = {
  edges: CategoryNodeProps
}

type CategoryEdgesProps = {
  node: CategoryNodeProps
}

type CategoryNodeProps = {
  relativeDirectory: string
}

type CategoriesProps = {
  [key: string]: number
}

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1024px;
  padding: 50px 0 100px;
  margin: 0 auto;
  gap: 20px;
`

const Main: FunctionComponent = function ({ children }) {
  const data = useStaticQuery(graphql`
    query {
      allDirectory(
        filter: { relativePath: { ne: "" }, relativeDirectory: { ne: "" } }
      ) {
        group(field: relativeDirectory) {
          edges {
            node {
              name
              relativeDirectory
            }
          }
        }
      }
    }
  `)

  const directoryGroups = data.allDirectory.group

  let categories: CategoriesProps = {
    All: 0,
  }
  directoryGroups.forEach((group: CategoryGroupProps) => {
    group.edges.forEach((edge: CategoryEdgesProps) => {
      if (categories[edge.node.relativeDirectory] === undefined)
        categories[edge.node.relativeDirectory] = 1
      else categories[edge.node.relativeDirectory]++
      categories['All']++
    })
  })

  return (
    <div>
      <GlobalStyle />
      <Header />
      <MainWrapper>
        <Sidebar categories={categories} />
        {children}
      </MainWrapper>
      <Footer />
    </div>
  )
}

export default Main
