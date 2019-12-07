<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://www.podcaster.de
 * @since      1.0.0
 *
 * @package    Podcaster_Bridge
 * @subpackage Podcaster_Bridge/admin
 */

function endsWith( $str, $sub ) {
    return ( substr( $str, strlen( $str ) - strlen( $sub ) ) === $sub );
}

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Podcaster_Bridge
 * @subpackage Podcaster_Bridge/admin
 * @author     Fabio <bridge@podcaster.de>, Aidan Lovelace <aidan@aidanlovelace.com>
 */
class Podcaster_Bridge_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Podcaster_Bridge_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Podcaster_Bridge_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */
        
		// Find required stylesheets from react asset manifest
        $assetManifest = json_decode(file_get_contents(plugin_dir_path(__FILE__) . 'dist/asset-manifest.json'), true);        
        $cssAssets = array_filter($assetManifest["files"], function($key) {
            return endsWith($key, '.css');
        }, ARRAY_FILTER_USE_KEY);

        foreach ($cssAssets as $name => $path) {
            wp_enqueue_style(
                $this->plugin_name . '-' . $name,
                plugin_dir_url( __FILE__ ) . 'dist' . $path,
                [],
                $this->version,
                'all'
            );
        }
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Podcaster_Bridge_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Podcaster_Bridge_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

        // Find required scripts from react asset manifest
        $assetManifest = json_decode(file_get_contents(plugin_dir_path(__FILE__) . 'dist/asset-manifest.json'), true);        
        $jsAssets = array_filter($assetManifest["files"], function($key) {
            return endsWith($key, '.js');
        }, ARRAY_FILTER_USE_KEY);

        foreach ($jsAssets as $name => $path) {
            wp_enqueue_script(
                $this->plugin_name . '-' . $name,
                plugin_dir_url( __FILE__ ) . 'dist' . $path,
                [],
                $this->version,
                true
            );
        }
	}

	public function add_menu() {
        add_options_page(
			__( 'service_page_title', $this->plugin_slug ),
			__( 'service_menu_title', $this->plugin_slug ),
			'manage_options',
			$this->plugin_slug,
			array( $this, 'display_plugin_admin_page' )
		);
    }

    /**
	 * Register the settings with Wordpress.
	 *
	 * @since    1.0.0
	 */
	public function add_setting() {
	    register_setting(
            'podcaster_bridge',
	        'podcaster-bridge_options'
        );
    }
    public function display_plugin_admin_page() {
        // We include this script so we can tell the react app to use the correct url to import things like images
        ?>
        <script>
            window.podcasterBridgePluginDirectory = '<?php echo plugin_dir_url( __FILE__ ) . 'dist/'?>'
        </script>
        <div id="wp-reactivate-admin"></div>
        <?php
    }
    
    /**
	 * Delete the stored OAuth Token
	 *
	 * @since    1.0.0
	 */
    public function cb_connection_delete() {
	    return delete_option('podcaster-bridge_options_oauth_token');
    }

    /**
	 * Delete the all the stored data.
	 *
	 * @since    1.0.0
	 */
    public function cb_data_delete() {
	    return $this->cb_connection_delete() && delete_option('podcaster-bridge_options');
    }


    /**
	 * Test the connection to the Podcaster API
     * and output an icon.
	 *
	 * @since    1.0.0
	 */
    public function cb_connection_test() {
        $options = get_option('podcaster-bridge_options');
        $token = get_option('podcaster-bridge_options_oauth_token');
        if (empty($token)):
	    ?>
        <!--<button type="button" <?php /*echo ((empty($options['oauth_clientid']) || empty($options['oauth_password'])) ? 'disabled' : '');  */?> id="podcaster_oauth_connection_test"><span class="dashicons-before dashicons-warning"></span> <?php /*_e('service_oauth_button_connection_test', 'podcaster-bridge') */?></button>-->
        <span class="dashicons-before dashicons-warning"></span> <a href="<?php echo admin_url('admin-post.php');?>?action=podcaster_oauth" onclick="window.open(this.href, 'oauth', 'width=300,height=400,left=100,top=200'); return false;"><?php _e('service_oauth_button_connection_test', 'podcaster-bridge') ?></a>
        <?php
        elseif (!(empty($options['oauth_clientid']) || empty($options['oauth_password']))):
        ?>
            <span class="dashicons-before dashicons-yes"></span> <?php _e('service_oauth_connection_success', 'podcaster-bridge') ?> <a href="<?php echo admin_url('admin-post.php');?>?action=cb_connection_delete" id="podcaster_oauth_connection_delete" title="<?php _e('service_oauth_connection_delete', 'podcaster-bridge') ?>" class="podcaster-plain-link"><span class="dashicons dashicons-editor-unlink"></span> <?php _e('service_terminate_connection', 'podcaster-bridge'); ?></a>
        <?php
        endif;
    }

    public function podcaster_oauth() {

        $options = get_option('podcaster-bridge_options');
        // TODO: Remove apiUrl in live version
        $podcaster = new \Podcaster\PodcasterAuthClient($options['oauth_clientid'], $options['oauth_password'], get_site_url() . '/wp-admin/admin-post.php?action=podcaster_oauth');
        $podcaster->authorize();
        add_option('podcaster-bridge_options_oauth_token', $podcaster->getAccessToken()->getToken());

        echo "<script>window.onunload = refreshParent; function refreshParent() { window.opener.location.reload(); } window.self.close();</script>";
        wp_die("Du kannst das Fenster jetzt schließen!");
    }
}
