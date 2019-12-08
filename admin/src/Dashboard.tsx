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
import OAuthCredsPage from './OAuthCredsPage';
//@ts-ignore
import podcasterLogo from './podcaster_logo.svg';
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
type Props = {}
interface State {
  page: number;
};
export default class Dashboard extends React.Component<Props, State> {
  state: State = {
    page: 0
  };

  nextStep() {
    console.log("NEXT STEP!!!! WOOT!");
    
  }

  render() {
    return (
      <div className="wrap">
        <h1>Podcaster.de Settings</h1>
        <img src={podcasterLogo} alt="podcaster.de Logo" className="podcaster-logo" />
        <OAuthCredsPage nextStep={this.nextStep} />
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
}