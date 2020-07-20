import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  const wishlist = posts.find(post => post.node.frontmatter.title === "My Wishlist");
  const postsClean = posts.filter(post => post.node.frontmatter.index > 0);
  var pagesTotal = 0;
  postsClean.map(node => pagesTotal += node.node.frontmatter.pages);

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Zalkar Ziiaidin" />
      <Bio />
      <div>
        <article key={wishlist.node.fields.slug}>
          <header>
            <p
              style={{
                marginBottom: rhythm(1 / 2),
              }}
            >
              <Link style={{ color: 'hsla(0,0%,0%,0.9)' }} to={wishlist.node.fields.slug}>
                {wishlist.node.frontmatter.title}
              </Link>
            </p>
          </header>
        </article>
      </div>
      <h4>2020 - {postsClean.length} books | {pagesTotal} pages</h4>
      {postsClean.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <div key={node.fields.slug}>
            <article key={node.fields.slug}>
              <header>
                <p
                  style={{
                    marginBottom: rhythm(1 / 2),
                  }}
                >
                  {node.frontmatter.reviewAvailable
                  ? (
                    <Link style={{ color: 'hsla(0,0%,0%,0.9)' }} to={node.fields.slug}>
                    {title}
                  </Link>
                  )
                  : (
                    <span>{title}</span>
                  )}
                </p>
              </header>
            </article>
          </div>
        )
        }
      )}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___index], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            reviewAvailable
            title
            index
            pages
          }
        }
      }
    }
  }
`
