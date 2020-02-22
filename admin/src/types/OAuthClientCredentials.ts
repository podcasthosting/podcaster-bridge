export default interface OAuthClientCredentials {
  clientID: string;
  clientPassword: string;
}

export function oauthClientCredsEmpty( { clientID, clientPassword }: OAuthClientCredentials ): boolean {
  return ! (!!clientID?.trim() && !!clientPassword?.trim());
}
