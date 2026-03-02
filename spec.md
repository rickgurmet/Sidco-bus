# Bus Timing & Feedback App

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Home/landing page with two main navigation options: "Bus Schedule" and "Ride Feedback"
- Bus Schedule section with two views:
  1. Search view: user selects "From" and "To" stops from dropdowns, clicks search, and sees matching route(s) with departure time, arrival time, duration, and fare
  2. Full schedule view: table/list showing all routes with all details (from, to, departure, arrival, duration, fare)
- Ride Feedback section with a form containing:
  - Name (text input)
  - Phone number (text input)
  - Rate your ride (star rating or 1–5 selector)
  - Comments (textarea)
  - Submit button
- Backend stores: bus routes (from, to, departure time, arrival time, duration, fare) and feedback entries (name, phone, rating, comments, timestamp)
- Seed data for bus routes with realistic stops, times, and fares

### Modify
- None

### Remove
- None

## Implementation Plan
1. Generate Motoko backend with:
   - BusRoute type: { id, from, to, departureTime, arrivalTime, duration, fare }
   - Feedback type: { id, name, phone, rating, comment, timestamp }
   - Queries: getAllRoutes, searchRoutes(from, to)
   - Mutations: submitFeedback(name, phone, rating, comment)
   - Seed data for several routes
2. Build React frontend with:
   - Landing page with two large navigation cards
   - Bus Schedule page with tab switcher (Search / All Schedules)
   - Search tab: from/to dropdowns populated from routes, search button, results display
   - All Schedules tab: full table of all routes
   - Feedback page: form with name, phone, star rating, comments, submit with success state
