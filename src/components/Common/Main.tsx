import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Footer from './Footer'
import GlobalStyle from './GlobalStyle'
import Header from './Header'
import { graphql, useStaticQuery } from 'gatsby'
import Sidebar from './Sidebar'

type CategoryEdgesProps = {
  edges: CategoryNodeProps[]
}

type CategoryNodeProps = {
  node: {
    relativeDirectory: string
  }
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
  const [pathname, setPathname] = useState<string>('')
  useEffect(() => {
    let path: string = window.location.pathname
    setPathname(path.substring(1) === '' ? 'All' : path.substring(1))
  }, [window.location.pathname])

  const data = useStaticQuery(graphql`
    query {
      allDirectory(
        filter: { relativePath: { ne: "" }, relativeDirectory: { ne: "" } }
      ) {
        group(field: relativeDirectory) {
          edges {
            node {
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
  directoryGroups.forEach((group: CategoryEdgesProps) => {
    group.edges.forEach((edge: CategoryNodeProps) => {
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
        <Sidebar selectedCategory={pathname} categories={categories} />
        {children}
      </MainWrapper>
      <Footer />
    </div>
  )
}

export default Main
