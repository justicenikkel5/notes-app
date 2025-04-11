# Software Requirements Specification

## System Design

- A web-first, mobile-optimized music sharing and discovery platform.
- Users earn and spend "Notes" (a social token) by upvoting and curating tracks.
- Content is user-generated: uploaded tracks or shared links.
- Human curation is central; popularity is driven by real user upvotes.
- Core features: feed, profiles, playlists, upvoting, Notes economy, and leaderboards.
- Users have customizable profiles with a profile picture, a bio section, and links to other social platforms.
- Each user can post and share as many tracks as they want — no upload limits.

## Architecture Pattern

- **Frontend**: Client-side rendered UI with server-side data fetching using React and Next.js.
- **Backend**: REST API built with Node.js and Express.
- **Monolithic** app structure initially — all logic in one repo for simplicity.
- Modular folder structure in `/app`, with shared components and hooks.

## State Management

- **Local UI State**: Managed via React hooks (`useState`, `useEffect`).
- **Global State**: `zustand` or `Jotai` for user session, Notes balance, and upvote state.
- **Session**: Managed using cookies or JWT tokens from the Express backend.
- **Persistent State**: Stored in a PostgreSQL database (accessed via Express API).

## Data Flow

1. User logs in → Auth handled via backend, JWT token returned.
2. Frontend loads user profile + Note balance via API.
3. Feed loads latest or trending tracks from database.
4. User upvotes track → Frontend updates immediately → Backend subtracts 1 Note from user, adds 1 to track.
5. Upvote triggers increase in visibility via query weight.

## Technical Stack

- **Frontend**: JavaScript/TypeScript with a modern framework (e.g., React) and TailwindCSS for styling.
- **Backend**: Node.js with Express for RESTful API development.
- **State**: Zustand or Jotai for global state management.
- **Audio playback**: HTML5 audio with waveform preview (e.g., `wavesurfer.js`).
- **Storage**: Supabase (or AWS S3) for track files, images, and profile pictures.
- **Hosting**: Vercel or Netlify for frontend, Render or Railway for backend (Node/Express).

## Authentication Process

- JWT-based authentication via Express backend.
- Session tokens stored in localStorage or HTTP-only cookies.
- Auth guards for pages like upload, profile, and playlist unlocks.
- Logged-in state enables upvoting, earning, and uploading.

## Route Design

- `/` – Public feed  
- `/explore` – Discovery by tags, genres  
- `/upload` – Upload new track  
- `/library` – User’s saved, reposted, unlocked content  
- `/leaderboards` – Top tracks, curators, earners  
- `/profile/[user]` – User’s public profile  
- `/playlist/[id]` – Unlockable/exclusive playlist  
- `/login` – Auth page  

## API Design

Using RESTful endpoints with Express:

- `POST /api/auth/login` – Authenticate user, return JWT.
- `POST /api/upload` – Upload audio file + metadata.
- `POST /api/upvote` – Deduct 1 Note, increment track upvote.
- `GET /api/feed` – Returns tracks ordered by score (upvotes/time).
- `GET /api/profile/:id` – Fetch user stats, uploaded/shared tracks, and profile info.
- `POST /api/profile/update` – Update user bio, social links, profile picture.
- `GET /api/leaderboards` – Fetch top users, songs, earners.
- `POST /api/unlock-playlist` – Deduct Notes, grant access.

## Database Design ERD

### Users Table

- `id` (UUID, PK)  
- `username` (string, unique)  
- `email` (string)  
- `password_hash` (string)  
- `notes_balance` (int)  
- `bio` (text)  
- `social_links` (JSON or string[])  
- `profile_picture_url` (string)  
- `created_at` (timestamp)  

### Tracks Table

- `id` (UUID, PK)  
- `title` (string)  
- `artist` (string)  
- `uploaded_by` (FK → users.id)  
- `url` (string - audio file or external link)  
- `artwork_url` (string)  
- `tags` (string[])  
- `upvotes` (int)  
- `created_at` (timestamp)  

### Upvotes Table

- `id` (UUID, PK)  
- `track_id` (FK → tracks.id)  
- `user_id` (FK → users.id)  
- `timestamp` (timestamp)  

### Playlists Table

- `id` (UUID, PK)  
- `title` (string)  
- `creator_id` (FK → users.id)  
- `track_ids` (string[]) – or use join table  
- `notes_required` (int)  
- `is_locked` (boolean)  
- `created_at` (timestamp)  

### Notes_Transactions Table

- `id` (UUID, PK)  
- `user_id` (FK → users.id)  
- `amount` (int, +earn/-spend)  
- `type` (enum: 'upvote', 'upload_reward', 'unlock_playlist')  
- `ref_id` (optional FK → tracks.id or playlists.id)  
- `timestamp` (timestamp)  
