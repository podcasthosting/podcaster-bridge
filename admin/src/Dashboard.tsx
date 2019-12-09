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
import PodcasterBridgePluginAdminData from './types/PodcasterBridgePluginAdminData';
//@ts-ignore
import podcasterLogo from './podcaster_logo.svg';
import './Dashboard.css';

// Get the data passed from wordpress to React
const adminData: PodcasterBridgePluginAdminData = window.podcasterBridgePluginAdmin;

/**
 * The root React component for the Settings menu
 *
 * The wizard for logging into the user's
 * podcaster.de account using OAuth 2.
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
        
    }

    render() {
        return (
            <div className="wrap">
                <h1>Podcaster.de Settings</h1> {/* TODO: Localize */}
                <img src={podcasterLogo} alt="podcaster.de Logo" className="podcaster-logo" />
                <OAuthCredsPage nextStep={this.nextStep} adminData={adminData} />
                <h2>2. Connection</h2> {/* TODO: Localize */}
                <p>
                    After you have entered and saved your data you can create a connection between this site and the podcaster service. Click the link "Establish connection" which is shown after entering your data.
                </p> {/* TODO: Localize */}
                <table className="form-table" role="presentation">
                    <tbody>
                        <tr>
                            <th scope="row" />
                            <td>
                                <span className="dashicons-before dashicons-warning" />
                                <a href="http://podcaster.dev.aidanlovelace.com/wp-admin/admin-post.php?action=podcaster_oauth">Establish connection</a> {/* TODO: Localize */}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h2>3. Services</h2> {/* TODO: Localize */}
                <p>
                    With the connection established can use the following services within your WordPress installation.
                </p> {/* TODO: Localize */}
            </div>
        )
    }
}