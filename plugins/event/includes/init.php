<?php

function event_init() {
    
    $labels = array(
        'name'                  => _x( 'Events', 'Post type general name', 'event' ),
        'singular_name'         => _x( 'Event', 'Post type singular name', 'event' ),
        'menu_name'             => _x( 'Events', 'Admin Menu text', 'event' ),
        'name_admin_bar'        => _x( 'Event', 'Add New on Toolbar', 'event' ),
        'add_new'               => __( 'Add New', 'event' ),
        'add_new_item'          => __( 'Add New Event', 'event' ),
        'new_item'              => __( 'New Event', 'event' ),
        'edit_item'             => __( 'Edit Event', 'event' ),
        'view_item'             => __( 'View Event', 'event' ),
        'all_items'             => __( 'All Events', 'event' ),
        'search_items'          => __( 'Search Events', 'event' ),
        'parent_item_colon'     => __( 'Parent Events:', 'event' ),
        'not_found'             => __( 'No Events found.', 'event' ),
        'not_found_in_trash'    => __( 'No Events found in Trash.', 'event' ),
        // 'featured_image'        => _x( 'Event Cover Image', 'Overrides the “Featured Image” phrase for this post type. Added in 4.3', 'event' ),
        // 'set_featured_image'    => _x( 'Set cover image', 'Overrides the “Set featured image” phrase for this post type. Added in 4.3', 'event' ),
        // 'remove_featured_image' => _x( 'Remove cover image', 'Overrides the “Remove featured image” phrase for this post type. Added in 4.3', 'event' ),
        // 'use_featured_image'    => _x( 'Use as cover image', 'Overrides the “Use as featured image” phrase for this post type. Added in 4.3', 'event' ),
        'archives'              => _x( 'Event archives', 'The post type archive label used in nav menus. Default “Post Archives”. Added in 4.4', 'event' ),
        'insert_into_item'      => _x( 'Insert into Event', 'Overrides the “Insert into post”/”Insert into page” phrase (used when inserting media into a post). Added in 4.4', 'event' ),
        'uploaded_to_this_item' => _x( 'Uploaded to this Event', 'Overrides the “Uploaded to this post”/”Uploaded to this page” phrase (used when viewing media attached to a post). Added in 4.4', 'event' ),
        'filter_items_list'     => _x( 'Filter Events list', 'Screen reader text for the filter links heading on the post type listing screen. Default “Filter posts list”/”Filter pages list”. Added in 4.4', 'event' ),
        'items_list_navigation' => _x( 'Events list navigation', 'Screen reader text for the pagination heading on the post type listing screen. Default “Posts list navigation”/”Pages list navigation”. Added in 4.4', 'event' ),
        'items_list'            => _x( 'Events list', 'Screen reader text for the items list heading on the post type listing screen. Default “Posts list”/”Pages list”. Added in 4.4', 'event' ),
    );
 
    $args = array(
        'labels'             => $labels,
        'description'        => 'A custom post type for event',
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array( 'slug' => 'event' ),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 20,
        'supports'           => [ 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'custom-fields', ],
        'taxonomies'         => [ 'category', 'post_tag' ],
        'show_in_rest'       =>  true
    );
 
    register_post_type( 'event', $args );
}
 
add_action( 'init', 'event_init' );
