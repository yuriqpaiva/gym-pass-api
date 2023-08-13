# App

GymPass style app.

## Functional Requirements

- [x] Users must be able to register;
- [x] Users must be able to authenticate;
- [x] Users must be able to retrieve the profile of a logged-in user;
- [x] Users must be able to obtain the number of check-ins performed by the logged-in user;
- [x] Users must be able to access their check-in history;
- [x] Users must be able to search for nearby gyms (up to 10 km);
- [x] Users must be able to search for gyms by name;
- [x] Users must be able to check in at a gym;
- [x] Users must be able to validate their check-ins;
- [x] Users must be able to register a gym.

## Business Rules

- [x] Users cannot register with a duplicate email;
- [x] Users cannot perform 2 check-ins on the same day;
- [x] Users cannot check in if they are not close (within 100m) to the gym;
- [x] Check-ins can only be validated within 20 minutes of creation;
- [x] Check-ins can only be validated by administrators;
- [x] Gyms can only be registered by administrators.

## Non-Functional Requirements

- [x] User passwords must be encrypted;
- [x] Application data must be persisted in a PostgreSQL database;
- [x] All data lists must be paginated with 20 items per page;
- [x] Users must be identified with a JSON Web Token (JWT).
