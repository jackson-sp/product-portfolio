# LetsMeet - Product Requirements Document

**Version:** 1.0  
**Last Updated:** November 22, 2024  
**Owner:** Jackson Price

---

## 1. Product Overview

### Vision
LetsMeet is a modern, mobile-friendly meeting coordination tool that preserves the simplicity of When2Meet while dramatically improving usability, interaction design, and visual clarity.

### Problem Statement
When2Meet is the de facto scheduling tool for group meetings, but it suffers from:
- Poor mobile experience (unusable UX on mobile)
- Clunky interaction design (hard to select/modify availability)
- Dated visual design that doesn't meet modern standards
- Confusing grid alignment and time labels

### Solution
LetsMeet helps groups quickly find mutually available times with:
- Intuitive drag-and-resize scheduling blocks
- Clean, modern interface inspired by Google Calendar
- Real-time group availability heatmaps
- Mobile-first responsive design

### Success Metrics
- **Usability**: Users can create and share an event in <2 minutes
- **Adoption**: 80% of test users prefer LetsMeet over When2Meet
- **Mobile**: Full feature parity on mobile devices
- **Portfolio Impact**: Demonstrates end-to-end product thinking and execution

---

## 2. User Stories

### Event Organizer
- As an organizer, I want to create a scheduling poll in under 2 minutes
- As an organizer, I want to share a simple link that anyone can access
- As an organizer, I want to see group availability at a glance to pick the best time

### Participant
- As a participant, I want to drag blocks to show my availability quickly
- As a participant, I want to resize blocks easily if I make a mistake
- As a participant, I want to see who else is available at each time slot
- As a participant, I want to update my availability later using my PIN

---

## 3. Core Features

### 3.1 Event Creation

#### A. Event Types
**Single Meeting**
- Full calendar view for selecting specific dates
- Always displays traditional week structure: Sun → Sat
- Unlimited forward month navigation (`<` and `>` arrows)
- Multi-date selection (users can pick multiple non-consecutive dates)

**Recurring Meeting**
- Select one or more days of the week (e.g., Mon/Wed/Fri)
- Useful for ongoing meetings or classes

