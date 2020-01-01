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
import { __ } from "./i18n";

/**
 * The OAuth 2 Credentials page component
 * for the Settings menu
 *
 * Page 2 of the wizard for logging into the
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
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      body: objectToFormURLEncoded(postData)
    }).then(res => {
      this.setState({
        saving: false
      });
      this.props.adminData.oauthClientCredentials = this.state.clientCredentials;
    }).catch(_ => {
      this.setState({
        saving: false,
        clientCredentials: this.props.adminData.oauthClientCredentials
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
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
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

  // Checks if we can move to the next step by making
  // sure the client credentials are not empty or null.
  private canMoveOn(): boolean {
    return !!this.state.clientCredentials.clientID
      && !!this.state.clientCredentials.clientID.trim()
      && !!this.state.clientCredentials.clientPassword
      && !!this.state.clientCredentials.clientPassword.trim();
  }

  render() {
    return (
      <div>
        <h2>{__('credentials-header', 'podcaster-bridge')}</h2>
        <form action="options.php" method="post">
          <p id="podcaster-bridge_section_oauth">
            {__('client-id-and-password-text-pre-link', 'podcaster-bridge')} <a href="https://www.podcaster.de/apps" title="Key management at podcaster" className="externalLink">{__('client-id-and-password-text-link', 'podcaster-bridge')}</a>.
          </p>
          <table className="form-table" role="presentation">
            <tbody>
              <tr className="podcaster-bridge_row">
                <th scope="row">
                  <label htmlFor="oauth_clientid">{__('client-id-label', 'podcaster-bridge')}</label>
                </th>
                <td>
                  <input
                    type="text"
                    value={this.state.clientCredentials.clientID || ""}
                    name="podcaster-bridge_options[oauth_clientid]"
                    placeholder={__('client-id-placeholder', 'podcaster-bridge')}
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
                    {__('client-id-desc', 'podcaster-bridge')}
                  </p>
                </td>
              </tr>
              <tr className="podcaster-bridge_row">
                <th scope="row">
                  <label htmlFor="oauth_password">{__('client-password-label', 'podcaster-bridge')}</label>
                </th>
                <td>
                  <input
                    type="password"
                    value={this.state.clientCredentials.clientPassword || ""}
                    name="podcaster-bridge_options[oauth_password]"
                    placeholder={__('client-password-placeholder', 'podcaster-bridge')}
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
                    {__('client-password-desc', 'podcaster-bridge')}
                  </p>
                  <div>
                    <div className="left">
                      <p className="submit">
                        <button
                          type="submit"
                          name="submit"
                          id="submit"
                          className="button button-primary"
                          onClick={event => {
                            event.preventDefault();
                            this.saveCreds();
                          }}
                          disabled={this.state.saving || this.state.deleting}>{!this.state.saving ? __('save-button', 'podcaster-bridge') : __('saving-button', 'podcaster-bridge')}</button>
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
                        disabled={this.state.saving || this.state.deleting}>{!this.state.deleting ? __('delete-button', 'podcaster-bridge') : __('deleting-button', 'podcaster-bridge')}</button>
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
        <button
          className="button button-primary"
          onClick={_ => this.props.nextStep()}
          disabled={!this.canMoveOn()}>{__('next-button', 'podcaster-bridge')}</button>
      </div>
    );
  }
}
