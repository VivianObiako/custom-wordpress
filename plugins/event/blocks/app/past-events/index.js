// console.log( wp );
import block_icons from "../icons/index";
import "./editor.scss";
import apiFetch from "@wordpress/api-fetch";

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const {
  InspectorControls,
  BlockControls,
  AlignmentToolbar,
  BlockAlignmentToolbar,
} = wp.blockEditor;
const {
  PanelBody,
  PanelRow,
  ToggleControl,
  TextControl,
  SelectControl,
  ToolbarGroup,
  QueryControls,
  layoutControls,
  RadioControl,
  RangeControl,
} = wp.components;

const { useEffect, RawHTML } = wp.element;
const { dateI18n, format, __experimentalGetSettings } = wp.date;

const { Moment } = "react-moment";
const { moment } = "moment";

const MIN_EXCERPT_LENGTH = 10;
const MAX_EXCERPT_LENGTH = 100;
const MAX_POSTS_COLUMNS = 6;

registerBlockType("udemy/past-event", {
  title: __("Past Events", "event"),
  description: __("Yields past events.", "event"),
  // common, formatting, layout, widgets, embed
  category: "common",
  attributes: {
    categories: {
      type: "array",
      items: {
        type: "object",
      },
    },
    recent_events: {
      type: "array",
      default: [],
    },
    post_authors_id: {
      type: "array",
      default: [],
    },
    post_authors_name: {
      type: "array",
      default: [],
    },
    displayPostContent: {
      type: "boolean",
      default: false,
    },
    displayPostContentRadio: {
      type: "string",
      default: "excerpt",
    },
    excerptLength: {
      type: "number",
      default: 55,
    },
    displayAuthor: {
      type: "boolean",
      default: false,
    },
    displayPostDate: {
      type: "boolean",
      default: false,
    },
    text_alignment: {
      type: "string",
    },
    block_alignment: {
      type: "string",
      default: "wide",
    },
  },
  icon: block_icons.wapuu,
  keywords: [__("Event", "recipe"), __("Present", "recipe")],
  supports: {
    html: false,
  },
  getEditWrapperProps: ({ block_alignment }) => {
    if (
      "left" === block_alignment ||
      "right" === block_alignment ||
      "full" === block_alignment
    ) {
      return { "data-align": block_alignment };
    }
  },

  edit: (props) => {
    const { attributes, setAttributes } = props;
    const {
      postsToShow,
      order,
      orderBy,
      categories,
      selectedAuthor,
      post_authors_id,
      post_authors_name,
      displayFeaturedImage,
      displayPostContentRadio,
      displayPostContent,
      displayPostDate,
      displayAuthor,
      postLayout,
      columns,
      excerptLength,
      featuredImageAlign,
      featuredImageSizeSlug,
      featuredImageSizeWidth,
      featuredImageSizeHeight,
      addLinkToFeaturedImage,
      text_alignment,
    } = attributes;
    useEffect(() => {
      const events = apiFetch({
        url: "http://localhost:10018/wp-json/wp/v2/event?orderby=date",
      }).then((events) => {
        console.log(events);
        props.setAttributes({
          recent_events: events.filter(function (item) {
            return new Date(item["post-meta-fields"]["date"]) < new Date();
          }),
        });
      });
    }, []);

    useEffect(() => {
      const authors = apiFetch({
        url: "http://localhost:10018/wp-json/wp/v2/users",
      }).then((authors) => {
        console.log(authors);
        setAttributes({
          post_authors_id: authors.map((author) => {
            return author.id;
          }),
          post_authors_name: authors.map((author) => {
            return author.name;
          }),
        });
      });
    }, []);
    const author_map = post_authors_name.reduce(function (
      author_map,
      field,
      index
    ) {
      author_map[post_authors_id[index]] = field;
      return author_map;
    },
    {});
    console.log(post_authors_id);
    console.log(post_authors_name);
    console.log(author_map);
    const stripHtml = (content) => {
      return content.replace(/(<([^>]+)>)/gi, "");
    };
    const dateFormat = __experimentalGetSettings().formats.date;
    const time = new Date();

    // console.log(excerpt);

    function excerptCount(excerptContent, length) {
      if (excerptContent.split(" ") < length || excerptContent === "") {
        return excerptContent;
      } else {
        return excerptContent.split(" ").splice(0, length).join(" ");
      }
    }
    return [
      <InspectorControls>
        <PanelBody>
          <PanelBody title={__("Basics", "event")}>
            <PanelRow>
              <p>
                {__("Configure the contents of your block here.", "recipe")}
              </p>
            </PanelRow>

            <PanelBody title={__("Post content settings")}>
              <ToggleControl
                label={__("Post content")}
                checked={displayPostContent}
                onChange={(value) =>
                  setAttributes({ displayPostContent: value })
                }
              />
              {displayPostContent && (
                <RadioControl
                  label={__("Show:")}
                  selected={displayPostContentRadio}
                  options={[
                    { label: __("Excerpt"), value: "excerpt" },
                    { label: __("Full post"), value: "full_post" },
                  ]}
                  onChange={(value) =>
                    setAttributes({
                      displayPostContentRadio: value,
                    })
                  }
                />
              )}
              {displayPostContent && displayPostContentRadio === "excerpt" && (
                <RangeControl
                  label={__("Max number of words in excerpt")}
                  value={excerptLength}
                  onChange={(value) => setAttributes({ excerptLength: value })}
                  min={MIN_EXCERPT_LENGTH}
                  max={MAX_EXCERPT_LENGTH}
                />
              )}
            </PanelBody>
          </PanelBody>
        </PanelBody>
        <PanelBody title={__("Post meta settings")}>
          <ToggleControl
            label={__("Display author name")}
            checked={displayAuthor}
            onChange={(value) => setAttributes({ displayAuthor: value })}
          />
          <ToggleControl
            label={__("Display post date")}
            checked={displayPostDate}
            onChange={(value) => setAttributes({ displayPostDate: value })}
          />
        </PanelBody>
        <PanelBody title={__("Sorting and filtering")}>
          {/* <QueryControls
                            { ...{ order, orderBy } }
                            numberOfItems={ postsToShow }
                            onOrderChange={ ( value ) =>
                                setAttributes( { order: value } )
                            }
                            onOrderByChange={ ( value ) =>
                                setAttributes( { orderBy: value } )
                            }
                            onNumberOfItemsChange={ ( value ) =>
                                setAttributes( { postsToShow: value } )
                            }
                            categorySuggestions={ categorySuggestions }
                            onCategoryChange={ selectCategories }
                            selectedCategories={ categories }
                            onAuthorChange={ ( value ) =>
                                setAttributes( {
                                    selectedAuthor:
                                        '' !== value ? Number( value ) : undefined,
                                } )
                            }
                            authorList={ authorList }
                            selectedAuthorId={ selectedAuthor }
                        /> */}

          {/* { postLayout === 'grid' && (
                            <RangeControl
                                label={ __( 'Columns' ) }
                                value={ columns }
                                onChange={ ( value ) =>
                                    setAttributes( { columns: value } )
                                }
                                min={ 2 }
                                max={
                                    ! hasPosts
                                        ? MAX_POSTS_COLUMNS
                                        : Math.min(
                                                MAX_POSTS_COLUMNS,
                                                latestPosts.length
                                        )
                                }
                                required
                            />
                        ) } */}
        </PanelBody>
      </InspectorControls>,
      <div className={props.className}>
        <BlockControls>
          <BlockAlignmentToolbar
            value={props.attributes.block_alignment}
            onChange={(new_val) => {
              props.setAttributes({ block_alignment: new_val });
            }}
          />
          <AlignmentToolbar
            value={text_alignment}
            onChange={(new_val) => {
              props.setAttributes({ text_alignment: new_val });
            }}
          />
          <ToolbarGroup controls={layoutControls} />
        </BlockControls>
        <h3>Past Events</h3>
        <ul className="list-unstyled" style={{ textAlign: text_alignment }}>
          {props.attributes.recent_events ? (
            (props.events = props.attributes.recent_events.map((item) => {
              return (
                <li>
                  <a href={item.link}>{item.title.rendered}</a>
                  {displayAuthor && author_map && (
                    <div className="wp-block-latest-posts__post-author">
                      {sprintf(
                        /* translators: byline. %s: current author. */
                        __("by %s"),
                        author_map[item.author]
                      )}
                    </div>
                  )}
                  {displayPostDate && item.date_gmt && (
                    <time
                      dateTime={format("c", item.date_gmt)}
                      className="wp-block-latest-posts__post-date"
                    >
                      {dateI18n(dateFormat, item.date_gmt)}
                    </time>
                  )}
                  {displayPostContent &&
                    displayPostContentRadio === "excerpt" && (
                      <div className="wp-block-latest-posts__post-excerpt">
                        {stripHtml(
                          excerptCount(item.excerpt.rendered, excerptLength)
                        )}
                      </div>
                    )}
                  {displayPostContent &&
                    displayPostContentRadio === "full_post" && (
                      <div className="wp-block-latest-posts__post-full-content">
                        <RawHTML key="html">
                          {item.content.rendered.trim()}
                        </RawHTML>
                      </div>
                    )}
                </li>
              );
            }))
          ) : (
            <h3>No Events available</h3>
          )}
        </ul>
      </div>,
    ];
  },
  save: (props) => {
    const { attributes, setAttributes } = props;
    const {
      postsToShow,
      order,
      orderBy,
      categories,
      selectedAuthor,
      post_authors_id,
      post_authors_name,
      displayFeaturedImage,
      displayPostContentRadio,
      displayPostContent,
      displayPostDate,
      displayAuthor,
      postLayout,
      columns,
      excerptLength,
      featuredImageAlign,
      featuredImageSizeSlug,
      featuredImageSizeWidth,
      featuredImageSizeHeight,
      addLinkToFeaturedImage,
      text_alignment,
    } = attributes;

    const author_map = post_authors_name.reduce(function (
      author_map,
      field,
      index
    ) {
      author_map[post_authors_id[index]] = field;
      return author_map;
    },
    {});

    const dateFormat = __experimentalGetSettings().formats.date;
    const time = new Date();

    const stripHtml = (content) => {
      return content.replace(/(<([^>]+)>)/gi, "");
    };

    // console.log(excerpt);

    function excerptCount(excerptContent, length) {
      if (excerptContent.split(" ") < length || excerptContent === "") {
        return excerptContent;
      } else {
        return excerptContent.split(" ").splice(0, length).join(" ");
      }
    }
    return (
      //   <div className={`align${props.attributes.block_alignment}`}>
      //     <ul
      //       className="list-unstyled"
      //       style={{ textAlign: props.attributes.text_alignment }}
      //     >
      //       <li></li>
      //     </ul>
      //   </div>
      <div className={`align${props.attributes.block_alignment}`}>
        <ul
          className="list-unstyled"
          style={{ textAlign: props.attributes.text_alignment }}
        >
          {props.attributes.recent_events ? (
            (props.events = props.attributes.recent_events.map((item) => {
              return (
                <li>
                  <a href={item.link}>{item.title.rendered}</a>
                  {displayAuthor && author_map && (
                    <div className="wp-block-latest-posts__post-author">
                      {sprintf(
                        /* translators: byline. %s: current author. */
                        __("by %s"),
                        author_map[item.author]
                      )}
                    </div>
                  )}
                  {displayPostDate && item.date_gmt && (
                    <time
                      dateTime={format("c", item.date_gmt)}
                      className="wp-block-latest-posts__post-date"
                    >
                      {dateI18n(dateFormat, item.date_gmt)}
                    </time>
                  )}
                  {displayPostContent &&
                    displayPostContentRadio === "excerpt" && (
                      <div className="wp-block-latest-posts__post-excerpt">
                        {stripHtml(
                          excerptCount(item.excerpt.rendered, excerptLength)
                        )}
                      </div>
                    )}
                  {displayPostContent &&
                    displayPostContentRadio === "full_post" && (
                      <div className="wp-block-latest-posts__post-full-content">
                        <RawHTML key="html">
                          {item.content.rendered.trim()}
                        </RawHTML>
                      </div>
                    )}
                </li>
              );
            }))
          ) : (
            <h3>No Events available</h3>
          )}
        </ul>
      </div>
    );
  },
});
