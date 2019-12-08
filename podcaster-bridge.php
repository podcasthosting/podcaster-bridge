<?php
/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://www.podcaster.de
 * @since             1.0.0
 * @package           Podcaster_Bridge
 *
 * @wordpress-plugin
 * Plugin Name:       Podcaster Bridge
 * Plugin URI:        https://github.com/podcasthosting/podcaster-bridge
 * Description:       Connects a customer to its podcaster account to access data in a WordPress installation.
 * Version:           1.0.1
 * Author:            podcaster
 * Author URI:        https://www.podcaster.de
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       podcaster-bridge
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'PODCASTER_BRIDGE_VERSION', '2.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-podcaster-bridge-activator.php
 */
function activate_podcaster_bridge() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-podcaster-bridge-activator.php';
	Podcaster_Bridge_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-podcaster-bridge-deactivator.php
 */
function deactivate_podcaster_bridge() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-podcaster-bridge-deactivator.php';
	Podcaster_Bridge_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_podcaster_bridge' );
register_deactivation_hook( __FILE__, 'deactivate_podcaster_bridge' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-podcaster-bridge.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_podcaster_bridge() {

    require_once 'vendor/autoload.php';
	$plugin = new Podcaster_Bridge();
	$plugin->run();

}
run_podcaster_bridge();