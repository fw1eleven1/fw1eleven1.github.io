import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import Main from 'components/Common/Main'
import styled from '@emotion/styled'
import PostHead from 'components/Post/PostHead'
import PostContent from 'components/Post/PostContent'

type PostTemplateProps = {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
    allMarkdownRemark: {
      edges: PostListItemProps[]
    }
  }
  location: {
    href: string
  }
}

type PostListItemProps = {
  node: {
    fields: { slug: string }
    html: string
    frontmatter: {
      title: string
      date: string
      summary: string
      tags: string[]
    }
  }
}

const ChildWrapper = styled.div`
  max-width: 800px;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
  data: {
    site: {
      siteMetadata: { title: siteMetaTitle },
    },
    allMarkdownRemark: { edges },
  },
  location: { href },
}) {
  const {
    node: {
      html,
      frontmatter: { title, summary, date, tags },
    },
  } = edges[0]

  return (
    <Main
      siteMetadata={{
        title: siteMetaTitle,
        description: summary,
        siteUrl: href,
      }}
      title={title}
    >
      <ChildWrapper>
        <PostHead title={title} date={date} tags={tags} />
        <PostContent html={html} />
      </ChildWrapper>
    </Main>
  )
}

export default PostTemplate

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            summary
            date(formatString: "YYYY-MM-DD")
            tags
          }
        }
      }
    }
  }
`