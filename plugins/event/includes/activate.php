<?php

function event_post_activate_plugin() {

    if( version_compare( get_bloginfo( 'version' ), '5.0', '<' ) ){
        wp_die( __( "You must update WordPress to use this plugin.", 'event' ) );
    }
}