<?php

function event_save_post_admin( $post_id, $post, $update ) {

    $event_data         =   get_post_meta( $post_id, 'event_data', true );
    $event_data         =   empty($event_data) ? [] : $event_data;
    // $event_data['category']  =   isset($event_data['rating']) ? absint($event_data['rating'])  : 0;
    // $event_data['tags']  =   isset($event_data['rating_count']) ? absint($event_data['rating_count'])  : 0;
    
    update_post_meta( $post_id, 'event_data',  $event_data ); 
}