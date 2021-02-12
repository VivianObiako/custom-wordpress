<?php
/*
* Plugin Name: Hooks example 
 */
function ju_title($title) {
    return 'Hooked '. $title;
}
function ju_footer_shoutout() {
    echo 'Hooks lives here!!';
}

add_filter( 'the_title', 'ju_title' );
add_action ( 'wp_footer', 'ju_footer_shoutout' );