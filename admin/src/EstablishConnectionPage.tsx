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

import * as React from 'react'
import PodcasterBridgePluginAdminData from './types/PodcasterBridgePluginAdminData';
import OAuthClientCredentials from './types/OAuthClientCredentials';
import { objectToFormURLEncoded } from './utils';
import __ from './TemporaryLocalize';

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
  nextStep: Function;
}
interface State { };
export default class EstablishConnectionPage extends React.Component<Props, State> {
  state: State = {};

  render() {
    return (
      <div>
        <h2>{__('establish-connection-header')}</h2>
        <p>
          {__('establish-connection-paragraph')}
        </p>
        <table className="form-table" role="presentation">
          <tbody>
            <tr>
              <th scope="row" />
              <td>
                <span className="dashicons-before dashicons-warning" />
                <a href="http://podcaster.dev.aidanlovelace.com/wp-admin/admin-post.php?action=podcaster_oauth">{__('establish-connection-link-text')}</a>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="button button-primary"
          onClick={_ => this.props.prevStep()}>{__('back-button')}</button>
        {" "}
        <button
          className="button button-primary"
          onClick={_ => this.props.nextStep()}>{__('next-button')}</button>
      </div>
    );
  }
}
