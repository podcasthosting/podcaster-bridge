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

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Podcaster_Bridge
 * @subpackage Podcaster_Bridge/admin
 * @author     Fabio <bridge@podcaster.de>
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

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/podcaster-bridge-admin.css', [], $this->version, 'all' );

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

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/podcaster-bridge-admin.js', ['jquery'], $this->version, false );

	}

	public function add_menu() {

        add_submenu_page(
            'options-general.php',
            __('service_page_title', 'podcaster-bridge'),
            __('service_menu_title', 'podcaster-bridge'),
            'manage_options',
            plugin_dir_path(__FILE__) . 'partials/podcaster-bridge-admin-display.php'
        );
    }

	public function add_setting() {

	    register_setting(
            'podcaster_bridge',
	        'podcaster-bridge_options'
        );

        // register a new section in the "wporg" page
        add_settings_section(
            'podcaster-bridge_section_oauth',
            __('service_section_oauth_header', 'podcaster-bridge'),
            [$this, 'cb_section_oauth'],
            'podcaster_bridge'
        );

        // register a new field
        add_settings_field(
            'podcaster-bridge_field_oauth_clientid', // as of WP 4.6 this value is used only internally
            // use $args' label_for to populate the id inside the callback
            __('service_field_oauth_clientid', 'podcaster-bridge'),
            [$this, 'cb_field_oauth_clientid'],
            'podcaster_bridge',
            'podcaster-bridge_section_oauth',
            [
                'label_for' => 'oauth_clientid',
                'class' => 'podcaster-bridge_row',
                'podcaster-bridge_custom_data' => 'custom',
            ]
        );

        // register a new field
        add_settings_field(
            'podcaster-bridge_field_oauth_password', // as of WP 4.6 this value is used only internally
            // use $args' label_for to populate the id inside the callback
            __('service_field_oauth_password', 'podcaster-bridge'),
            [$this, 'cb_field_oauth_password'],
            'podcaster_bridge',
            'podcaster-bridge_section_oauth',
            [
                'label_for' => 'oauth_password',
                'class' => 'podcaster-bridge_row',
                'podcaster-bridge_custom_data' => 'custom',
            ]
        );

        // register a new section in the "wporg" page
        add_settings_section(
            'podcaster-bridge_section_connection',
            __('service_section_connection_header', 'podcaster-bridge'),
            [$this, 'cb_section_connection'],
            'podcaster_bridge'
        );

        // register a new field
        add_settings_field(
            'podcaster-bridge_connection_test', // as of WP 4.6 this value is used only internally
            // use $args' label_for to populate the id inside the callback
            //__('service_connection_test', 'podcaster-bridge'),
            '',
            [$this, 'cb_connection_test'],
            'podcaster_bridge',
            'podcaster-bridge_section_connection'
        );

        // register a new section in the "wporg" page
        add_settings_section(
            'podcaster-bridge_section_services',
            __('service_section_services_header', 'podcaster-bridge'),
            [$this, 'cb_section_services'],
            'podcaster_bridge'
        );
    }

    public function cb_section_oauth($args) {

        ?>
        <form action="options.php" method="post">

        <p id="<?php echo esc_attr( $args['id'] ); ?>"><?php _e('service_section_oauth_description', 'podcaster-bridge'); ?></p>

        <?php
    }

    public function cb_field_oauth_clientid($args) {

        // get the value of the setting we've registered with register_setting()
        $options = get_option('podcaster-bridge_options');
        // output the field
        ?>
        <input type="text" value="<?php echo $options[ $args['label_for'] ]; ?>" name="podcaster-bridge_options[<?php echo esc_attr( $args['label_for'] ); ?>]" placeholder="<?php _e('service_field_oauth_clientid_placeholder', 'podcaster-bridge'); ?>" class="regular-text" required autofocus>
        <p class="description">
            <?php esc_html_e( 'service_field_oauth_clientid_description', 'podcaster-bridge'); ?>
        </p>
        <?php
    }

    public function cb_field_oauth_password($args) {

        // get the value of the setting we've registered with register_setting()
        $options = get_option('podcaster-bridge_options');
        // output the field
        ?>
        <input type="password" value="<?php echo $options[ $args['label_for'] ]; ?>" name="podcaster-bridge_options[<?php echo esc_attr( $args['label_for'] ); ?>]" placeholder="<?php _e('service_field_oauth_password_placeholder', 'podcaster-bridge'); ?>" class="regular-text" required>
        <p class="description">
            <?php esc_html_e( 'service_field_oauth_password_description', 'podcaster-bridge'); ?>
        </p>
            <div>
                <div class="left">
        <?php

            // output save settings button
            submit_button(__('button_save_settings', 'podcaster-bridge'));
        ?>
                </div>
                <div class="right">
                    <a href="<?php echo admin_url('admin-post.php');?>?action=cb_data_delete" id="podcaster_oauth_data_delete"><?php _e('button_delete_settings', 'podcaster-bridge'); ?></a>
                </div>
            </div>
        </form>
        <?php
    }

    public function cb_section_connection($args) {

        ?>
        <p>
            <?php _e('service_hint_connection', 'podcaster-bridge'); ?>
        </p>
        <?php
    }

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

    public function cb_section_services($args) {

        ?>
        <p>
            <?php _e('service_hint_services', 'podcaster-bridge'); ?>
        </p>
        <?php
    }

    public function cb_connection_delete() {
	    return delete_option('podcaster-bridge_options_oauth_token');
    }

    public function cb_data_delete() {
	    return $this->cb_connection_delete() && delete_option('podcaster-bridge_options');
    }

    public function podcaster_oauth() {

        $options = get_option('podcaster-bridge_options');
        // TODO: Remove apiUrl in live version
        $podcaster = new \Podcaster\PodcasterAuthClient($options['oauth_clientid'], $options['oauth_password'], get_site_url() . '/wp-admin/admin-post.php?action=podcaster_oauth', 'http://api.podcaster.sattoaster');
        $podcaster->authorize();
        add_option('podcaster-bridge_options_oauth_token', $podcaster->getAccessToken()->getToken());

        echo "<script>window.onunload = refreshParent; function refreshParent() { window.opener.location.reload(); } window.self.close();</script>";
        wp_die("Du kannst das Fenster jetzt schließen!");
    }
}