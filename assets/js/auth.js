const CLIENT_ID = '474497407253-8onsjbepcvl7ba8r7hmccaff5r702epq.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCpijHKCIB4ec93oLN36iLAIhRS71082mQ';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

const $authorizeButton = $('#authorize-button');
const $signoutButton = $('#signout-button');

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })
    .then(function() {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

      $authorizeButton.click(handleAuthClick);
      $signoutButton.click(handleSignoutClick);
    });
}

function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
  console.log('clicked');
}
