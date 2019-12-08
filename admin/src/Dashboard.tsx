/**
 * The root React component for the Settings menu
 *
 * @link       https://www.podcaster.de
 * @since      2.0.0
 *
 * @package    Podcaster_Bridge
 * @subpackage Podcaster_Bridge/admin
 * @author     Aidan Lovelace <aidan@aidanlovelace.com>
 */

import * as React from 'react'
//@ts-ignore
import podcasterLogo from "./podcaster_logo.svg";
import './Dashboard.css';

/**
 * The root React component for the Settings menu
 *
 * The wizard for logging into the user's
 * podcaster.de account using OAuth 2.
 *
 * @package    Podcaster_Bridge
 * @subpackage Podcaster_Bridge/admin
 * @author     Aidan Lovelace <aidan@aidanlovelace.com>
 */
export const Dashboard: React.FunctionComponent<{}> = props => {
  return (
    <div className="wrap">
      <h1>Podcaster.de Settings</h1>
      <img src={podcasterLogo} alt="podcaster.de Logo" className="podcaster-logo" />
      <h2>1. Authentication</h2>
      <form action="options.php" method="post">
        <p id="podcaster-bridge_section_oauth">
          Da get a client id  and a password for the form  <a href="https://www.podcaster.de/apps" title="Key management at podcaster" className="externalLink">open this page on podcaster</a>.
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
                  defaultValue=''
                  name="podcaster-bridge_options[oauth_clientid]"
                  placeholder="Enter here the client id as shown in the service"
                  className="regular-text"
                  // onChange={this.updateInput}
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
                <input type="password" defaultValue='' name="podcaster-bridge_options[oauth_password]" placeholder="Enter your OAuth password" className="regular-text" required />
                <p className="description">
                  This password is generated when creating a client id.      </p>
                <div>
                  <div className="left">
                    <p className="submit">
                      <input type="submit" name="submit" id="submit" className="button button-primary" defaultValue="Save" />
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
      <h2>2. Connection</h2>
      <p>
        After you have entered and saved your data you can create a connection between this site and the podcaster service. Click the link "Establish connection" which is shown after entering your data.      </p>
      <table className="form-table" role="presentation"><tbody><tr><th scope="row" /><td>        {/*<button type="button"  id="podcaster_oauth_connection_test"><span class="dashicons-before dashicons-warning"></span> </button>*/}
        <span className="dashicons-before dashicons-warning" />
        <a href="http://podcaster.dev.aidanlovelace.com/wp-admin/admin-post.php?action=podcaster_oauth">Establish connection</a>
      </td>
      </tr>
      </tbody>
      </table>
      <h2>3. Services</h2>
      <p>
        With the connection established can use the following services within your WordPress installation.
      </p>
    </div>
  )
}

export default Dashboard;