# TODO

### Landing
- [x] Clock/Date landing page
- [x] Capture non-control keydown and send to primaryInput

### Interface
- [x] When primaryInput is empty, and backspace is pressed, go back to landing page
- [x] Press Enter on command to go to URL
- [x] Press Down to go through suggestions
- [x] Press ESC to go back to landing page

### Suggestions
- [x] Add DuckDuckGo Query API suggestions
- [x] Fix multiple re-render pending useEffect
- [ ] Transitions/Framer motion on incoming/outgoing suggestions

### Custom Search Bangs (Maybe?)
- [ ] Bang to custom search eg. "!yt hermitcraft season 9"
- [ ] Check DDG Bang API

### Extra Panels
- [ ] liquipedia upcoming matches
- [ ] dota recent matches (add steam userID to config for match query)

### Background
- [x] Implement Unsplash random pic API (landscape, crop 1920px)
- [x] Animate opacity transition on background load
- [x] Progressive image on load from small to w=1920