#### B. Time Constraints
- **Earliest Time** dropdown (30-minute increments)
- **Latest Time** dropdown (30-minute increments)
- **Time Zone** dropdown (auto-detect user's local timezone)
- Default: 9:00 AM - 5:00 PM in user's local timezone

#### C. Event Metadata
- Event title (required)
- Optional description
- Shareable link generated automatically

### 3.2 Sign-In Flow

**Fields:**
- Name (text input, required)
- 3-digit PIN (numeric input, required)

**Behavior:**
- Name + PIN uniquely identifies a user per event
- Users can return to modify their availability by entering the same Name + PIN
- PIN is enforced and tied to stored data (not cosmetic)
- If Name + PIN match existing entry → Load and allow editing
- If new Name + PIN → Create new availability entry

**Security Note:**
- PINs are event-scoped (PIN "123" for Event A is different from PIN "123" for Event B)
- No password requirements - prioritize ease of use over security for this MVP

### 3.3 Availability Selection

#### Side-by-Side Layout
Display both grids simultaneously:
- **Left:** Your Availability (editable)
- **Right:** Group Availability (read-only heatmap)
- Both grids scroll together with synchronized scrolling
- Aligned row heights and time labels

#### Interaction Model
**Creating Blocks:**
- Click and drag to create an availability block
- Blocks snap to 30-minute increments

**Resizing Blocks:**
- Each block has top and bottom resize handles (subtle, visible on hover)
- Click and drag handle to expand or shrink block
- Resizing snaps to 30-minute grid
- Real-time visual feedback during drag
- No minimum block size (allow 30-min blocks)

**Editing Blocks:**
- **Clicking a block does nothing** (no delete on click)
- To delete: Add small "X" button in top-right corner of block (appears on hover)
- Multiple blocks can exist in same column

**Visual Feedback:**
- Active block: highlighted border
- Hover state: subtle highlight
- Drag state: slight opacity change
- Resize handles: visible on hover, hidden otherwise

#### Grid Alignment & Styling
**Time Labels:**
- Align exactly with horizontal gridlines
- Full-hour markers (9:00 AM, 10:00 AM): slightly darker text
- Half-hour markers (9:30 AM, 10:30 AM): lighter text
- No thick bold fonts

**Grid Lines:**
- Full-hour lines: slightly darker
- Half-hour lines: lighter, subtle
- Vertical day dividers: medium weight
- No heavy borders or distracting colors

**Overall Style:**
- Clean, Google-Calendar-like aesthetic
- Ample white space
- Subtle shadows for depth
- Modern sans-serif font (Inter, SF Pro, or similar)

### 3.4 Group Availability Heatmap

**Visual Design:**
- White/light green → 0-25% available
- Light green → 26-50% available
- Medium green → 51-75% available
- Dark green → 76-100% available

**Tooltip on Hover:**
Shows:
- Date & time range
- **Available:** [List of names]
- **Unavailable:** [List of names who submitted but aren't available]
- **Not Responded:** [Count of people who haven't submitted yet]

**Tooltip Behavior:**
- Semi-transparent background (doesn't block grid)
- Follows cursor with slight offset
- Disappears immediately on mouse leave

### 3.5 Sharing

**Copy Link Button:**
- Prominent button: "Copy Event Link"
- Single click copies full URL to clipboard
- Confirmation toast: "Link copied!" (auto-dismisses after 2s)
- Link format: `letsmeet.app/e/[event-id]`

**Additional Sharing (Future):**
- QR code generation
- Direct email invites
- Calendar export

---

## 4. UI/UX Design Principles

### Visual Design
- Clean, modern, Google-Calendar-inspired
- Lightweight visual elements (no clutter)
- Consistent spacing and alignment
- Subtle use of color (greens for availability, grays for structure)
- No unnecessary bolding or heavy fonts

### Interaction Design
- Intuitive drag-and-resize (feels natural)
- Immediate visual feedback for all actions
- Forgiving (easy to undo/modify)
- Mobile-optimized touch targets (44x44pt minimum)

### Responsive Design
- Fully functional on desktop, tablet, and mobile
- Mobile: Stack grids vertically if needed
- Touch-optimized resize handles on mobile
- Gesture support for dragging/resizing

### Performance
- Smooth 60fps animations
- Instant grid updates (no lag during resize)
- Optimistic UI updates (don't wait for server)

---

## 5. Technical Requirements

### Frontend Stack
- **Framework:** React 18+
- **Styling:** Tailwind CSS
- **Layout:** CSS Grid for precise alignment
- **State Management:** React Context or Zustand (keep it simple)
- **Routing:** React Router
- **Mobile:** Touch event handlers, gesture recognition

### Backend Stack
- **Database:** Firebase Firestore or Supabase (serverless)
- **Authentication:** None (PIN-based, event-scoped)
- **Real-time:** Live updates when other users submit availability

### Data Models

**Events Collection:**
```javascript
{
  id: string,
  title: string,
  description: string,
  type: "single" | "recurring",
  dates: Date[] | string[], // e.g., ["2024-11-25", "2024-11-26"]
  earliest_time: string, // "09:00"
  latest_time: string, // "17:00"
  timezone: string, // "America/New_York"
  created_at: timestamp,
  share_url: string
}
```

**Availability Collection:**
```javascript
{
  id: string,
  event_id: string,
  user_name: string,
  user_pin: string, // hashed
  blocks: [
    {
      date: string, // "2024-11-25"
      start_time: string, // "10:00"
      end_time: string // "12:00"
    }
  ],
  updated_at: timestamp
}
```

### Resizing Implementation Notes
**Separate resize mode from click mode:**
- `onMouseDown` on handle → initiate resize
- `onMouseMove` → real-time preview with snapping
- `onMouseUp` → save final size to state and backend

**Resize always updates start OR end time:**
- Top handle → modifies `start_time`
- Bottom handle → modifies `end_time`

**Snapping logic:**
- Round to nearest 30-minute increment
- Visual guide line shows snap position

---

## 6. Acceptance Criteria

### Event Creation
- ✅ Calendar displays Sun–Sat week structure consistently
- ✅ Month navigation (`<` `>`) works without bugs
- ✅ Users can select any future date(s)
- ✅ Time constraints (earliest/latest) apply correctly to grid
- ✅ Timezone is auto-detected and can be changed

### Availability Selection
- ✅ Click-and-drag creates availability blocks
- ✅ Blocks have visible resize handles (on hover)
- ✅ Resizing supports both expand AND shrink
- ✅ Blocks snap to 30-minute grid during resize
- ✅ Clicking a block does NOT delete it
- ✅ Delete button ("X") appears on hover and works
- ✅ Multiple blocks can exist in same day column
- ✅ Real-time visual feedback during drag/resize

### Grid Alignment & Visual Design
- ✅ Time labels align perfectly with gridlines
- ✅ Full-hour and half-hour lines are visually distinct but subtle
- ✅ Your Availability and Group Availability grids stay perfectly aligned
- ✅ Grids scroll together smoothly

### Group Availability
- ✅ Heatmap accurately reflects group availability
- ✅ Tooltip shows correct names in Available/Unavailable lists
- ✅ Tooltip is semi-transparent and follows cursor
- ✅ Heatmap updates in real-time when users submit

### Sharing
- ✅ "Copy Link" button copies URL to clipboard
- ✅ Toast confirmation appears and auto-dismisses
- ✅ Shared link works (loads event correctly)

### PIN Authentication
- ✅ Users can create availability with Name + PIN
- ✅ Users can edit their availability by re-entering Name + PIN
- ✅ Wrong PIN prevents editing others' availability
- ✅ PINs are event-scoped (same PIN works across different events independently)

### Mobile Experience
- ✅ All features work on mobile (iOS Safari, Android Chrome)
- ✅ Touch targets are large enough (44x44pt minimum)
- ✅ Drag and resize work with touch gestures
- ✅ Layout adapts gracefully to small screens

---

## 7. Out of Scope (V1)

These features are intentionally excluded from MVP to ship faster:

- ❌ User accounts / persistent login
- ❌ Email notifications
- ❌ Calendar integrations (Google Calendar, iCal)
- ❌ "Best time" AI recommendations
- ❌ Multiple availability modes (tentative, preferred, etc.)
- ❌ Event editing after creation
- ❌ Analytics/usage tracking
- ❌ Custom branding

---

## 8. Future Enhancements (V2+)

**High Priority:**
- Calendar sync (Google, Outlook, Apple)
- AI "Best Meeting Time" banner
- Email reminders for participants who haven't responded

**Medium Priority:**
- Mobile app (React Native)
- "Quick poll" mobile-optimized version
- Multiple availability modes (tentative, preferred, maybe)
- Event settings: Allow organizer to close event, set deadline

**Low Priority:**
- Recurring meeting series with date ranges
- Integration with Zoom/Teams/Meet for auto-scheduling
- Custom themes/branding

---

## 9. Development Phases

### Phase 1: Core MVP (Target: 2 weeks)
- Event creation (single meeting type only)
- Availability selection (drag, resize, delete)
- Group heatmap
- PIN-based editing
- Share link

### Phase 2: Polish & Mobile (Target: 1 week)
- Mobile optimization
- Recurring meetings
- Visual refinements
- Performance optimization

### Phase 3: Launch Prep (Target: 3 days)
- Bug fixes
- Cross-browser testing
- Deploy to production
- Update portfolio site

---

## 10. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Resize interaction feels clunky | High | Prototype early, test with users, iterate |
| Mobile drag/resize doesn't work well | High | Use proven touch libraries, test on real devices |
| Heatmap performance degrades with many users | Medium | Optimize rendering, use virtualization if needed |
| PIN system too simple/insecure | Low | Acceptable for MVP, add email verification in V2 |
| Grid alignment breaks on different screen sizes | Medium | Extensive responsive testing, CSS Grid fallbacks |

---

## 11. Open Questions

- [ ] Should we limit the number of dates selectable in single meeting mode? (e.g., max 7 days)
- [ ] Should blocks auto-merge if adjacent? (e.g., 10-10:30 + 10:30-11 → 10-11)
- [ ] How do we handle timezone changes for existing availability?
- [ ] Should we show total response count on event page?

---

## Appendix: Refined Prompt for Lovable

```
Build LetsMeet, a modern meeting scheduling app inspired by When2Meet but with significantly better UX and mobile support.

CORE FUNCTIONALITY:
1. Event Creation Page
   - Event title (required)
   - Event type: Single Meeting or Recurring Meeting
   - For Single: Full calendar view (Sun-Sat), unlimited forward navigation, multi-date selection
   - For Recurring: Day-of-week checkboxes (Mon-Sun)
   - Earliest Time & Latest Time dropdowns (30-min increments, default 9 AM - 5 PM)
   - Timezone dropdown (auto-detect)
   - Generate shareable link on creation

2. Availability Selection Page (side-by-side grids)
   LEFT GRID: Your Availability (editable)
   - Click and drag to create availability blocks
   - Each block has top and bottom resize handles (visible on hover)
   - Drag handle to resize (snaps to 30-min grid)
   - Small "X" button in top-right corner to delete (visible on hover)
   - Multiple blocks per column allowed
   - Real-time visual feedback during drag/resize

   RIGHT GRID: Group Availability (heatmap)
   - Color intensity shows how many people are available
   - White/light green (0-25%) → dark green (76-100%)
   - Hover tooltip shows: Date/time, Available (names), Unavailable (names)
   - Tooltip is semi-transparent, follows cursor

   BOTH GRIDS:
   - Perfect alignment of time labels and gridlines
   - Synchronized scrolling
   - Full-hour lines slightly darker, half-hour lines lighter
   - Clean, Google-Calendar-like aesthetic

3. Sign-In Flow
   - Name (text) + 3-digit PIN (numeric)
   - Name + PIN = unique identifier per event
   - Re-entering same Name + PIN loads existing availability for editing
   - Wrong PIN prevents editing

4. Sharing
   - "Copy Event Link" button
   - Click copies URL to clipboard
   - Toast confirmation: "Link copied!" (auto-dismiss after 2s)

DESIGN REQUIREMENTS:
- Modern, clean UI (inspired by Google Calendar)
- Subtle styling: no heavy borders, no unnecessary bold text
- Mobile-first responsive design
- Touch-optimized resize handles (44x44pt minimum)
- Smooth 60fps animations

TECH STACK:
- React + Tailwind CSS
- Firebase Firestore or Supabase for backend
- CSS Grid for layout
- Touch event handlers for mobile

DATA MODELS:
Events: { id, title, type, dates, earliest_time, latest_time, timezone, created_at, share_url }
Availability: { id, event_id, user_name, user_pin (hashed), blocks: [{ date, start_time, end_time }], updated_at }

CRITICAL BEHAVIOR:
- Blocks resize by dragging handles (not by clicking)
- Clicking a block does nothing (no delete on click)
- Delete via hover "X" button only
- Grids must stay perfectly aligned at all times
- Real-time updates when other users submit availability
```

---

**End of PRD**
