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
import { __ } from "./i18n";
import PodcasterBridgePluginAdminData from './types/PodcasterBridgePluginAdminData';

/**
 * The page where the user can establish the
 * plugin's connection to Podcaster.de.
 *
 * Page 3 of the wizard for logging into the
 * user's podcaster.de account using OAuth 2.
 *
 * @package    Podcaster_Bridge
 * @subpackage Podcaster_Bridge/admin
 * @author     Aidan Lovelace <aidan@aidanlovelace.com>
 */
type Props = {
  prevStep: Function;
  adminData: PodcasterBridgePluginAdminData;
  nextStep: Function;
}

interface State { }

export default class EstablishConnectionPage extends React.Component<Props, State> {
  state: State = {};

  render() {
    return (
      <div>
        <h2>{__('establish-connection-header', 'podcaster-bridge')}</h2>
        <p>
          {__('establish-connection-paragraph', 'podcaster-bridge')}
        </p>
        <table className="form-table" role="presentation">
          <tbody>
            <tr>
              <th scope="row" />
              <td>
                <span className="dashicons-before dashicons-warning" />
                <a href="/wp-admin/admin-post.php?action=podcaster_oauth" target="_blank" rel="noopener noreferrer">{__('establish-connection-link-text', 'podcaster-bridge')}</a>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="button button-primary"
          onClick={_ => this.props.prevStep()}>{__('back-button', 'podcaster-bridge')}</button>
        {" "}
        <button
          className="button button-primary"
          onClick={_ => this.props.nextStep()}>{__('next-button', 'podcaster-bridge')}</button>
      </div>
    );
  }
}
