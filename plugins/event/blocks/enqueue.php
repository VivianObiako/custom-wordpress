<?php

function event_enqueue_block_editor_assets(){
    wp_register_script(
        'event_blocks_bundle',
        plugins_url( '/blocks/dist/bundle.js', EVENT_PLUGIN_URL ),
        [ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor', 'wp-api' ],
        filemtime( plugin_dir_path( EVENT_PLUGIN_URL ) . '/blocks/dist/bundle.js' )
    );

    wp_enqueue_script( 'event_blocks_bundle' );
}

function event_enqueue_block_assets(){
    $ver = JU_DEV_MODE ? time() : false;

    wp_register_style(
        'event_blocks',
        plugins_url( '/blocks/dist/blocks-main.css', EVENT_PLUGIN_URL )
    );

    wp_register_style( 'ju_google_fonts', 'https://fonts.googleapis.com/css?family=Lato:300,400,400i,700|Raleway:300,400,500,600,700|Crete+Round:400i', [], $ver );

    wp_enqueue_style( 'event_blocks' );
    wp_enqueue_style( 'ju_google_fonts' );
}