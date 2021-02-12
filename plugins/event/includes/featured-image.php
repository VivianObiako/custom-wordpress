<?php
function add_post_theme_support_args($args, $post_type){
 
    if ($post_type == 'themes'){
        $args['support'] = 'thumbnail';
    }
 
    return $args;
}