# TAMID Link Shortener
Built by the members of [TAMID](https://tamidgroup.org) at Tel Aviv University
as part of our application for an official tech track. The project is live 
[here](https://tamid-tau-link-shortener.web.app).

## Built by
- Teo Maayan - Director of Tech
- Ralph Betesh - Director of Tech
- John Morozov - Track Member
- Amy Tian - Track Member
- Shoshanna Tesciuba - Track Member
- Mia Ackerman - Track Member
- Yuval Eilat - Track Member
- Brooke Chasalow - Track Member

## Structure
Our project, hosted entirely on Google Cloud Platform, consists of a simple 
frontend, using Bootstrap and jQuery, which interacts with our Python backend, 
running as a Flask server as part of a Google Cloud Run Function. The backend 
is connected to a Google Firestore database, and the frontend is hosted on Firebase.

Our website has tracks usage using Google Analytics.

## Development Process
### Challenges
Since we only had one week between returning to campus
from the Passover break and submission of our project,
we did not have sufficient time for enough education
sessions to have our members work on this project independently.
For this reason, we used the project as an occasion to 
give the members an overview of the wide variety of concepts 
involved in creating a web app. As such, the members worked
on the projects with us in pairs, in sessions with us 
(Directors of Tech) under direct guidance.

While this approach served us well in finishing this project,
it is not a particularly effective way to work on a project. For the
rest of the semester, we will have projects that can be done more
independently by the members, focusing heavily on education, with 
lessons and guided support for online courses. Our goal
for this semester is to have the members, some of which have no coding
experience at all, be ready to work on real projects in next semester's
tech track.

### Future Features
In the future, we would like to add a login feature, which wasn't yet added
due to time constraints. In a dashboard, a logged in user should be able to see
statistics about their created short urls, create custom ones, and delete them.

This could potentially be a part of a future learning project this semester.