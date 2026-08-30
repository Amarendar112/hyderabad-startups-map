# Hyderabad Startup Map - Logo Loading Diagnosis Report
## Date: 2026-08-30

## Executive Summary
Startup logos/images are not loading on the map despite the underlying API being functional.

---

## Root Cause Analysis

### PRIMARY ISSUE: Logo.dev API HEAD vs GET Request Handling
**Severity:** 🔴 **CRITICAL**

#### Finding:
- **HEAD requests** to logo.dev return `404 Not Found`
- **GET requests** to the same URLs return `200 OK` with valid PNG image data
- This indicates the API doesn't support HTTP HEAD requests

#### Evidence:
```
URL: https://img.logo.dev/highperformr.ai?token=pk_Nk1GfpWcRUi2-1EQZzhuwA&size=256&format=png
HEAD: 404 Not Found
GET:  200 OK (returns 23KB PNG image)
```

#### Why This Matters:
- Browsers and image loading libraries often use HEAD requests for performance checks
- Leaflet's image rendering in divIcon elements may trigger preflight requests
- Modern HTTP/2 optimization might be using HEAD before GET
- Cache validation can trigger HEAD requests

---

## Secondary Issues Found

### ISSUE 2: Google Favicon Fallback URL Returns 301 Redirect
**Severity:** 🟡 **MEDIUM**

```
URL: https://www.google.com/s2/favicons?domain=google.com&sz=256
Status: 301 Moved Permanently
```
- The fallback to Google S2 Favicons may fail or be slow due to redirects
- Not all browsers handle redirects consistently for image tags

### ISSUE 3: Leaflet divIcon Inline Error Handling
**Severity:** 🟡 **MEDIUM**

Current implementation in LeafletMap.tsx:
```html
<img 
  src="${logoUrl}"
  onerror="if(window.__logoError)window.__logoError(this);"
/>
```

**Problems:**
- Relies on a global `window.__logoError` function set up in useEffect
- The function is registered AFTER component mounts, causing race conditions
- Inline onerror handlers have limited error context
- Global state management is fragile and error-prone

---

## Data Quality Issues

### ISSUE 4: Duplicate Startup Names (Not IDs)
**Severity:** 🔴 **HIGH** - Affects Map Clustering

- **Total entries:** 481
- **Unique IDs:** 481 ✓ (Good - no ID duplicates)
- **Unique names:** 471 ⚠️ (10 startups have duplicate names)

**Duplicate names found:**
- These can cause confusion in clustering and marker selection
- Names should ideally be unique for user clarity

---

## Technical Stack Analysis

### Logo Loading Mechanism Priority:
1. ✅ **Logo.dev API** (Primary) - **WORKS** but has HEAD request issue
2. 🟡 **Google S2 Favicons** (Fallback 1) - Returns 301 redirects
3. ✅ **UI-Avatars Initials Badge** (Fallback 3) - **WORKS** reliably

### Current Implementation Flow:
```
StartupCard / LeafletMap
  ↓
getCompanyLogoUrl() in logo.ts
  ↓
Returns img.logo.dev URL
  ↓
Browser loads with <img>
  ↓
HEAD request: 404 ← **PROBLEM HERE**
  ↓
GET request: 200 (but might not retry)
  ↓
Image fails to display
  ↓
onerror handler triggered
  ↓
window.__logoError() fallback
```

---

## Files Requiring Fixes

### 1. **src/utils/logo.ts** 🔴 PRIORITY 1
- **Issue:** Primary logo loading uses logo.dev which doesn't support HEAD requests
- **Fix Required:** 
  - Swap Google Favicon with a HEAD-request-compatible service
  - OR implement client-side retry logic for logo.dev with GET-only requests
  - OR serve logos from own CDN

### 2. **src/components/map/LeafletMap.tsx** 🟡 PRIORITY 2
- **Issue:** Inline onerror handlers with global state are fragile
- **Fix Required:**
  - Move image element creation to after component fully mounts
  - Use proper React event handlers instead of inline HTML
  - Add logging to diagnose failures

### 3. **src/components/cards/StartupCard.tsx** 🟡 PRIORITY 3
- **Issue:** Same global __logoError dependency
- **Fix Required:**
  - Implement proper error handling with state management
  - Add loading states and retry logic

### 4. **src/data/startups.ts** 🟡 PRIORITY 4
- **Issue:** Duplicate startup names (10 cases)
- **Fix Required:**
  - Review and rename duplicate entries or mark with differentiator
  - Ensure all logoUrl values are using valid img.logo.dev URLs

---

## Recommended Solutions

### SHORT TERM (Immediate Fix):
1. **Switch primary source to UI-Avatars** (proven to work)
2. Use logo.dev as second fallback (handle GET-only requests)
3. Skip Google Favicon due to redirect issues

### MEDIUM TERM (Robust Fix):
1. Implement proper React-based image loading component
2. Add proper error states and logging
3. Cache logo URLs in localStorage
4. Implement retry logic with exponential backoff

### LONG TERM (Optimal Fix):
1. Self-host logo images on CDN
2. Pre-generate fallback SVG avatars for all startups
3. Implement image optimization pipeline
4. Add monitoring/alerts for broken images

---

## Testing Recommendations

- [ ] Test with different browser cache states
- [ ] Test on mobile devices (different image loading behaviors)
- [ ] Monitor browser console for 404 errors
- [ ] Check Network tab for blocked/failed requests
- [ ] Test with slow network conditions (3G throttling)
- [ ] Verify fallback chain works end-to-end
- [ ] Load test with all 481 startups visible on map

---

## API Status Summary

| Service | Status | Notes |
|---------|--------|-------|
| logo.dev GET | ✅ 200 OK | Works, returns 23KB+ PNG |
| logo.dev HEAD | ❌ 404 | Not supported |
| Google S2 Favicon | 🟡 301 | Redirects, may fail in strict CSP |
| UI-Avatars | ✅ 200 OK | Reliable fallback |

---

## Environment Configuration

✅ Token is properly configured:
- **File:** `.env.local`
- **Token:** `pk_Nk1GfpWcRUi2-1EQZzhuwA`
- **Format:** Valid (pk_XXXXX)
