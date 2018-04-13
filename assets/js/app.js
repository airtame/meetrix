function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    $authorizeButton.hide();
    $signoutButton.show();
    getEvents();
  } else {
    $authorizeButton.show();
    $signoutButton.hide();
  }
}

function checkInterval() {
  setInterval(function() {
    alert('Hello');
  }, 3000);
}

function getName(string) {
  if (string.substr(0, 11) !== 'airtame.com') {
    return string.substr(0, string.search(/[@]+/));
  }
}
function appendEvents(events) {
  const $eventList = $('.event-list');
  let html = '';
  for (let i = 0; i < events.length; i += 1) {
    const event = events[i];
    let { summary, attendees, organizer, location, description } = event;
    const start = new Date(event.start.dateTime).getHours();
    const end = new Date(event.end.dateTime).getHours();
    const owner = getName(organizer.email);
    const participants = attendees.map(part => {
      let names = '';
      names += getName(part.email);
      return names;
    });
    let startEnd = `${start}-${end}`;
    let numberOfAttendees = 0;
    if (attendees) {
      attendees = attendees.length;
    }

    if (!description) {
      description = 'No agenda. Bad!';
    } else {
      description = '';
    }

    if (!summary) {
      summary = 'No name';
    }

    if (!start || !end) {
      startEnd = '';
    }
    html += `
    <li>
      ${i === 0 ? '<h1 class="next-up">Next Up</h1>' : ''}
      ${startEnd ? `<h3 class="event-start">${startEnd}</h3>` : ''}
      <h3 class="event-title">${summary}</h3>
      <div>
      <span class="event-owner"><i data-feather="gitlab"></i>${owner}.</span>
      <span><i data-feather="users"></i>${participants}</span>
      </div>
      ${
        description
          ? `<p class="event-description"><i data-feather="alert-triangle"></i>${description}</p>`
          : ''
      }
    </li>
    `;
  }

  $eventList.html(html);
}

function getEvents() {
  gapi.client.calendar.events
    .list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime',
    })
    .then(function(response) {
      appendEvents(response.result.items);
      feather.replace();
    });
}
