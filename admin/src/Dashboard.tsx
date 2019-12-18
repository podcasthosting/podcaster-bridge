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

import EstablishConnectionPage from './EstablishConnectionPage';
import ServicesListPage from './ServicesListPage';
import WelcomePage from './WelcomePage';
import __ from './TemporaryLocalize';

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
    if (this.state.page < 3)
      this.setState({
        page: this.state.page + 1
      });
  }

  render() {
    let pageComp;
    switch (this.state.page) {
      case 0:
        pageComp = <WelcomePage nextStep={this.nextStep.bind(this)} />
        break;
      case 1:
        pageComp = <OAuthCredsPage nextStep={this.nextStep.bind(this)} adminData={adminData} />;
        break;
      case 2:
        pageComp = <EstablishConnectionPage nextStep={this.nextStep.bind(this)} />;
        break;
      case 3:
        pageComp = <ServicesListPage nextStep={this.nextStep.bind(this)} adminData={adminData} />;
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
        <h1>{__('settings-header')}</h1>
        <img src={podcasterLogo} alt="podcaster.de Logo" className="podcaster-logo" />
        {pageComp}
      </div>
    )
  }
}