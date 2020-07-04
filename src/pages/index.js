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
      <h4>2020</h4>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        if (title !== "My Wishlist") {
          return (
            <div>
              <article key={node.fields.slug}>
                <header>
                  <p
                    style={{
                      marginBottom: rhythm(1 / 2),
                    }}
                  >
                    <Link style={{ color: 'hsla(0,0%,0%,0.9)' }} to={node.fields.slug}>
                      {title}
                    </Link>
                  </p>
                </header>
              </article>
            </div>
          )
        }
      })}
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
