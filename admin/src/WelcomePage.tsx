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

import * as React from 'react';
import { __ } from "./i18n";

/**
 * The introduction page for the OAuth login
 * wizard.
 *
 * Page 1 of the wizard for logging into the
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
export default class WelcomePage extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <h2>{__('welcome-header', 'podcaster-bridge')}</h2>
        <p>
          {__('welcome-paragraph', 'podcaster-bridge')}
        </p>
        <button
          className="button button-primary"
          onClick={_ => this.props.nextStep()}>{__('get-started', 'podcaster-bridge')}</button>
      </div>
    );
  }
}
