import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Footer from './Footer'
import GlobalStyle from './GlobalStyle'
import Header from './Header'
import { graphql, useStaticQuery } from 'gatsby'
import Sidebar from './Sidebar'
import { Helmet } from 'react-helmet'

type MainProps = {
  siteMetadata: {
    title: string
    description: string
    siteUrl: string
  }
  title?: string
  children: ReactNode
}

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
  padding: 50px 12px 100px;
  margin: 0 auto;
  gap: 20px;

  @media (max-width: 1024px) {
    width: 100%;
    padding: 30px 35px 100px;
  }
`

const Main: FunctionComponent<MainProps> = function ({
  siteMetadata,
  title,
  children,
}) {
  const [pathname, setPathname] = useState<string>('')
  useEffect(() => {
    let path: string = window.location.pathname
    path = path.substring(1)
    if (path === '') {
      path = 'All'
    } else {
      if (path.indexOf('/') !== -1) {
        path = path.substring(0, path.indexOf('/'))
      }
    }
    setPathname(path)
  }, [])

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
      <Helmet>
        (
        <title>
          {title !== undefined
            ? `${title} | ${siteMetadata.title}`
            : siteMetadata.title}
        </title>
        <meta name="description" content={siteMetadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <html lang="ko" />
      </Helmet>
      <GlobalStyle />
      <Header selectedCategory={pathname} categories={categories} />
      <MainWrapper>
        <Sidebar selectedCategory={pathname} categories={categories} />
        {children}
      </MainWrapper>
      <Footer />
    </div>
  )
}

export default Main
