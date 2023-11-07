# Front-End Evaluation Task - Mohammad Abdel Aal

**FE-L2 - Angular**
**Deadline**: 04-Nov-2023 18:00

## Project Concept

This project is intended to test your current skills and abilities to learn new technologies and techniques. Project will be a signup and user profile app that allows users to signup and complete their profile.
App has the following screens:

1. Sign Up screen
2. User profile screen
3. Confirmation Screen

## Requirement

1. each screen will have its own `NgModule` and `service`.
2. each `NgModule` must be lazy loaded.
3. all HTTP requests must be handled through single service injected in all other services.
4. all HTTP requests to Back-End must be intercepted and new HTTP Header must be added for `Authorization Bearer abc123`.
5. Implement retry strategy for all HTTP requests (3 retries, 2000 milliseconds delay between retries) in case of request failure.

## Sign Up Screen Description and requirement

1. screen contains fields for
   - **username** (mandatory, min length 8 chars, small letters only)
   - **fullname** (mandatory, only charchaters)
   - **password** (mandatory, min length 8 chars, contains capital, small, number, special charcters)
2. sign up button to confirm the process

if all fields are valid, user must redirected to `User Profile Screen`, if not valid, user must be notified which field is not valid and the error description.

---

## User Profile Screen Description and Requirement

after successful signup, user is redirected to `User Profile Screen`, in this screen user is asked to complete his profile. User profile will be handled by form with these fields:

1. `firstName` -> input
2. `lastName` -> input
3. `age` -> input (numbers only, min allowed age 8 years)
4. `countryOfBirth` (auto complete based on API)
5. `address` -> text area

after successful validation, a new button must appear wiht label `Next` to redirect user to `Confirmation Screen`.

### Country of Birth Auto Complete

this must be Auto Complete input field, initially it show all available countries in the auto complete list. On value changes, you must send a request to API to filter countries based on input filed value. You can use these two APIs
- GET: https://anchormt-world-staging-at4dfab73a-lz.a.run.app/countries -> list all countries
- GET: https://anchormt-world-staging-at4dfab73a-lz.a.run.app/countries/:countryName -> search countries by name
it is importnat to initiate your API calls on `valueChanges`, and give a debounceTime of 800 milliseconds

---

## Confirmation Screen Description

this is the last screen that shows all information from `Screen 1` and `Screen 2` and acts as a review screen. In this screen you are requested to show your best in styling and appearance.

---

## Technical Considerations

- Use RxJS for your internal logic pipelining.
- Use `Angular Material` as a component source for basic components.
  https://material.angular.io/
- Use `Tailwind` as your styling system.
- Use `Reactive Forms` and `Form Builder` for all forms and input work.
- Screens must be responsive and follows all considerations to work on any screen size
