(function(){
    const payload = {
        variables: {
            slugPost: 'receitinha'
        },
        query: `
            fragment image on UploadFileEntity {
                id
                attributes {
                alternativeText
                url
                  }
            }
            fragment cover on UploadFileEntity {
            	...image
            }
            fragment tag on TagEntity {
                id
                attributes {
                displayName
                slug
              }
            }
            fragment author on AuthorEntity {
                id
                attributes {
                displayName
                slug
              }
            }
            fragment category on CategoryEntity {
                id
                attributes {
                displayName
                slug
              }
            }
            fragment authorPost on AuthorEntity {
              ...author
            }
            fragment categories on CategoryEntity {
              ...category
            }
            fragment menuLink on ComponentMenuMenuLink {
              id
              link
              text
              newTab
            }
            fragment posts on PostEntity {
                id
                attributes {
                    title
                    slug
                    excerpt
                    content
                    allowComments
                    cover {
                      data {
                        ...cover
                      }
                    }
                    categories {
                      data {
                        ...categories
                      }
                    }
                    tags {
                      data{
                        ...tag
                      }
                    }
                    author{
                          data{
                            ...authorPost
                          }
                    }
                  }
            }
            
            fragment setting on SettingEntity {
              id
              attributes {
                blogName
                blogDescription
                logo {
                  data {
                    ...image
                  }
                }
                menuLink {
                  ...menuLink
                }
                text
              }
            }
            query GET_POST_BY_SLUG($slugPost: String!) {
              setting {
                data {
                  ...setting
                }
              }
              posts(filters:{
                slug:{eq:$slugPost}
              }) {
                data {
                  ...posts
                }
              }
            }
        `
    }
    fetch('http://localhost:1337/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
    })
    .then(r => r)
    .then(r => r.json())
    .then(r => console.log(r))
    .catch(e => console.log(e));
})();