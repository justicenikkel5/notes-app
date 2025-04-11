# User Interface Design Document

## Layout Structure

- **Home Screen**: Vertical, full-screen scroll feed optimized for mobile-first with autoplay track previews.
- **Global Navigation Tabs** (bottom on mobile, side/top bar on desktop):  
  - Feed  
  - Explore  
  - Upload  
  - Library  
  - Leaderboards  
  - Profile  
- **Floating Action Button (FAB)**: Anchored bottom right for quick upload or track share.
- **Persistent Mini Player**:  
  - Mobile: collapsible floating player at bottom.  
  - Desktop: fixed at bottom, with controls and waveform preview.

## Core Components

- **Track Card**:
  - Artwork thumbnail (fullscreen width on mobile).
  - Track title + artist/curator name.
  - Playback preview (auto-play muted, sound on tap).
  - Upvote button with visible cost (-1 Note).
  - Stats: upvotes, reposts, listens.
  - Tags/genres and "shared by" user info.

- **Notes Counter**:
  - Displayed persistently in header.
  - Real-time update with animations (+1 or -1).
  
- **Leaderboard View**:
  - Tabs for Top Curators, Top Songs, Top Note Earners.
  - Each entry has avatar, stat count, and “Follow” button.

- **Profile Page**:
  - Avatar, username, earned/spent Notes.
  - Feed of shared/uploaded tracks.
  - Playlist section with unlockable content.
  - Badges for milestones (e.g., 100 upvotes on a track).

- **Unlock Modals**:
  - Triggered when accessing exclusive content.
  - CTA: "Spend 20 Notes to Unlock."
  - Show remaining Notes and confirmation prompt.

## Interaction Patterns

- **Vertical swipe to navigate** tracks in Feed.
- **Double-tap on track artwork** to instantly upvote (-1 Note).
- **Long press on track card** to repost/share.
- **Swipe left** to share externally.
- **Daily login pop-up** with streak tracker and +1 Note notification.
- **XP-like progress bar** toward taste milestones (e.g., Curator Rank).

## Visual Design Elements & Color Scheme

- **Background**: Charcoal gray to near-black for contrast.
- **Accent Colors**:
  - Neon blue for Notes and actions.
  - Vibrant gradients for highlight states (e.g., trending tracks).
  - Bronze, Silver, Gold badges for upvote tiers.
- **Track Card Styling**:
  - Drop shadows and glowing borders on high-performing tracks.
  - Playback buttons and upvote icons with subtle hover/focus states.

## Mobile, Web App, Desktop Considerations

- **Mobile**: Priority platform. One-handed vertical interaction. Floating player and FAB anchored for thumb reach.
- **Web App/Desktop**:
  - Wider layout with sidebar nav.
  - Optional mini-feed mode with multiple tracks per row.
  - Hover interactions for playback and quick actions.

## Typography

- **Primary Font**: Modern sans-serif (e.g., Inter, SF Pro, or similar).
- **Track Titles**: Bold, large type for visibility.
- **Metadata & Stats**: Medium weight, smaller font size.
- **Notes & Actions**: Highlighted with color and icon integration.

## Accessibility

- **Contrast compliance**: WCAG AA standards for all text/button backgrounds.
- **Screen Reader Support**: All audio actions labeled with ARIA tags.
- **Tap targets**: Min. 44px for all interactive elements.
- **Motion preferences**: Option to disable auto-play and animations in settings.
- **Alt Text**: Required for all user-uploaded artwork.
