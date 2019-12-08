/**
 * Main entry point for the React admin pane.
 *
 * @link       https://www.podcaster.de
 * @since      2.0.0
 *
 * @package    Podcaster_Bridge
 * @subpackage Podcaster_Bridge/admin
 * @author     Aidan Lovelace <aidan@aidanlovelace.com>
 */

import './publicpath';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dashboard from './Dashboard';
import PodcasterBridgePluginAdminData from './types/PodcasterBridgePluginAdminData';

declare global {
    interface Window { podcasterBridgePluginAdmin: PodcasterBridgePluginAdminData; }
}

ReactDOM.render(<Dashboard />, document.getElementById('wp-reactivate-admin'));