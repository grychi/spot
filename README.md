# Spot
### Spontaneous Planning of Things
Have you ever just wanted to do something in the spur of the moment, but have no one to do it with?
This problem is one that virtually everyone has experienced, from grabbing lunch to going to  concerts. Spot aims to connect people that are all 'down' to do something, anything together. Spot aims to connect the world through allowing people to trying something new and leaving their comfort zones by interacting with the people around them.

### What it does
Spot is a website that allows users to post any spontaneous ideas they may have and for people 
in close proximity to join in. Users can set a meetup location, max amount of people that can 
join and an amount of time for the idea to be open for. After that time, the idea 'expires' 
and users can no longer join. By doing this, Spot aims to connect people to fellow locals. 
(Especially students living in dorms serving as a prime use case)

### How we built it
The website was built using MongoDB as a database to store and fetch users and events. 
ExpressJS on NodeJS was used for the backend of the website with HTML/CSS/Javascript serving as 
the frontend of the app. For our locaction-based functionality, we used Google Maps Platform on the Google Cloud allowing us to pinpoint specific location on our map. 

### Challenges we ran into
Some challenges we ran into were when we wanted to created a messenger application as part of Spot, but had a hard time integrating it with socket.io. Given a little more time, however, we do believe we could've implemented it. We also had problems with location services with Google Maps on the Google Cloud Platform API because we didn't run it through HTTPS.

### What we learned
We learned more about Google Maps through the Google Cloud Platform API. We also learned more about MongoDB and using it with NodeJS and Express. 

### How would you improve it in the future?
We would add chat functionality so users would be able to communicate easier. Also, place it on the HTTPS protocol so it is safer to use and gives users an ease of mind about security and their location services. Lastly, we want to be able to add a more rigorious search algorithm instead of a naive string search algorithm that we have enployed here. 
