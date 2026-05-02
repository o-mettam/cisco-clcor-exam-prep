# CCNP CLCOR 350-801 v2.0 Exam Simulator

A browser-based practice exam simulator for the Cisco 350-801 CLCOR (Implementing Cisco Collaboration Core Technologies) v2.0 certification exam.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/K3K51Y7ZT4)

## Features

- **125 questions** covering all six exam domains with detailed explanations
- **Dark mode** with system preference detection and persistence
- **Two modes**: Practice (instant feedback) and Exam (timed, 120 minutes, no going back — just like the real exam)
- **110-question exam cap** matching real exam question counts (10/25/50/75/110 selectable)
- **Progress persistence** — exam state auto-saves to localStorage; resume on reload
- **Performance history** — tracks scores over time
- **Category filtering** — focus on specific domains or mix them all for a comprehensive exam
- **Flagging** — mark questions for review at the end of the exam
- **Retry incorrect** — you can re-attempt missing questions at the end of the exam
- **Randomized** question and answer order each attempt

## Exam Domains Covered

| Domain | Questions | Focus |
|---|---|---|
| **QoS** | 25 | MQC, DSCP, policing/shaping, LLQ, WRED, H-QoS, voice/video QoS |
| **CUBE** | 19 | Dial-peers, DPG, server-groups, SIP profiles, translation rules, SRTP, troubleshooting |
| **Protocols** | 12 | SIP methods/responses, SDP, codecs (G.711/G.729), RTP, Via headers |
| **Infrastructure** | 8 | CUCM clusters, Expressway, MRA, SRST, SME, deployment models |
| **Call Control** | 8 | Route patterns/groups/lists, Device Pools, CSS/partitions, wildcards |
| **IOS XE Gateway** | 8 | Voice register, FXS/FXO, ISDN PRI, media resources, MRGL |
| **Collaboration Apps** | 6 | Unity Connection, IM&P, Webex Calling, Local Gateway |

## Getting Started

1. Open `index.html` in any modern browser — no server required
2. Select focus areas and question count
3. Choose Practice or Exam mode
4. Click **Start Exam**

Alternatively, serve locally:

```bash
python3 -m http.server 8090
# Open http://localhost:8090
```

## Files

- `index.html` — Full simulator UI with embedded JavaScript
- `questions.js` — Question bank (125 questions with explanations, including multi-select)
- `350-801-CLCOR-v2.0-new.pdf` — Official Cisco exam blueprint (reference)

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `→` or `N` | Next question |
| `←` or `P` | Previous question |
| `1`-`4` | Select option A-D |
| `F` | Flag/unflag question |
| `C` | Check answer (practice mode) |
