<?php
/**
 * Plugin Name: Recent Posts Block
 * Plugin URI: https://github.com/BRdhanani/gutenberg-recent-posts
 * Description: Gutenberg Recent Posts Block.
 * Author: Brijesh Dhanani
 * Author URI: http://wholeblogs.com
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'init.php';
