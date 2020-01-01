/**
 * The OAuth 2 Credentials page component
 * for the Settings menu
 *
 * @link       https://www.podcaster.de
 * @since      2.0.0
 *
 * @package    Podcaster_Bridge
 * @subpackage Podcaster_Bridge/admin
 * @author     Aidan Lovelace <aidan@aidanlovelace.com>
 */

import * as React from 'react';
import PodcasterBridgePluginAdminData from './types/PodcasterBridgePluginAdminData';
import { i18n } from "./i18n";

/**
 * The page that shows the available services
 * to the Wordpress plugin from the user's
 * account.
 *
 * Page 4 of the wizard for logging into the
 * user's podcaster.de account using OAuth 2.
 *
 * @package    Podcaster_Bridge
 * @subpackage Podcaster_Bridge/admin
 * @author     Aidan Lovelace <aidan@aidanlovelace.com>
 */
type Props = {
  adminData: PodcasterBridgePluginAdminData
  prevStep: Function;
}
interface State {
  scopes: Array<any>
};
export default class ServicesListPage extends React.Component<Props, State> {
  state: State = {
    scopes: []
  }
  render() {
    return (
      <div>
        <h2>{i18n.__('services-header', 'podcaster-bridge')}</h2>
        <p>
          {i18n.__('services-paragraph', 'podcaster-bridge')}
        </p>
        <ul>
          <li><span className="dashicons dashicons-admin-users"></span> User information</li>
          <li><span className="dashicons dashicons-category"></span> Stored files</li>
          <li><span className="dashicons dashicons-rss"></span> Feeds</li>
          <li><span className="dashicons dashicons-microphone"></span> Shows</li>
        </ul>
        <button
          className="button button-primary"
          onClick={_ => this.props.prevStep()}>{i18n.__('back-button', 'podcaster-bridge')}</button>
      </div>
    );
  }
}
