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
  clientID: string;
  clientPassword: string;
  nextStep: Function;
}
interface State {
  clientID: string;
  clientPassword: string;
};
export default class OAuthCredsPage extends React.Component<Props, State> {
  state: State = {
    clientID: this.props.clientID,
    clientPassword: this.props.clientPassword
  };
  render() {
    return (
      <div>
        <h2>1. Authentication</h2>
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
                    defaultValue={this.state.clientID}
                    name="podcaster-bridge_options[oauth_clientid]"
                    placeholder="Enter here the client id as shown in the service"
                    className="regular-text"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      this.setState({
                        clientID: event.target.value
                      });
                    }}
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
                    defaultValue={this.state.clientPassword}
                    name="podcaster-bridge_options[oauth_password]"
                    placeholder="Enter your OAuth password"
                    className="regular-text"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      this.setState({
                        clientPassword: event.target.value
                      });
                    }}
                    required />
                  <p className="description">
                    This password is generated when creating a client id.
                  </p>
                  <div>
                    <div className="left">
                      <p className="submit">
                        <input type="submit" name="submit" id="submit" className="button button-primary" defaultValue="Save" onClick={_ => this.props.nextStep()} />
                      </p>
                    </div>
                    <div className="right">
                      <a href="http://podcaster.dev.aidanlovelace.com/wp-admin/admin-post.php?action=cb_data_delete" id="podcaster_oauth_data_delete">Delete</a>
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
    )
  }
}
