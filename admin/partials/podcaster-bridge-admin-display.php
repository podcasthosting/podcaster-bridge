<?php

/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       https://www.podcaster.de
 * @since      1.0.0
 *
 * @package    Podcaster_Bridge
 * @subpackage Podcaster_Bridge/admin/partials
 */
?>

<?php
// check user capabilities
if (!current_user_can('manage_options')) {
    return;
}
?>
<div class="wrap">
    <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
    <?php
        echo '<img src="' . plugins_url( 'images/podcaster_logo.svg', dirname(__FILE__)) . '" alt="podcaster.de Logo" class="podcaster-logo" > ';

        // output setting sections and their fields
        // (sections are registered for "podcaster_bridge", each field is registered to a specific section)
        do_settings_sections('podcaster_bridge');

        // output security fields for the registered setting "podcaster-bridge_options"
        settings_fields('podcaster_bridge');
    ?>
</div>