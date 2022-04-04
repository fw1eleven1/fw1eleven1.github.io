const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  const output = getConfig().output || {};

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
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const pathRegexp = /(.*)(\/contents\/)(.*)/
    if (pathRegexp.test(node.fileAbsolutePath)) {
      const slug = createFilePath({ node, getNode });
      createNodeField({ node, name: 'slug', value: slug });
    }

  }
};

exports.createPages = async ({ actions, graphql, reporter}) => {
  const {createPage} = actions

  const queryCategories = await graphql(
    `
      {
        allDirectory(filter: {relativeDirectory: {eq: ""}}) {
          nodes {
            relativePath
          }
        }
      }
    `
  )

  const PostListTemplateComponent = path.resolve(
    __dirname,
    'src/templates/postList_template.tsx'
  )

  const generatePostListPage = ({
      relativePath
  }) => {
    const pageOptions = {
      path: `/${relativePath}`,
      component: PostListTemplateComponent,
      context: {
        categoryRegex: `/(\/contents\/${relativePath})/`,
      }
    }

    createPage(pageOptions)
  }

  queryCategories.data.allDirectory.nodes.forEach(generatePostListPage)

  // queryCategories.data.allDirectory.nodes.forEach((category) => {
  //   console.log(`/(/contents/${category.relativePath})/`);
  //   createPage({
  //     path: `/${category.relativePath}`,
  //     component: PostListTemplateComponent,
  //     context: {
  //       categoryRegex: `/(\/contents\/${category.relativePath})/`
  //     }
  //   })
  // })
}