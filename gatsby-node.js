const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  const output = getConfig().output || {}

  actions.setWebpackConfig({
    output,
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        utils: path.resolve(__dirname, 'src/utils'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        assets: path.resolve(__dirname, 'src/assets'),
      },
    },
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const pathRegexp = /(.*)(\/contents\/)(.*)/
    if (pathRegexp.test(node.fileAbsolutePath)) {
      const slug = createFilePath({ node, getNode })
      createNodeField({ node, name: 'slug', value: slug })
    }
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const queryAllMarkdownData = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/(contents)/" } }
          sort: {
            order: DESC
            fields: [frontmatter___date, frontmatter___title]
          }
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `,
  )

  if (queryAllMarkdownData.erros) {
    reporter.panicOnBuild(`Error while runnign query`)
    return
  }

  const PostTemplateComponent = path.resolve(
    __dirname,
    'src/templates/post_template.tsx',
  )

  const generatePostPage = ({
    node: {
      fields: { slug },
    },
  }) => {
    const pageOptions = {
      path: slug,
      component: PostTemplateComponent,
      context: { slug },
    }

    createPage(pageOptions)
  }

  queryAllMarkdownData.data.allMarkdownRemark.edges.forEach(generatePostPage)

  const queryCategories = await graphql(
    `
      {
        allDirectory(filter: { relativeDirectory: { eq: "" } }) {
          nodes {
            relativePath
          }
        }
      }
    `,
  )

  const PostListTemplateComponent = path.resolve(
    __dirname,
    'src/templates/postList_template.tsx',
  )

  const PostPhotoListTemplateComponent = path.resolve(
    __dirname,
    'src/templates/postPhotoList_template.tsx'
  )

  const generatePostListPage = ({ relativePath }) => {
    const pageOptions = {
      path: `/${relativePath}`,
      component: relativePath === '사진' ? PostPhotoListTemplateComponent : PostListTemplateComponent,
      context: {
        categoryRegex: `/(\/contents\/${relativePath})/`,
      },
    }

    createPage(pageOptions)
  }

  queryCategories.data.allDirectory.nodes.forEach(generatePostListPage)
}
