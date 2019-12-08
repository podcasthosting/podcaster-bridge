import OAuthClientCredentials from './OAuthClientCredentials';

export default interface PodcasterBridgePluginAdminData {
    ajaxUrl: string;
    ajaxNonce: string;
    oauthClientCredentials: OAuthClientCredentials;
}