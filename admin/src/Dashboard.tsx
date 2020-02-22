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
import PodcasterBridgePluginAdminData from './types/PodcasterBridgePluginAdminData';
//@ts-ignore
import podcasterLogo from './podcaster_logo.svg';
import './Dashboard.css';
import { __ } from "./i18n";

import WelcomePage from './WelcomePage';
import OAuthCredsPage from './OAuthCredsPage';
import EstablishConnectionPage from './EstablishConnectionPage';
import ServicesListPage from './ServicesListPage';
import { oauthClientCredsEmpty } from './types/OAuthClientCredentials';

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
    page: ((): number => {
      // If the oauthClientCredentials are not empty
      if (!oauthClientCredsEmpty(adminData.oauthClientCredentials)) {

        // If there is an access token
        if (!!adminData.oauthAccessToken)
          return 3; // ServicesListPage

        return 2; // EstablishConnectionPage

      } else return 0; // WelcomePage
      
    })()
  };

  nextStep() {
    if (this.state.page < 3)
      this.setState({
        page: this.state.page + 1
      });
  }
  prevStep() {
    if (this.state.page > 0)
      this.setState({
        page: this.state.page - 1
      });
  }

  render() {
    let pageComp;
    switch (this.state.page) {
      case 0:
        pageComp = <WelcomePage nextStep={this.nextStep.bind(this)} />;
        break;
      case 1:
        pageComp = <OAuthCredsPage nextStep={this.nextStep.bind(this)} adminData={adminData} />;
        break;
      case 2:
        pageComp = <EstablishConnectionPage prevStep={this.prevStep.bind(this)} adminData={adminData} nextStep={this.nextStep.bind(this)} />;
        break;
      case 3:
        pageComp = <ServicesListPage prevStep={this.prevStep.bind(this)} adminData={adminData} />;
        break;
      default:
        this.setState({
          page: 0
        });
        pageComp = <WelcomePage nextStep={this.nextStep.bind(this)} />;
        break;
    }
    return (
      <div className="wrap">
        <h1>{__('settings-header', 'podcaster-bridge')}</h1>
        <img src={podcasterLogo} alt="podcaster.de Logo" className="podcaster-logo" />
        {pageComp}
      </div>
    )
  }
}