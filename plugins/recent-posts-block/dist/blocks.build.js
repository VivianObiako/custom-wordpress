!function(e){function t(l){if(n[l])return n[l].exports;var r=n[l]={i:l,l:!1,exports:{}};return e[l].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,l){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:l})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n(1)},function(e,t,n){"use strict";var l=n(2),r=(n.n(l),n(3)),__=(n.n(r),wp.i18n.__),o=wp.blocks.registerBlockType,s=wp.editor,a=(s.RichText,s.URLInput,s.InspectorControls),i=(s.ColorPalette,wp.components),u=i.PanelBody,p=(i.IconButton,i.RangeControl),c=(i.FontSizePicker,i.SelectControl),m=i.ToggleControl,b=wp.element.Fragment;o("cgb/block-recent-posts",{title:__("Recent Posts"),description:__("Display a list of your most recent posts including custom post types."),icon:"admin-page",category:"widgets",keywords:[__("recent-posts"),__("CGB Example"),__("create-guten-block")],attributes:{SelectedPostType:{type:"string"},PostType:{type:"object"},postperpage:{type:"number"},Order:{type:"string"},postdate:{type:"string"},postcontent:{type:"string"},imagesize:{type:"string"}},edit:function(e){function t(t){e.setAttributes({SelectedPostType:t.target.value})}return e.attributes.PostType||wp.apiFetch({url:"/gutenberg-demo/wp-json/wp/v2/types"}).then(function(t){e.setAttributes({PostType:t})}),wp.element.createElement(b,null,wp.element.createElement(a,null,wp.element.createElement(u,{title:"Parameter Settings"},wp.element.createElement(p,{value:e.attributes.postperpage,label:"Number of posts",min:0,max:50,initialPosition:5,allowReset:!0,onChange:function(t){return e.setAttributes({postperpage:t})}}),wp.element.createElement(c,{label:"Order By",value:e.attributes.Order,options:[{label:"Ascending",value:"ASC"},{label:"Descending",value:"DESC"}],onChange:function(t){return e.setAttributes({Order:t})}})),wp.element.createElement(u,{title:"Post Meta Settings"},wp.element.createElement(m,{label:"Display Post Date",checked:e.attributes.postdate,onChange:function(t){return e.setAttributes({postdate:t})}})),wp.element.createElement(u,{title:"Post Excerpt Settings"},wp.element.createElement(m,{label:"Display Post Excerpt",checked:e.attributes.postcontent,onChange:function(t){return e.setAttributes({postcontent:t})}})),wp.element.createElement(u,{title:"Image Settings"},wp.element.createElement(c,{label:"Image Size",value:e.attributes.imagesize,options:[{label:"Thumbnail",value:"thumbnail"},{label:"Medium",value:"medium"},{label:"Large",value:"large"},{label:"Full",value:"full"}],onChange:function(t){return e.setAttributes({imagesize:t})}}))),wp.element.createElement("div",null,wp.element.createElement("p",null,"Select Post Type"),wp.element.createElement("select",{onChange:t,value:e.attributes.SelectedPostType},e.attributes&&e.attributes.PostType?Object.keys(e.attributes.PostType).map(function(e){return wp.element.createElement("option",{value:e,key:e},e)}):"")))},save:function(e){return null}})},function(e,t){},function(e,t){}]);