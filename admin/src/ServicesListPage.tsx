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
import __ from './TemporaryLocalize';

/**
 * The page that shows the available services
 * to the Wordpress plugin from the user's
 * account.
 *
 * Page 4 of the wizard for logging into the
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
interface State { };
export default class ServicesListPage extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <h2>{__('services-header')}</h2>
        <p>
          {__('services-paragraph')}
        </p>
      </div>
    );
  }
}
