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

/**
 * The OAuth 2 Credentials page component
 * for the Settings menu
 *
 * Page 1 of the wizard for logging into the
 * user's podcaster.de account using OAuth 2.
 *
 * @package    Podcaster_Bridge
 * @subpackage Podcaster_Bridge/admin
 * @author     Aidan Lovelace <aidan@aidanlovelace.com>
 */
type Props = {
  adminData: PodcasterBridgePluginAdminData
  nextStep: Function;
}
interface State {
  clientCredentials: OAuthClientCredentials;
  saving: boolean;
  deleting: boolean;
};
export default class OAuthCredsPage extends React.Component<Props, State> {
  state: State = {
    clientCredentials: this.props.adminData.oauthClientCredentials,
    saving: false,
    deleting: false
  };

  saveCreds() {
    this.setState({
      saving: true
    });
    const postData: any = {
      'action': 'podcaster_save_credentials',
      '_nonce': this.props.adminData.ajaxNonce,
      'clientid': this.state.clientCredentials.clientID,
      'clientpassword': this.state.clientCredentials.clientPassword
    };

    fetch(this.props.adminData.ajaxUrl, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
      body: objectToFormURLEncoded(postData)
    }).then(res => {
      this.setState({
        saving: false
      });
    });
  }

  deleteCreds() {
    this.setState({
      deleting: true
    });
    const postData: any = {
      'action': 'podcaster_oauth_data_delete',
      '_nonce': this.props.adminData.ajaxNonce
    };

    fetch(this.props.adminData.ajaxUrl, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
      body: objectToFormURLEncoded(postData)
    }).then(res => {
      this.setState({
        deleting: false,
        clientCredentials: {
          clientID: '',
          clientPassword: ''
        }
      });
    });
  }

  render() {
    return (
      <div>
        <h2>1. OAuth Client Credentials</h2>
        <form action="options.php" method="post">
          <p id="podcaster-bridge_section_oauth">
            Get the client id and the password from the form at <a href="https://www.podcaster.de/apps" title="Key management at podcaster" className="externalLink">this page on podcaster</a>.
          </p>
          <table className="form-table" role="presentation">
            <tbody>
              <tr className="podcaster-bridge_row">
                <th scope="row">
                  <label htmlFor="oauth_clientid">Client ID</label>
                </th>
                <td>
                  <input
                    type="text"
                    value={this.state.clientCredentials.clientID}
                    name="podcaster-bridge_options[oauth_clientid]"
                    placeholder="Enter here the client id as shown in the service"
                    className="regular-text"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      this.setState({
                        clientCredentials: {
                          clientID: event.target.value,
                          clientPassword: this.state.clientCredentials.clientPassword
                        }
                      });
                    }}
                    disabled={this.state.saving || this.state.deleting}
                    required
                  />
                  <p className="description">
                    You have to create a client id through the podcaster API.
                  </p>
                </td>
              </tr>
              <tr className="podcaster-bridge_row">
                <th scope="row">
                  <label htmlFor="oauth_password">Password</label>
                </th>
                <td>
                  <input
                    type="password"
                    value={this.state.clientCredentials.clientPassword}
                    name="podcaster-bridge_options[oauth_password]"
                    placeholder="Enter your OAuth password"
                    className="regular-text"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      this.setState({
                        clientCredentials: {
                          clientID: this.state.clientCredentials.clientID,
                          clientPassword: event.target.value
                        }
                      });
                    }}
                    disabled={this.state.saving || this.state.deleting}
                    required />
                  <p className="description">
                    This password is generated when creating a client id.
                  </p>
                  <div>
                    <div className="left">
                      <p className="submit">
                        <button
                          type="submit"
                          name="submit"
                          id="submit"
                          className="button button-primary"
                          onClick={_ => this.saveCreds()}
                          disabled={this.state.saving || this.state.deleting}>{!this.state.saving ? 'Save' : 'Saving...'}</button>
                      </p>
                    </div>
                    <div className="right">
                      <button
                          type="submit"
                          name="delete"
                          id="delete"
                          className="button button-danger"
                          onClick={event => {
                            event.preventDefault();
                            this.deleteCreds()
                          }}
                          disabled={this.state.saving || this.state.deleting}>{!this.state.deleting ? 'Delete' : 'Deleting...'}</button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <input type="hidden" name="option_page" defaultValue="podcaster_bridge" />
          <input type="hidden" name="action" defaultValue="update" />
          <input type="hidden" id="_wpnonce" name="_wpnonce" defaultValue="d67cd36f85" />
          <input type="hidden" name="_wp_http_referer" defaultValue="/wp-admin/options-general.php?page=podcaster-bridge/admin/partials/podcaster-bridge-admin-display.php" />
        </form>
      </div>
    );
  }
}
