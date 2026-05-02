const questions = [
  // ========== QoS - Classification & Marking ==========
  {
    id:1, category:"QoS", subcategory:"Classification & Marking", difficulty:"medium", type:"single",
    question:"Which IOS-XE command correctly creates a class-map to match voice RTP traffic marked with DSCP EF?",
    options:[
      {text:"class-map match-all VOICE-RTP\n  match dscp ef", correct:true},
      {text:"class-map match-all VOICE-RTP\n  match ip dscp 46", correct:false},
      {text:"class-map VOICE-RTP\n  match dscp ef 46", correct:false},
      {text:"class-map match-any VOICE-RTP\n  set dscp ef", correct:false}
    ],
    explanation:"The correct syntax uses <code>class-map match-all</code> with <code>match dscp ef</code>. The 'set' command is for policy-maps (marking), not class-maps (matching). DSCP EF = 46 but the match command uses the keyword 'ef'."
  },
  {
    id:2, category:"QoS", subcategory:"Classification & Marking", difficulty:"hard", type:"single",
    question:"You need to remark voice signaling traffic from DSCP CS3 to AF31 at the trust boundary. Which configuration accomplishes this?",
    options:[
      {text:"policy-map REMARK-SIG\n  class VOICE-SIGNALING\n    set dscp af31", correct:true},
      {text:"policy-map REMARK-SIG\n  class VOICE-SIGNALING\n    mark dscp af31", correct:false},
      {text:"policy-map REMARK-SIG\n  class VOICE-SIGNALING\n    set ip precedence af31", correct:false},
      {text:"class-map REMARK-SIG\n  set dscp af31", correct:false}
    ],
    explanation:"In MQC, <code>set dscp af31</code> within a policy-map class is correct. 'mark' is not a valid keyword. AF31 is DSCP, not IP precedence. Marking actions belong in policy-maps, not class-maps."
  },
  {
    id:3, category:"QoS", subcategory:"Classification & Marking", difficulty:"medium", type:"single",
    question:"What is the decimal DSCP value for AF41?",
    options:[
      {text:"34", correct:true},
      {text:"36", correct:false},
      {text:"32", correct:false},
      {text:"46", correct:false}
    ],
    explanation:"AF41 = Class(4) × 8 + Drop(1) × 2 = 34. AF42=36, CS4=32, EF=46."
  },
  {
    id:4, category:"QoS", subcategory:"Classification & Marking", difficulty:"easy", type:"single",
    question:"Which DSCP PHB is recommended by Cisco for voice media (RTP) traffic?",
    options:[
      {text:"EF (Expedited Forwarding)", correct:true},
      {text:"AF41 (Assured Forwarding 41)", correct:false},
      {text:"CS5 (Class Selector 5)", correct:false},
      {text:"AF31 (Assured Forwarding 31)", correct:false}
    ],
    explanation:"Cisco recommends EF (DSCP 46) for voice media/RTP. AF41 is for interactive video, CS3/AF31 for voice signaling."
  },
  {
    id:5, category:"QoS", subcategory:"Classification & Marking", difficulty:"medium", type:"single",
    question:"What is the difference between <code>class-map match-all</code> and <code>class-map match-any</code>?",
    options:[
      {text:"match-all requires ALL criteria to be met (AND); match-any requires at least ONE (OR)", correct:true},
      {text:"match-all applies to all interfaces; match-any applies to a specific interface", correct:false},
      {text:"match-all matches all packets; match-any is selective", correct:false},
      {text:"There is no functional difference", correct:false}
    ],
    explanation:"<code>match-all</code> = logical AND. <code>match-any</code> = logical OR. Default (no keyword) is match-all."
  },
  // ========== QoS - MQC Framework ==========
  {
    id:6, category:"QoS", subcategory:"MQC Framework", difficulty:"hard", type:"single",
    question:"Examine this QoS config. What is the effect?",
    cli_context:"class-map match-all VOICE\n  match dscp ef\nclass-map match-all VIDEO\n  match dscp af41\npolicy-map WAN-EDGE\n  class VOICE\n    priority percent 10\n  class VIDEO\n    bandwidth percent 20\n    random-detect dscp-based\n  class class-default\n    fair-queue\ninterface Gi0/0/0\n  service-policy output WAN-EDGE",
    options:[
      {text:"Voice gets LLQ strict priority at 10%; video gets CBWFQ at 20% with WRED; default traffic uses WFQ", correct:true},
      {text:"Voice and video both get priority queuing at 10% and 20%", correct:false},
      {text:"Voice is rate-limited to 10%; video is shaped to 20%", correct:false},
      {text:"The policy applies to both inbound and outbound traffic", correct:false}
    ],
    explanation:"<code>priority percent 10</code> = LLQ with policer. <code>bandwidth percent 20</code> = CBWFQ guarantee. <code>random-detect dscp-based</code> = WRED. <code>fair-queue</code> = WFQ for best-effort. Applied output only."
  },
  {
    id:7, category:"QoS", subcategory:"MQC Framework", difficulty:"medium", type:"single",
    question:"Which command applies a QoS policy to an interface for outbound traffic?",
    options:[
      {text:"service-policy output POLICY-NAME", correct:true},
      {text:"qos-policy output POLICY-NAME", correct:false},
      {text:"apply policy-map POLICY-NAME outbound", correct:false},
      {text:"service-policy POLICY-NAME direction out", correct:false}
    ],
    explanation:"The correct MQC command is <code>service-policy output POLICY-NAME</code> (or input for inbound)."
  },
  {
    id:8, category:"QoS", subcategory:"MQC Framework", difficulty:"hard", type:"single",
    question:"In a policy-map, what happens if you configure <code>priority</code> in more than one class?",
    options:[
      {text:"Multiple LLQ classes are allowed; each is individually policed to its configured rate", correct:true},
      {text:"Only the first priority class is applied; others are ignored", correct:false},
      {text:"The router rejects the configuration with an error", correct:false},
      {text:"All priority classes merge into one class automatically", correct:false}
    ],
    explanation:"IOS XE supports multiple LLQ priority classes. Each is individually policed. Total of all priority classes should not exceed ~33% of link bandwidth."
  },
  // ========== QoS - Policing & Shaping ==========
  {
    id:9, category:"QoS", subcategory:"Policing & Shaping", difficulty:"hard", type:"single",
    question:"What is the key difference between traffic policing and traffic shaping?",
    options:[
      {text:"Policing drops/remarks excess traffic immediately; shaping buffers excess and sends it later", correct:true},
      {text:"Policing is inbound only; shaping is outbound only", correct:false},
      {text:"Policing uses tokens; shaping uses leaky bucket only", correct:false},
      {text:"Policing is per-flow; shaping is per-interface", correct:false}
    ],
    explanation:"Policing drops or remarks excess traffic with no added delay. Shaping buffers excess traffic to smooth the flow, adding delay. Both use token bucket mechanisms."
  },
  {
    id:10, category:"QoS", subcategory:"Policing & Shaping", difficulty:"hard", type:"single",
    question:"Which config correctly shapes all traffic to 50 Mbps?",
    options:[
      {text:"policy-map SHAPER\n  class class-default\n    shape average 50000000", correct:true},
      {text:"policy-map SHAPER\n  class class-default\n    police 50000000", correct:false},
      {text:"policy-map SHAPER\n  class class-default\n    rate-limit 50m", correct:false},
      {text:"policy-map SHAPER\n  class class-default\n    shape average 50m", correct:false}
    ],
    explanation:"<code>shape average</code> specifies rate in bps. 50 Mbps = 50000000. 'police' is for policing not shaping. '50m' is not valid syntax."
  },
  // ========== QoS - Voice/Video ==========
  {
    id:11, category:"QoS", subcategory:"Voice/Video QoS", difficulty:"easy", type:"single",
    question:"What are the maximum acceptable one-way delay and jitter for voice traffic per Cisco best practices?",
    options:[
      {text:"150ms delay, 30ms jitter", correct:true},
      {text:"200ms delay, 50ms jitter", correct:false},
      {text:"100ms delay, 100ms jitter", correct:false},
      {text:"300ms delay, 30ms jitter", correct:false}
    ],
    explanation:"Cisco recommends max one-way latency of 150ms, jitter of 30ms, and packet loss ≤1% per ITU-T G.114."
  },
  {
    id:12, category:"QoS", subcategory:"Voice/Video QoS", difficulty:"medium", type:"single",
    question:"What is the bandwidth requirement for a single G.711 voice call (with headers, no cRTP)?",
    options:[
      {text:"~80-87 kbps", correct:true},
      {text:"64 kbps", correct:false},
      {text:"128 kbps", correct:false},
      {text:"32 kbps", correct:false}
    ],
    explanation:"G.711 codec = 64 kbps, but with IP(20B)+UDP(8B)+RTP(12B)=40B overhead per packet plus L2 headers, actual bandwidth is ~80-87 kbps."
  },
  {
    id:13, category:"QoS", subcategory:"Voice/Video QoS", difficulty:"medium", type:"single",
    question:"Which QoS mechanism is most important for preventing voice packet loss during congestion?",
    options:[
      {text:"Low Latency Queuing (LLQ) with strict priority", correct:true},
      {text:"Weighted Random Early Detection (WRED)", correct:false},
      {text:"Traffic shaping", correct:false},
      {text:"CBWFQ alone", correct:false}
    ],
    explanation:"LLQ provides strict priority queuing ensuring voice packets are serviced first. WRED is for TCP congestion avoidance. CBWFQ provides minimum bandwidth but not priority."
  },
  {
    id:14, category:"QoS", subcategory:"Trust Boundaries", difficulty:"medium", type:"single",
    question:"What is a QoS trust boundary and where should it be placed?",
    options:[
      {text:"The point where QoS markings are trusted or reclassified; ideally at the access switch closest to the endpoint", correct:true},
      {text:"The firewall where traffic enters the perimeter", correct:false},
      {text:"The WAN edge router", correct:false},
      {text:"The core switch", correct:false}
    ],
    explanation:"The trust boundary should be as close to the source as possible — typically the access switch port. Markings from untrusted sources are reset; from trusted devices (IP phones) they are accepted."
  },
  {
    id:15, category:"QoS", subcategory:"Trust Boundaries", difficulty:"hard", type:"single",
    question:"Which command enables AutoQoS trust on a switch port connected to a Cisco IP phone?",
    options:[
      {text:"auto qos voip cisco-phone", correct:true},
      {text:"auto qos trust cisco-phone", correct:false},
      {text:"mls qos trust cos", correct:false},
      {text:"auto qos voip trust", correct:false}
    ],
    explanation:"<code>auto qos voip cisco-phone</code> configures the port to trust QoS markings from a detected Cisco IP phone using CDP and auto-generates the required class/policy maps."
  },
  {
    id:16, category:"QoS", subcategory:"CAC", difficulty:"hard", type:"single",
    question:"What is the purpose of Call Admission Control (CAC) in Cisco Collaboration?",
    options:[
      {text:"To limit calls traversing a WAN link to prevent over-subscription and maintain voice quality", correct:true},
      {text:"To authenticate users before allowing calls", correct:false},
      {text:"To encrypt call signaling", correct:false},
      {text:"To block spam/robocalls", correct:false}
    ],
    explanation:"CAC prevents WAN over-subscription by limiting simultaneous calls. When bandwidth threshold is reached, new calls are rerouted (e.g., to PSTN) or rejected."
  },
  // ========== CUBE - Basic Configuration ==========
  {
    id:17, category:"CUBE", subcategory:"Basic Configuration", difficulty:"medium", type:"single",
    question:"Which IOS-XE command enables CUBE functionality on a router?",
    options:[
      {text:"voice service voip\n  allow-connections sip to sip", correct:true},
      {text:"cube enable", correct:false},
      {text:"voice service voip\n  cube mode", correct:false},
      {text:"service cube", correct:false}
    ],
    explanation:"CUBE is enabled via <code>voice service voip</code> then <code>allow-connections sip to sip</code>. There is no 'cube enable' command."
  },
  {
    id:18, category:"CUBE", subcategory:"Basic Configuration", difficulty:"hard", type:"single",
    question:"What does this CUBE configuration accomplish?",
    cli_context:"voice service voip\n sip\n  bind control source-interface Loopback0\n  bind media source-interface Loopback0\n  session transport tcp tls\n  no supplementary-service sip refer",
    options:[
      {text:"Sources signaling and media from Loopback0, enforces TLS for SIP, and disables SIP REFER for transfers", correct:true},
      {text:"Binds all traffic to Loopback0, enables TCP, and enables transfers", correct:false},
      {text:"Creates a SIP trunk on Loopback0 with UDP and REFER support", correct:false},
      {text:"Configures an MTP on Loopback0 with TLS", correct:false}
    ],
    explanation:"<code>bind control/media source-interface</code> sets source for signaling/RTP. <code>session transport tcp tls</code> enforces TLS. <code>no supplementary-service sip refer</code> disables REFER, keeping CUBE in the call path for transfers."
  },
  {
    id:19, category:"CUBE", subcategory:"Basic Configuration", difficulty:"medium", type:"single",
    question:"What is the primary purpose of CUBE?",
    options:[
      {text:"To act as a Session Border Controller (SBC) providing demarcation, security, and interoperability between VoIP networks", correct:true},
      {text:"To provide voicemail services", correct:false},
      {text:"To register IP phones and manage call routing", correct:false},
      {text:"To convert analog voice to digital for PSTN", correct:false}
    ],
    explanation:"CUBE is an SBC providing demarcation, protocol interworking, security (topology hiding, TLS/SRTP), codec negotiation, and CAC at the network border."
  },
  // ========== CUBE - Dial Peers ==========
  {
    id:20, category:"CUBE", subcategory:"Dial Peers", difficulty:"hard", type:"single",
    question:"What does this dial-peer configuration do?",
    cli_context:"dial-peer voice 100 voip\n description ** To CUCM **\n destination-pattern 1...\n session protocol sipv2\n session target ipv4:10.1.1.10\n voice-class codec 1\n dtmf-relay rtp-nte",
    options:[
      {text:"Routes 4-digit calls starting with 1 (1000-1999) to CUCM at 10.1.1.10 using SIP with RFC 2833 DTMF", correct:true},
      {text:"Routes all incoming calls from CUCM to extensions starting with 1", correct:false},
      {text:"Creates a POTS dial-peer for extensions 1000-1999", correct:false},
      {text:"Configures a SIP trunk with H.323 translation", correct:false}
    ],
    explanation:"<code>destination-pattern 1...</code> matches 4-digit numbers starting with 1. <code>session target ipv4:10.1.1.10</code> sends to CUCM. <code>dtmf-relay rtp-nte</code> = RFC 2833 DTMF in RTP."
  },
  {
    id:21, category:"CUBE", subcategory:"Dial Peers", difficulty:"medium", type:"single",
    question:"In IOS dial-peer config, what does <code>destination-pattern .T</code> match?",
    options:[
      {text:"Any digit string of any length, waiting for inter-digit timeout before routing", correct:true},
      {text:"Only the letter T followed by any single digit", correct:false},
      {text:"All calls destined for T1 interfaces", correct:false},
      {text:"Traffic-class tagged destinations only", correct:false}
    ],
    explanation:"The dot (.) matches any single digit. T = inter-digit timeout. Together, <code>.T</code> matches variable-length dial strings of one or more digits."
  },
  {
    id:22, category:"CUBE", subcategory:"Dial Peers", difficulty:"hard", type:"single",
    question:"How does IOS select the outbound dial-peer when multiple peers match?",
    options:[
      {text:"Longest match on destination-pattern → preference value (lower wins) → random among equal peers", correct:true},
      {text:"By lowest dial-peer tag number", correct:false},
      {text:"By order in running config", correct:false},
      {text:"Round-robin among all matching peers", correct:false}
    ],
    explanation:"Selection order: 1) Longest/most-specific match, 2) Preference value (lower=higher priority, default 0), 3) Random for load distribution. Tag number has no impact."
  },
  {
    id:23, category:"CUBE", subcategory:"Dial Peers", difficulty:"medium", type:"single",
    question:"What is the difference between a POTS and VoIP dial-peer?",
    options:[
      {text:"POTS connects to physical voice ports (FXS/FXO/PRI); VoIP routes calls over IP", correct:true},
      {text:"POTS uses SIP; VoIP uses H.323", correct:false},
      {text:"POTS is inbound only; VoIP is outbound only", correct:false},
      {text:"They are interchangeable", correct:false}
    ],
    explanation:"POTS dial-peers connect to physical telephony interfaces using the <code>port</code> command. VoIP dial-peers route calls over IP using <code>session target</code> and <code>session protocol</code>."
  },
  // ========== CUBE - Translation Rules ==========
  {
    id:24, category:"CUBE", subcategory:"Translation Rules", difficulty:"hard", type:"single",
    question:"What does this voice translation rule accomplish?",
    cli_context:"voice translation-rule 1\n rule 1 /^9\\(.*\\)/ /\\1/\nvoice translation-profile STRIP-9\n translate called 1",
    options:[
      {text:"Strips the leading 9 from the called number (e.g., 914155551234 → 14155551234)", correct:true},
      {text:"Adds a 9 prefix to all outbound called numbers", correct:false},
      {text:"Strips the leading 9 from the calling number", correct:false},
      {text:"Translates all numbers to start with 1", correct:false}
    ],
    explanation:"Regex <code>/^9\\(.*\\)/</code> matches numbers starting with 9, captures the rest. <code>/\\1/</code> outputs only the captured group. <code>translate called 1</code> applies to called (destination) number."
  },
  {
    id:25, category:"CUBE", subcategory:"Translation Rules", difficulty:"hard", type:"single",
    question:"You need to prepend +1 to all 10-digit called numbers. Which translation rule works?",
    options:[
      {text:'rule 1 /^\\(..........\\)$/ /+1\\1/', correct:true},
      {text:'rule 1 /^\\(...\\)/ /+1\\1/', correct:false},
      {text:'rule 1 /^\\(.*\\)/ /+1\\1/', correct:false},
      {text:'rule 1 /+1/ /^\\(..........\\)/', correct:false}
    ],
    explanation:"<code>/^\\(..........\\)$/</code> matches exactly 10 digits (each dot = 1 digit, ^/$ anchor). <code>/+1\\1/</code> prepends +1. Option B matches 3 digits. Option C matches any length. Option D reverses match/replace."
  },
  // ========== CUBE - SIP Profiles ==========
  {
    id:26, category:"CUBE", subcategory:"SIP Profiles", difficulty:"hard", type:"single",
    question:"What is the purpose of a SIP profile on CUBE?",
    options:[
      {text:"To modify SIP headers (add, remove, change) for interoperability between different SIP implementations", correct:true},
      {text:"To define SIP registration credentials", correct:false},
      {text:"To configure TLS certificate parameters", correct:false},
      {text:"To specify codec preference order", correct:false}
    ],
    explanation:"SIP profiles enable SIP header manipulation (normalization) on CUBE, configured under <code>voice class sip-profiles</code>."
  },
  {
    id:27, category:"CUBE", subcategory:"SIP Profiles", difficulty:"hard", type:"single",
    question:"What does this SIP profile do?",
    cli_context:'voice class sip-profiles 100\n request INVITE sip-header SIP-Req-URI modify "sip:(.*)@(.*)" "sip:\\1@itsp.example.com"',
    options:[
      {text:"Rewrites the Request-URI domain to itsp.example.com on outbound INVITE messages", correct:true},
      {text:"Redirects all calls to itsp.example.com", correct:false},
      {text:"Creates a SIP trunk to itsp.example.com", correct:false},
      {text:"Filters INVITEs not matching itsp.example.com", correct:false}
    ],
    explanation:"SIP profiles use regex for header manipulation. This modifies the Request-URI to replace the domain with <code>itsp.example.com</code>, which many ITSPs require."
  },
  // ========== CUBE - Media & Codecs ==========
  {
    id:28, category:"CUBE", subcategory:"Media & Codecs", difficulty:"medium", type:"single",
    question:"Which command configures a codec preference list on CUBE?",
    options:[
      {text:"voice class codec 1\n  codec preference 1 g711ulaw\n  codec preference 2 g729r8", correct:true},
      {text:"voice codec-list 1\n  prefer g711ulaw\n  prefer g729r8", correct:false},
      {text:"dial-peer voice 1 voip\n  codec g711ulaw g729r8", correct:false},
      {text:"voice service voip\n  codec priority g711ulaw g729r8", correct:false}
    ],
    explanation:"Codec lists are configured under <code>voice class codec</code> with numbered preferences (1=highest), then applied to a dial-peer."
  },
  {
    id:29, category:"CUBE", subcategory:"Media & Codecs", difficulty:"medium", type:"single",
    question:"What does <code>media flow-around</code> do on CUBE?",
    options:[
      {text:"Allows RTP media to flow directly between endpoints, bypassing CUBE (only signaling through CUBE)", correct:true},
      {text:"Enables SRTP media encryption", correct:false},
      {text:"Routes media through a transcoder", correct:false},
      {text:"Forces all media through CUBE for inspection", correct:false}
    ],
    explanation:"<code>media flow-around</code> = signaling only through CUBE, media direct. <code>media flow-through</code> (default) = both through CUBE. Flow-around reduces CPU but limits media manipulation."
  },
  // ========== CUBE - Troubleshooting ==========
  {
    id:30, category:"CUBE", subcategory:"Troubleshooting", difficulty:"medium", type:"single",
    question:"Which command shows active dial-peers and their match criteria?",
    options:[
      {text:"show dial-peer voice summary", correct:true},
      {text:"show voice dial-peer all", correct:false},
      {text:"show running-config | section dial-peer", correct:false},
      {text:"debug dial-peer match", correct:false}
    ],
    explanation:"<code>show dial-peer voice summary</code> displays all dial-peers with type, status, destination-pattern, and session target."
  },
  {
    id:31, category:"CUBE", subcategory:"Troubleshooting", difficulty:"hard", type:"single",
    question:"A call through CUBE fails with SIP 488 'Not Acceptable Here'. Most likely cause?",
    options:[
      {text:"Codec mismatch — no common codec was negotiated", correct:true},
      {text:"Destination IP unreachable", correct:false},
      {text:"SIP authentication failed", correct:false},
      {text:"Called number doesn't match any dial-peer", correct:false}
    ],
    explanation:"SIP 488 = capability mismatch, typically codec. Unreachable = 408/503. Auth failure = 401/407. No dial-peer = cause code 3."
  },
  {
    id:32, category:"CUBE", subcategory:"Troubleshooting", difficulty:"medium", type:"single",
    question:"Which debug is most useful for troubleshooting SIP call flows on CUBE?",
    options:[
      {text:"debug ccsip messages", correct:true},
      {text:"debug ip sip all", correct:false},
      {text:"debug voice sip trace", correct:false},
      {text:"debug sip-ua detail", correct:false}
    ],
    explanation:"<code>debug ccsip messages</code> shows the full SIP message exchange with complete headers, essential for CUBE troubleshooting."
  },
  // ========== CUBE - Security ==========
  {
    id:33, category:"CUBE", subcategory:"Security", difficulty:"medium", type:"single",
    question:"How does CUBE provide topology hiding?",
    options:[
      {text:"By acting as a B2BUA, replacing internal IPs and SIP headers with its own", correct:true},
      {text:"By encrypting all SIP headers", correct:false},
      {text:"By using VPN tunnels to the ITSP", correct:false},
      {text:"By blocking ICMP from external networks", correct:false}
    ],
    explanation:"CUBE is a B2BUA — it terminates SIP on one side, creates new sessions on the other, replacing Via, Contact, Record-Route headers with its own address."
  },
  {
    id:34, category:"CUBE", subcategory:"Security", difficulty:"hard", type:"single",
    question:"Which enables SRTP on a CUBE dial-peer?",
    options:[
      {text:"dial-peer voice 100 voip\n  srtp", correct:true},
      {text:"dial-peer voice 100 voip\n  rtp secure", correct:false},
      {text:"voice service voip\n  media encryption srtp", correct:false},
      {text:"dial-peer voice 100 voip\n  crypto srtp enable", correct:false}
    ],
    explanation:"SRTP is enabled with the <code>srtp</code> command under the dial-peer. CUBE then negotiates SRTP via SDP crypto attributes."
  },
  // ========== IOS XE Gateway ==========
  {
    id:35, category:"IOS XE Gateway", subcategory:"Gateway Config", difficulty:"medium", type:"single",
    question:"This configures a T1 PRI. What is correct about it?",
    cli_context:"controller T1 0/0/0\n framing esf\n linecode b8zs\n pri-group timeslots 1-24",
    options:[
      {text:"ESF framing, B8ZS line coding, all 24 timeslots for PRI (23B+1D) — IOS auto-assigns timeslot 24 as D-channel", correct:true},
      {text:"This configures CAS (Channel Associated Signaling)", correct:false},
      {text:"This is an E1 PRI with 30 bearer channels", correct:false},
      {text:"Invalid — timeslot 24 must be excluded", correct:false}
    ],
    explanation:"Standard T1 PRI: ESF framing, B8ZS line coding. <code>pri-group timeslots 1-24</code> creates PRI with 23 B-channels + 1 D-channel (timeslot 24 auto-assigned)."
  },
  {
    id:36, category:"IOS XE Gateway", subcategory:"Gateway Config", difficulty:"medium", type:"single",
    question:"What protocol does MGCP use?",
    options:[
      {text:"UDP port 2427 (gateway) and 2727 (call agent)", correct:true},
      {text:"TCP port 5060", correct:false},
      {text:"TCP port 2000 (SCCP)", correct:false},
      {text:"UDP port 1719 (H.323 RAS)", correct:false}
    ],
    explanation:"MGCP uses UDP — gateway listens on 2427, call agent (CUCM) on 2727."
  },
  {
    id:37, category:"IOS XE Gateway", subcategory:"Media Resources", difficulty:"medium", type:"single",
    question:"What is the function of a transcoder?",
    options:[
      {text:"Converts media between incompatible codecs (e.g., G.711 to G.729) so endpoints can communicate", correct:true},
      {text:"Translates between signaling protocols", correct:false},
      {text:"Provides music on hold", correct:false},
      {text:"Records calls for compliance", correct:false}
    ],
    explanation:"A transcoder is a DSP resource that converts audio between different codecs in real-time when endpoints can't agree on a common codec."
  },
  {
    id:38, category:"IOS XE Gateway", subcategory:"Media Resources", difficulty:"medium", type:"single",
    question:"What is a Media Termination Point (MTP) used for?",
    options:[
      {text:"To terminate and re-originate media streams, enabling hold, transfer, and DTMF interworking for endpoints that don't support these natively", correct:true},
      {text:"To terminate calls exceeding max duration", correct:false},
      {text:"To terminate SIP sessions at the border", correct:false},
      {text:"To convert analog to digital", correct:false}
    ],
    explanation:"An MTP inserts into the media path to provide supplementary services (DTMF interworking, hold/resume) for endpoints that can't perform them natively."
  },
  // ========== Protocols - SIP ==========
  {
    id:39, category:"Protocols", subcategory:"SIP", difficulty:"easy", type:"single",
    question:"Which SIP response code indicates the call is ringing?",
    options:[
      {text:"180 Ringing", correct:true},
      {text:"100 Trying", correct:false},
      {text:"200 OK", correct:false},
      {text:"183 Session Progress", correct:false}
    ],
    explanation:"180 = ringing. 100 = trying. 200 = success. 183 = early media/session progress."
  },
  {
    id:40, category:"Protocols", subcategory:"SIP", difficulty:"medium", type:"single",
    question:"What is the role of SDP in SIP?",
    options:[
      {text:"To describe media session parameters: codecs, IP addresses, ports, and media types for RTP", correct:true},
      {text:"To authenticate SIP users", correct:false},
      {text:"To route SIP messages between proxies", correct:false},
      {text:"To provide DNS resolution for SIP URIs", correct:false}
    ],
    explanation:"SDP (Session Description Protocol) is carried in SIP message bodies, describing media capabilities for codec negotiation via offer/answer model."
  },
  {
    id:41, category:"Protocols", subcategory:"SIP", difficulty:"hard", type:"single",
    question:"What is the difference between SIP CANCEL and BYE?",
    options:[
      {text:"CANCEL terminates a pending/unanswered call (before 200 OK); BYE terminates an established call (after 200 OK + ACK)", correct:true},
      {text:"CANCEL is used by caller; BYE by callee", correct:false},
      {text:"CANCEL is a request; BYE is a response", correct:false},
      {text:"No difference; both terminate calls", correct:false}
    ],
    explanation:"CANCEL aborts a pending INVITE before final response. BYE ends an established dialog after the call is answered."
  },
  {
    id:42, category:"Protocols", subcategory:"SIP", difficulty:"medium", type:"single",
    question:"Which DTMF relay method encodes digits within RTP packets?",
    options:[
      {text:"RFC 2833/4733 (rtp-nte)", correct:true},
      {text:"SIP INFO", correct:false},
      {text:"In-band audio tones", correct:false},
      {text:"SIP NOTIFY", correct:false}
    ],
    explanation:"RFC 2833/4733 (NTE) encodes DTMF as special RTP payloads. SIP INFO sends DTMF as signaling messages. In-band uses actual tones that can be degraded by compression codecs."
  },
  {
    id:43, category:"Protocols", subcategory:"SIP", difficulty:"medium", type:"single",
    question:"What SIP response code indicates a server error where the request cannot be fulfilled?",
    options:[
      {text:"503 Service Unavailable", correct:true},
      {text:"404 Not Found", correct:false},
      {text:"486 Busy Here", correct:false},
      {text:"302 Moved Temporarily", correct:false}
    ],
    explanation:"5xx = server errors. 503 = service unavailable. 404 = user not found (4xx client error). 486 = busy (4xx). 302 = redirect (3xx)."
  },
  // ========== Infrastructure & Design ==========
  {
    id:44, category:"Infrastructure", subcategory:"Design", difficulty:"medium", type:"single",
    question:"What is the purpose of Cisco Expressway in a collaboration deployment?",
    options:[
      {text:"To provide secure firewall traversal for MRA users to register with on-premises CUCM", correct:true},
      {text:"To replace CUCM as primary call control", correct:false},
      {text:"To provide DHCP and DNS to IP phones", correct:false},
      {text:"To connect analog phones to IP", correct:false}
    ],
    explanation:"Expressway (C and E pair) provides secure firewall traversal for MRA. Remote Jabber/video endpoints register to CUCM through Expressway without VPN."
  },
  {
    id:45, category:"Infrastructure", subcategory:"Design", difficulty:"easy", type:"single",
    question:"Which DHCP option provides Cisco IP phones with the TFTP server address?",
    options:[
      {text:"Option 150", correct:true},
      {text:"Option 66", correct:false},
      {text:"Option 43", correct:false},
      {text:"Option 3", correct:false}
    ],
    explanation:"DHCP Option 150 (Cisco-proprietary) can specify multiple TFTP servers. Option 66 is standard but single-address only. Option 3 = default gateway."
  },
  {
    id:46, category:"Infrastructure", subcategory:"Design", difficulty:"medium", type:"single",
    question:"What is the recommended Cisco deployment model for a large enterprise with 30,000 users across multiple sites?",
    options:[
      {text:"Centralized call processing with distributed gateways and SRST for survivability", correct:true},
      {text:"One CUCM server at each site", correct:false},
      {text:"Cloud-only deployment with no on-premises equipment", correct:false},
      {text:"H.323 gatekeepers at each site", correct:false}
    ],
    explanation:"Cisco recommends centralized CUCM clusters with distributed gateways. SRST (Survivable Remote Site Telephony) on local gateways provides fallback registration if WAN fails."
  },
  // ========== Call Control ==========
  {
    id:47, category:"Call Control", subcategory:"CUCM Routing", difficulty:"medium", type:"single",
    question:"In CUCM, what is the purpose of Partitions and Calling Search Spaces (CSS)?",
    options:[
      {text:"Partitions group DNs/route patterns by reachability; CSS defines which partitions a device can reach, implementing call restrictions", correct:true},
      {text:"Partitions divide the cluster into servers; CSS controls which server handles each call", correct:false},
      {text:"Partitions are for time zones; CSS controls time-of-day routing", correct:false},
      {text:"Partitions restrict physical access; CSS controls device registration", correct:false}
    ],
    explanation:"Partitions = containers for route patterns and DNs. CSS = ordered list of Partitions a device can reach. If a DN's partition isn't in the caller's CSS, the call is blocked."
  },
  {
    id:48, category:"Call Control", subcategory:"CUCM Routing", difficulty:"hard", type:"single",
    question:"A user dials 91-408-555-1234. CUCM has patterns:\n• 9.1[2-9]XX[2-9]XXXXXX\n• 9.1408[2-9]XXXXXX\n• 9.@\nWhich matches first?",
    options:[
      {text:"9.1408[2-9]XXXXXX — most specific (longest) match", correct:true},
      {text:"9.@ — catch-all has highest priority", correct:false},
      {text:"9.1[2-9]XX[2-9]XXXXXX — appears first", correct:false},
      {text:"All match equally; CUCM uses round-robin", correct:false}
    ],
    explanation:"CUCM uses closest/longest match routing. 9.1408... explicitly matches the 408 area code, making it more specific than the general NANP pattern."
  },
  {
    id:49, category:"Call Control", subcategory:"CUCM Routing", difficulty:"medium", type:"single",
    question:"What is the purpose of a Translation Pattern in CUCM?",
    options:[
      {text:"To manipulate (add, strip, modify) the called/calling number before routing the call to the next step in digit analysis", correct:true},
      {text:"To translate SIP headers between different languages", correct:false},
      {text:"To convert between SIP and H.323 protocols", correct:false},
      {text:"To translate voicemail greetings", correct:false}
    ],
    explanation:"Translation Patterns intercept dialed digits and transform them (prefix, strip, modify) before continuing digit analysis. Commonly used for E.164 normalization and local dial plan manipulation."
  },
  // ========== Collaboration Applications ==========
  {
    id:50, category:"Collaboration Apps", subcategory:"Unity Connection", difficulty:"medium", type:"single",
    question:"Which protocol does Cisco Unity Connection primarily use to integrate with CUCM for voicemail?",
    options:[
      {text:"SIP (SCCP was used in older versions)", correct:true},
      {text:"SMTP only", correct:false},
      {text:"LDAP for all integration", correct:false},
      {text:"MGCP", correct:false}
    ],
    explanation:"Unity Connection integrates with CUCM via SIP trunk (preferred) or SCCP (legacy). SMTP is used for message exchange between Unity systems. LDAP is for directory sync."
  },
  {
    id:51, category:"Collaboration Apps", subcategory:"IM & Presence", difficulty:"medium", type:"single",
    question:"Which protocol does Cisco IM and Presence Service use for real-time messaging?",
    options:[
      {text:"XMPP (Extensible Messaging and Presence Protocol)", correct:true},
      {text:"SIP SIMPLE", correct:false},
      {text:"SMTP", correct:false},
      {text:"HTTP REST only", correct:false}
    ],
    explanation:"Cisco IM&P uses XMPP (based on Jabber protocol) for instant messaging and presence. SIP SIMPLE was used in older systems."
  },
  // ========== Additional QoS CLI Questions ==========
  {
    id:52, category:"QoS", subcategory:"MQC Framework", difficulty:"hard", type:"single",
    question:"What is the correct order of the three MQC components for implementing QoS?",
    options:[
      {text:"1) class-map (classify), 2) policy-map (define actions), 3) service-policy (apply to interface)", correct:true},
      {text:"1) policy-map, 2) class-map, 3) service-policy", correct:false},
      {text:"1) service-policy, 2) policy-map, 3) class-map", correct:false},
      {text:"1) class-map, 2) service-policy, 3) policy-map", correct:false}
    ],
    explanation:"MQC workflow: 1) Create class-maps to classify traffic, 2) Create policy-maps referencing class-maps with QoS actions, 3) Apply policy-maps to interfaces with service-policy."
  },
  {
    id:53, category:"QoS", subcategory:"Policing & Shaping", difficulty:"medium", type:"single",
    question:"What command verifies that a QoS policy is active and shows packet/byte counters per class?",
    options:[
      {text:"show policy-map interface", correct:true},
      {text:"show qos interface", correct:false},
      {text:"show class-map statistics", correct:false},
      {text:"show service-policy summary", correct:false}
    ],
    explanation:"<code>show policy-map interface</code> displays the applied policy-map with per-class statistics including matched packets, bytes, drops, and queue depths."
  },
  // ========== Additional CUBE Questions ==========
  {
    id:54, category:"CUBE", subcategory:"Dial Peers", difficulty:"hard", type:"single",
    question:"What does <code>incoming called-number .+</code> do on a VoIP dial-peer?",
    options:[
      {text:"Matches all inbound calls with at least one digit in the called number, binding them to this dial-peer", correct:true},
      {text:"Blocks all incoming calls", correct:false},
      {text:"Forwards incoming calls to the + prefix", correct:false},
      {text:"Matches outbound calls only", correct:false}
    ],
    explanation:"<code>incoming called-number</code> matches inbound calls based on the called number regex. <code>.+</code> matches one or more digits. This is used to match inbound legs to specific dial-peers for applying features."
  },
  {
    id:55, category:"CUBE", subcategory:"Basic Configuration", difficulty:"hard", type:"single",
    question:"Which command shows the current number of active calls and the license capacity on CUBE?",
    options:[
      {text:"show call active voice summary", correct:true},
      {text:"show cube status", correct:false},
      {text:"show voice call summary", correct:false},
      {text:"show sip-ua calls", correct:false}
    ],
    explanation:"<code>show call active voice summary</code> shows currently active voice calls. For CUBE license capacity, <code>show cube status</code> is not a valid command; use <code>show voice call summary</code> or <code>show platform hardware throughput</code> depending on the platform."
  },
  {
    id:56, category:"CUBE", subcategory:"Dial Peers", difficulty:"medium", type:"single",
    question:"Which command under a dial-peer sets the preference for dial-peer selection (lower = higher priority)?",
    options:[
      {text:"preference 1", correct:true},
      {text:"priority 1", correct:false},
      {text:"weight 1", correct:false},
      {text:"order 1", correct:false}
    ],
    explanation:"The <code>preference</code> command under a dial-peer sets selection priority. Lower value = higher priority. Default is 0. Used when multiple dial-peers match the same destination pattern."
  },
  // ========== Additional Protocol Questions ==========
  {
    id:57, category:"Protocols", subcategory:"SIP", difficulty:"easy", type:"single",
    question:"What is the default SIP signaling port for unencrypted (UDP/TCP) transport?",
    options:[
      {text:"5060", correct:true},
      {text:"5061", correct:false},
      {text:"2000", correct:false},
      {text:"443", correct:false}
    ],
    explanation:"SIP uses port 5060 for UDP/TCP. Port 5061 is for SIP over TLS. 2000 = SCCP. 443 = HTTPS."
  },
  {
    id:58, category:"Protocols", subcategory:"SIP", difficulty:"medium", type:"single",
    question:"What SIP response code indicates the user is busy?",
    options:[
      {text:"486 Busy Here", correct:true},
      {text:"480 Temporarily Unavailable", correct:false},
      {text:"503 Service Unavailable", correct:false},
      {text:"408 Request Timeout", correct:false}
    ],
    explanation:"486 = Busy Here (callee is on another call). 480 = Temporarily Unavailable (not registered). 503 = server error. 408 = timeout."
  },
  // ========== Additional Infrastructure ==========
  {
    id:59, category:"Infrastructure", subcategory:"Design", difficulty:"medium", type:"single",
    question:"What does SRST (Survivable Remote Site Telephony) provide?",
    options:[
      {text:"Fallback call processing on the local IOS gateway when WAN connectivity to centralized CUCM is lost", correct:true},
      {text:"Redundant SIP trunk to the ITSP", correct:false},
      {text:"Backup CUCM database replication", correct:false},
      {text:"Encrypted backup of phone configurations", correct:false}
    ],
    explanation:"SRST runs on a local IOS gateway and provides basic call processing (registration, dial tone, local calls) when IP phones lose contact with the centralized CUCM cluster."
  },
  {
    id:60, category:"Infrastructure", subcategory:"Design", difficulty:"hard", type:"single",
    question:"In an IOS-XE SRST configuration, which command defines the CUCM server that phones will fall back from?",
    options:[
      {text:"call-manager-fallback\n  ip source-address 10.1.1.1 port 2000", correct:true},
      {text:"srst enable\n  cucm-server 10.1.1.1", correct:false},
      {text:"voice register global\n  fallback-server 10.1.1.1", correct:false},
      {text:"telephony-service\n  cucm-fallback 10.1.1.1", correct:false}
    ],
    explanation:"<code>call-manager-fallback</code> enters SRST config mode. <code>ip source-address</code> defines the IP that phones will register to during fallback. Port 2000 is for SCCP phones."
  },
  // ========== QoS - DSCP Values ==========
  {
    id:61, category:"QoS", subcategory:"Classification & Marking", difficulty:"medium", type:"single",
    question:"What DSCP marking does Cisco recommend for video conferencing media?",
    options:[
      {text:"AF41", correct:true},
      {text:"EF", correct:false},
      {text:"CS4", correct:false},
      {text:"AF31", correct:false}
    ],
    explanation:"Cisco QoS baseline: EF for voice media, AF41 for interactive video, CS3 or AF31 for call signaling, AF21 for transactional data."
  },
  {
    id:62, category:"QoS", subcategory:"Policing & Shaping", difficulty:"hard", type:"single",
    question:"In an MQC policy, what does <code>bandwidth remaining percent 30</code> do?",
    options:[
      {text:"Allocates 30% of remaining bandwidth (after priority and guaranteed bandwidth classes) to this class during congestion", correct:true},
      {text:"Allocates 30% of total interface bandwidth at all times", correct:false},
      {text:"Limits the class to 30% of bandwidth", correct:false},
      {text:"Drops 30% of traffic in this class", correct:false}
    ],
    explanation:"<code>bandwidth remaining percent</code> specifies a share of leftover bandwidth (after priority/bandwidth classes are served) during congestion. It only takes effect during congestion; otherwise traffic can use available bandwidth."
  },
  {
    id:63, category:"CUBE", subcategory:"Basic Configuration", difficulty:"medium", type:"single",
    question:"What is the purpose of <code>voice-class sip options-keepalive</code> on a CUBE dial-peer?",
    options:[
      {text:"Sends periodic SIP OPTIONS pings to the session target to monitor its availability and mark the dial-peer up/down", correct:true},
      {text:"Keeps the SIP registration active by sending re-REGISTER messages", correct:false},
      {text:"Prevents SIP sessions from timing out during long calls", correct:false},
      {text:"Enables TCP keepalive for SIP connections", correct:false}
    ],
    explanation:"<code>options-keepalive</code> sends SIP OPTIONS requests at regular intervals to the session target. If the target stops responding, the dial-peer is marked as down and calls are routed to alternate peers."
  },
  {
    id:64, category:"CUBE", subcategory:"Dial Peers", difficulty:"hard", type:"single",
    question:"What does <code>voice-class sip tenant 100</code> do when applied to a dial-peer?",
    options:[
      {text:"Applies a pre-defined set of SIP parameters (registrar, credentials, transport, bind) enabling multi-tenant CUBE configurations", correct:true},
      {text:"Limits the dial-peer to handling only 100 concurrent calls", correct:false},
      {text:"Assigns the dial-peer to VLAN 100", correct:false},
      {text:"Sets the SIP session timer to 100 seconds", correct:false}
    ],
    explanation:"SIP tenants group SIP configuration parameters (registrar, credentials, transport, bind addresses) that can be applied per dial-peer, enabling multi-tenant CUBE deployments where different dial-peers connect to different service providers."
  },
  {
    id:65, category:"QoS", subcategory:"MQC Framework", difficulty:"hard", type:"single",
    question:"You apply a hierarchical (nested) QoS policy. What is the purpose of the parent policy shaping and child policy queuing?",
    options:[
      {text:"The parent shapes aggregate traffic to the sub-line rate (e.g., contracted CIR); the child policy applies per-class queuing/priority within that shaped rate", correct:true},
      {text:"The parent handles inbound; the child handles outbound", correct:false},
      {text:"The parent is for IPv4; the child is for IPv6", correct:false},
      {text:"Hierarchical policies are not supported on IOS-XE", correct:false}
    ],
    explanation:"Hierarchical QoS (H-QoS) uses a parent policy to shape to the contracted rate (e.g., provider CIR) and a child policy for per-class queuing (LLQ, CBWFQ, WRED) within that shaped bandwidth. This is common on WAN interfaces where the physical rate exceeds the contracted rate."
  }
];
