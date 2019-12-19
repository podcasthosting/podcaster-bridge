// TEMPORARY LOCALIZING STAND IN BEFORE I WRITE THE CODE TO INTEGRATE WITH WORDPRESS LOCALIZATION

const strings: { [key: string]: string; } = {
  // All Pages
  'next-button': 'Next',
  'settings-header': 'Podcaster.de Settings',

  // Welcome Page
  'welcome-header': 'Welcome',
  'welcome-paragraph': 'Welcome to the Podcaster.de Wordpress integration plugin! Click the button below to get started configuring the plugin.',
  'get-started': 'Get Started',

  // Credentials Page
  'credentials-header': 'OAuth Client Credentials',
  'client-id-and-password-text-pre-link': 'Get the client id and the password from the form at',
  'client-id-and-password-text-link': 'this page on podcaster',

  'client-id-label': 'Client ID',
  'client-id-placeholder': 'Enter here the client id as shown in the service',
  'client-id-desc': 'You have to create a client id through the podcaster API.',

  'client-password-label': 'Client Password',
  'client-password-placeholder': 'Enter your OAuth password',
  'client-password-desc': 'This password is generated when creating a client id.',

  'save-button': 'Save',
  'saving-button': 'Saving...',
  'delete-button': 'Delete',
  'deleting-button': 'Deleting...',

  // Establish Connection Page
  'establish-connection-header': 'Establish Connection',
  'establish-connection-paragraph': 'After you have entered and saved your data you can create a connection between this site and the podcaster service. Click the link "Establish connection" which is shown after entering your data.',
  'establish-connection-link-text': 'Establish connection',

  // Services List Page
  'services-header': 'Available Services',
  'services-paragraph': 'With the connection established can use the following services within your WordPress installation.'
}

export default function __(stringName: string) {
  return strings[stringName];
}