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
      {text:"9.1408[2-9]XXXXXX", correct:true},
      {text:"9.@", correct:false},
      {text:"9.1[2-9]XX[2-9]XXXXXX", correct:false},
      {text:"All match equally", correct:false}
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
      {text:"SIP", correct:true},
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
      {text:"XMPP", correct:true},
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
      {text:"1) class-map, 2) policy-map , 3) service-policy", correct:true},
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
      {text:"486", correct:true},
      {text:"480", correct:false},
      {text:"503", correct:false},
      {text:"408", correct:false}
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
  },
  // ========== Additional QoS Questions ==========
  {
    id:66, category:"QoS", subcategory:"Classification & Marking", difficulty:"medium", type:"single",
    question:"What is the decimal DSCP value for CS3?",
    options:[
      {text:"24", correct:true},
      {text:"26", correct:false},
      {text:"18", correct:false},
      {text:"48", correct:false}
    ],
    explanation:"Class Selector (CS) values are multiples of 8. CS3 = 3 × 8 = 24. AF31 = 26, AF21 = 18, CS6 = 48."
  },
  {
    id:67, category:"QoS", subcategory:"Classification & Marking", difficulty:"hard", type:"single",
    question:"Which command on a Catalyst switch port trusts DSCP markings from a connected device?",
    options:[
      {text:"mls qos trust dscp", correct:true},
      {text:"qos trust dscp", correct:false},
      {text:"trust dscp enable", correct:false},
      {text:"switchport qos trust dscp", correct:false}
    ],
    explanation:"On older Catalyst platforms (3560/3750), <code>mls qos trust dscp</code> under the interface trusts incoming DSCP. On newer Catalyst 9000, <code>trust device cisco-phone</code> combined with policies is used."
  },
  {
    id:68, category:"QoS", subcategory:"Policing & Shaping", difficulty:"hard", type:"single",
    question:"What is the effect of <code>police cir 1000000 bc 31250 conform-action transmit exceed-action drop</code>?",
    options:[
      {text:"Polices traffic to 1 Mbps CIR with a 31250 byte burst; conforming traffic is forwarded, exceeding traffic is dropped", correct:true},
      {text:"Shapes traffic to 1 Mbps with 31250 byte buffer", correct:false},
      {text:"Drops all traffic over 31250 bytes per second", correct:false},
      {text:"Sets a 1 Mbps minimum bandwidth guarantee", correct:false}
    ],
    explanation:"<code>police cir</code> configures a single-rate policer. CIR = 1 Mbps, Bc (committed burst) = 31250 bytes. Conform-action transmit = forward conforming traffic. Exceed-action drop = drop excess. This is policing, not shaping (no buffering)."
  },
  {
    id:69, category:"QoS", subcategory:"Policing & Shaping", difficulty:"medium", type:"single",
    question:"Which QoS mechanism smooths traffic bursts by buffering excess packets and sending them at a controlled rate?",
    options:[
      {text:"Traffic shaping", correct:true},
      {text:"Traffic policing", correct:false},
      {text:"WRED", correct:false},
      {text:"Classification", correct:false}
    ],
    explanation:"Shaping buffers excess traffic and sends it at a regulated rate, smoothing bursts. Policing drops or remarks without buffering. WRED is a congestion avoidance mechanism."
  },
  {
    id:70, category:"QoS", subcategory:"Voice/Video QoS", difficulty:"medium", type:"single",
    question:"What is the maximum acceptable packet loss for voice traffic per Cisco recommendations?",
    options:[
      {text:"1%", correct:true},
      {text:"5%", correct:false},
      {text:"0.1%", correct:false},
      {text:"3%", correct:false}
    ],
    explanation:"Cisco voice quality targets: max 1% packet loss, 150ms one-way delay, 30ms jitter per ITU-T G.114 recommendations."
  },
  {
    id:71, category:"QoS", subcategory:"Voice/Video QoS", difficulty:"hard", type:"single",
    question:"How much bandwidth should be reserved for the LLQ priority queue according to Cisco best practices?",
    options:[
      {text:"No more than 33% of link bandwidth", correct:true},
      {text:"Exactly 50% of link bandwidth", correct:false},
      {text:"At least 75% of link bandwidth", correct:false},
      {text:"No specific recommendation exists", correct:false}
    ],
    explanation:"Cisco recommends limiting total priority queue allocation to 33% of link bandwidth. Exceeding this can starve other traffic classes during congestion."
  },
  {
    id:72, category:"QoS", subcategory:"MQC Framework", difficulty:"hard", type:"single",
    question:"What does WRED (Weighted Random Early Detection) do and why is it unsuitable for voice traffic?",
    options:[
      {text:"It randomly drops TCP packets before queue overflow to signal TCP senders to slow down; voice uses UDP and cannot respond to drops", correct:true},
      {text:"It prioritizes voice traffic above all others; it is actually recommended for voice", correct:false},
      {text:"It encrypts traffic based on weight values; voice does not need encryption", correct:false},
      {text:"It buffers all traffic equally; voice needs priority queuing instead", correct:false}
    ],
    explanation:"WRED is a congestion avoidance mechanism that selectively drops TCP packets based on DSCP/IP Precedence before queue overflow, triggering TCP slow-start. Voice/video use UDP which cannot respond to drops, so WRED should only be applied to data classes."
  },
  {
    id:73, category:"QoS", subcategory:"Classification & Marking", difficulty:"medium", type:"single",
    question:"What DSCP value does Cisco recommend for voice signaling (SIP/SCCP)?",
    options:[
      {text:"CS3 (24) or AF31 (26)", correct:true},
      {text:"EF (46)", correct:false},
      {text:"AF41 (34)", correct:false},
      {text:"CS1 (8)", correct:false}
    ],
    explanation:"Cisco QoS baseline recommends CS3 (DSCP 24) for call signaling. AF31 is also acceptable. EF is reserved for voice media (RTP). AF41 is for interactive video."
  },
  {
    id:74, category:"QoS", subcategory:"Classification & Marking", difficulty:"easy", type:"single",
    question:"How many bits is the DSCP field in the IP header?",
    options:[
      {text:"6 bits", correct:true},
      {text:"3 bits", correct:false},
      {text:"8 bits", correct:false},
      {text:"4 bits", correct:false}
    ],
    explanation:"DSCP uses the first 6 bits of the 8-bit ToS (Type of Service) byte, providing 64 possible values (0-63). The remaining 2 bits are ECN (Explicit Congestion Notification)."
  },
  {
    id:75, category:"QoS", subcategory:"MQC Framework", difficulty:"hard", type:"single",
    question:"What happens to traffic that does not match any user-defined class-map in a policy-map?",
    options:[
      {text:"It is placed in class-default, which matches all remaining traffic", correct:true},
      {text:"It is dropped immediately", correct:false},
      {text:"It is forwarded without any QoS treatment", correct:false},
      {text:"The policy-map is not applied to that traffic", correct:false}
    ],
    explanation:"<code>class-default</code> is an implicit catch-all class that matches all traffic not matched by other classes. It always exists in every policy-map even if not explicitly configured."
  },
  // ========== Additional CUBE Questions ==========
  {
    id:76, category:"CUBE", subcategory:"Dial Peers", difficulty:"hard", type:"single",
    question:"What is a Dial-Peer Group (DPG) and how is it used on CUBE?",
    options:[
      {text:"A group of outbound dial-peers referenced from an inbound dial-peer, bypassing traditional destination-pattern matching for outbound selection", correct:true},
      {text:"A group of inbound dial-peers that share the same incoming called-number", correct:false},
      {text:"A failover group for redundant CUCM subscribers", correct:false},
      {text:"A set of dial-peers sharing the same codec profile", correct:false}
    ],
    explanation:"<code>voice class dpg</code> groups outbound dial-peers. When applied to an inbound dial-peer with <code>destination dpg</code>, calls matched inbound are routed directly to the DPG members, bypassing normal outbound dial-peer hunting."
  },
  {
    id:77, category:"CUBE", subcategory:"Dial Peers", difficulty:"hard", type:"single",
    question:"What does this configuration accomplish?",
    cli_context:"voice class dpg 100\n dial-peer 200\n dial-peer 201\n\ndial-peer voice 10 voip\n description ** Inbound from ITSP **\n incoming called-number .+\n destination dpg 100",
    options:[
      {text:"All inbound calls from the ITSP are routed to dial-peers 200 and 201 via DPG, bypassing destination-pattern matching", correct:true},
      {text:"Calls are load-balanced between dial-peers 10 and 100", correct:false},
      {text:"Dial-peer 10 sends calls to the ITSP using dial-peers 200 and 201 as backup", correct:false},
      {text:"All outbound calls to the ITSP use dial-peer group 100", correct:false}
    ],
    explanation:"DPG 100 contains outbound peers 200/201. Inbound peer 10 matches all ITSP calls (<code>incoming called-number .+</code>) and routes them to DPG 100 instead of using traditional destination-pattern matching."
  },
  {
    id:78, category:"CUBE", subcategory:"Basic Configuration", difficulty:"hard", type:"single",
    question:"What is a voice class server-group on CUBE?",
    options:[
      {text:"A list of destination SIP server addresses assigned to a dial-peer, providing failover and load distribution with a hunt scheme", correct:true},
      {text:"A group of CUCM servers for phone registration", correct:false},
      {text:"A cluster of CUBE routers for high availability", correct:false},
      {text:"A set of DNS servers for SIP URI resolution", correct:false}
    ],
    explanation:"<code>voice class server-group</code> defines multiple SIP target addresses with hunt order (round-robin, preference, etc.). Applied to a dial-peer with <code>session server-group</code>, it replaces <code>session target</code> for multi-destination scenarios."
  },
  {
    id:79, category:"CUBE", subcategory:"Basic Configuration", difficulty:"medium", type:"single",
    question:"Which command configures CUBE to register with an ITSP SIP registrar?",
    options:[
      {text:"voice class sip-options-keepalive is NOT registration; you need voice class tenant with registrar and credentials commands", correct:false},
      {text:"sip-ua\n  registrar ipv4:203.0.113.1 expires 3600\n  credentials username user password pass realm itsp.com", correct:true},
      {text:"voice service voip\n  register 203.0.113.1", correct:false},
      {text:"dial-peer voice 100 voip\n  register-with itsp.com", correct:false}
    ],
    explanation:"SIP registration is configured under <code>sip-ua</code> mode using <code>registrar</code> (server address and expiry) and <code>credentials</code> (username/password/realm)."
  },
  {
    id:80, category:"CUBE", subcategory:"Translation Rules", difficulty:"hard", type:"single",
    question:"What does the IOS regex character <code>\\(</code> and <code>\\)</code> do in a voice translation rule?",
    options:[
      {text:"They define a capture group — digits matched inside are stored and referenced as \\1, \\2, etc. in the replacement string", correct:true},
      {text:"They match literal parentheses in the phone number", correct:false},
      {text:"They mark optional digits in the pattern", correct:false},
      {text:"They define character classes like [0-9]", correct:false}
    ],
    explanation:"In IOS voice translation rules, <code>\\(</code> and <code>\\)</code> create capture groups. Matched content is referenced with <code>\\1</code>, <code>\\2</code>, etc. in the replacement pattern. This is different from standard regex where unescaped ( ) capture."
  },
  {
    id:81, category:"CUBE", subcategory:"Translation Rules", difficulty:"hard", type:"single",
    question:"You need to add the E.164 prefix +1 to all 10-digit calling numbers on inbound calls. Where do you apply the translation profile?",
    options:[
      {text:"Under the inbound dial-peer: translate calling <profile-tag> (incoming leg)", correct:true},
      {text:"Under voice service voip globally", correct:false},
      {text:"Under the outbound dial-peer: translate called <profile-tag>", correct:false},
      {text:"Under the POTS dial-peer port command", correct:false}
    ],
    explanation:"To modify the calling number on inbound calls, apply the translation profile to the inbound VoIP dial-peer with <code>translate calling</code>. This modifies the calling (ANI) number before further processing."
  },
  {
    id:82, category:"CUBE", subcategory:"Security", difficulty:"hard", type:"single",
    question:"What is the relationship between SRTP on CUBE and the SDP offer/answer?",
    options:[
      {text:"When SRTP is enabled, CUBE includes crypto attributes in SDP; both sides must agree on cipher suite (e.g., AES_CM_128) via SDP negotiation", correct:true},
      {text:"SRTP is negotiated via SIP headers, not SDP", correct:false},
      {text:"SRTP requires pre-shared keys configured on both endpoints, no SDP negotiation needed", correct:false},
      {text:"SRTP only works with H.323, not SIP", correct:false}
    ],
    explanation:"SRTP negotiation uses the <code>a=crypto:</code> line in SDP. CUBE with <code>srtp</code> enabled adds crypto attributes to the SDP offer. The remote side must respond with a matching crypto line in the SDP answer."
  },
  {
    id:83, category:"CUBE", subcategory:"Troubleshooting", difficulty:"medium", type:"single",
    question:"A SIP call fails with <code>403 Forbidden</code>. What is the most likely cause?",
    options:[
      {text:"The request was rejected due to policy — the server understood the request but refuses to authorize it", correct:true},
      {text:"The destination number was not found", correct:false},
      {text:"A codec mismatch occurred", correct:false},
      {text:"The SIP INVITE timed out", correct:false}
    ],
    explanation:"SIP 403 = Forbidden — the server understood the request but refuses to fulfill it (policy, ACL, or authorization issue). 404 = Not Found, 488 = codec mismatch, 408 = timeout."
  },
  {
    id:84, category:"CUBE", subcategory:"Troubleshooting", difficulty:"hard", type:"single",
    question:"Which command shows the inbound and outbound dial-peers matched for an active call on CUBE?",
    options:[
      {text:"show voip rtp connections (for media) and show call active voice brief (for dial-peer details)", correct:true},
      {text:"show sip-ua status", correct:false},
      {text:"debug cube all", correct:false},
      {text:"show voice class dpg summary", correct:false}
    ],
    explanation:"<code>show call active voice brief</code> shows active calls with matched inbound/outbound dial-peer tags, codec, duration, and endpoints. <code>show voip rtp connections</code> shows active RTP streams."
  },
  {
    id:85, category:"CUBE", subcategory:"Media & Codecs", difficulty:"medium", type:"single",
    question:"What is the bandwidth of G.729 codec without header overhead?",
    options:[
      {text:"8 kbps", correct:true},
      {text:"64 kbps", correct:false},
      {text:"32 kbps", correct:false},
      {text:"16 kbps", correct:false}
    ],
    explanation:"G.729 compresses voice to 8 kbps (vs G.711 at 64 kbps). With IP/UDP/RTP headers, actual bandwidth is ~26-31 kbps depending on packet size."
  },
  {
    id:86, category:"CUBE", subcategory:"Media & Codecs", difficulty:"medium", type:"single",
    question:"What does <code>media flow-through</code> mean on CUBE?",
    options:[
      {text:"Both SIP signaling AND RTP media pass through CUBE — CUBE is in the media path", correct:true},
      {text:"Only signaling passes through CUBE; media goes directly between endpoints", correct:false},
      {text:"Media is transcoded on CUBE before forwarding", correct:false},
      {text:"Media is encrypted end-to-end through CUBE", correct:false}
    ],
    explanation:"<code>media flow-through</code> is the default CUBE behavior. Both signaling and media pass through CUBE, allowing features like recording, transcoding, DTMF interworking, and SRTP-to-RTP conversion."
  },
  // ========== Additional Protocol Questions ==========
  {
    id:87, category:"Protocols", subcategory:"SIP", difficulty:"medium", type:"single",
    question:"What is the purpose of SIP REGISTER?",
    options:[
      {text:"To bind a user's SIP URI (AOR) to a current contact address (IP:port) so the registrar knows where to route calls", correct:true},
      {text:"To initiate a phone call to a registered user", correct:false},
      {text:"To transfer an active call to another user", correct:false},
      {text:"To subscribe to presence notifications", correct:false}
    ],
    explanation:"SIP REGISTER creates a binding between the user's Address of Record (AOR, e.g., sip:user@domain.com) and the device's contact address (IP:port). This allows the registrar/proxy to route incoming calls to the correct device."
  },
  {
    id:88, category:"Protocols", subcategory:"SIP", difficulty:"hard", type:"single",
    question:"In a SIP INVITE, what do the 'Via' headers indicate?",
    options:[
      {text:"The path the request has traveled through SIP proxies, used for routing responses back along the same path", correct:true},
      {text:"The supported codecs for the call", correct:false},
      {text:"The authentication credentials of the caller", correct:false},
      {text:"The priority level of the call", correct:false}
    ],
    explanation:"Each SIP proxy that forwards a request adds a Via header with its address. Responses are routed back through the same proxies by following the Via headers in reverse order."
  },
  {
    id:89, category:"Protocols", subcategory:"SIP", difficulty:"medium", type:"single",
    question:"What SIP method is used to send mid-call information like DTMF digits (when using SIP INFO method)?",
    options:[
      {text:"INFO", correct:true},
      {text:"NOTIFY", correct:false},
      {text:"UPDATE", correct:false},
      {text:"MESSAGE", correct:false}
    ],
    explanation:"SIP INFO carries application-level information during a session, including DTMF digits. NOTIFY is for event subscriptions. UPDATE modifies session parameters. MESSAGE is for instant messaging."
  },
  {
    id:90, category:"Protocols", subcategory:"SIP", difficulty:"hard", type:"single",
    question:"What is an SDP offer/answer model?",
    options:[
      {text:"The caller includes media capabilities in the SDP offer (INVITE body); the callee responds with selected capabilities in the SDP answer (200 OK body)", correct:true},
      {text:"Both sides simultaneously send SDP and the server picks the best match", correct:false},
      {text:"SDP is only sent by the callee to describe its capabilities", correct:false},
      {text:"SDP negotiation happens in a separate TCP connection after the call is established", correct:false}
    ],
    explanation:"Per RFC 3264, the offerer (typically in INVITE) lists all supported codecs/media. The answerer (in 200 OK or 183) selects compatible options. This establishes the media session parameters for RTP."
  },
  {
    id:91, category:"Protocols", subcategory:"Codecs", difficulty:"medium", type:"single",
    question:"Which codec provides the best voice quality but uses the most bandwidth?",
    options:[
      {text:"G.711 (64 kbps)", correct:true},
      {text:"G.729 (8 kbps)", correct:false},
      {text:"G.722 (48-64 kbps)", correct:false},
      {text:"iLBC (13.3/15.2 kbps)", correct:false}
    ],
    explanation:"G.711 (a-law/u-law) is uncompressed PCM at 64 kbps, providing the best quality (MOS ~4.4). G.722 is wideband at similar bandwidth but for HD voice. G.729 compresses to 8 kbps with good quality (MOS ~3.9)."
  },
  {
    id:92, category:"Protocols", subcategory:"Codecs", difficulty:"easy", type:"single",
    question:"What does the RTP protocol provide?",
    options:[
      {text:"End-to-end delivery of real-time audio/video data with timestamps, sequence numbers, and payload identification", correct:true},
      {text:"Reliable TCP-based delivery of voice packets with retransmission", correct:false},
      {text:"Call setup and teardown signaling", correct:false},
      {text:"Encryption of media streams", correct:false}
    ],
    explanation:"RTP (RFC 3550) runs over UDP and provides timestamps (for synchronization), sequence numbers (for reorder detection), and payload type identification. It does NOT guarantee delivery or provide encryption (that's SRTP)."
  },
  // ========== Additional Infrastructure & Design ==========
  {
    id:93, category:"Infrastructure", subcategory:"Design", difficulty:"medium", type:"single",
    question:"What is the difference between Expressway-C and Expressway-E?",
    options:[
      {text:"Expressway-C is inside the firewall (connects to CUCM); Expressway-E is in the DMZ (faces the internet) — together they provide firewall traversal", correct:true},
      {text:"Expressway-C handles video; Expressway-E handles voice", correct:false},
      {text:"Expressway-C is the primary; Expressway-E is the backup", correct:false},
      {text:"They are the same product with different licenses", correct:false}
    ],
    explanation:"Expressway-C (Core) sits inside the network, communicating with CUCM/IM&P. Expressway-E (Edge) sits in the DMZ, facing external networks. They maintain a traversal zone between them for secure firewall traversal without opening inbound ports."
  },
  {
    id:94, category:"Infrastructure", subcategory:"Design", difficulty:"hard", type:"single",
    question:"What is Mobile and Remote Access (MRA) in Cisco Collaboration?",
    options:[
      {text:"A solution allowing Jabber/Webex clients to register with on-premises CUCM from outside the enterprise network without VPN, using Expressway", correct:true},
      {text:"A VPN solution built into Cisco IP phones", correct:false},
      {text:"A mobile app that replaces CUCM for remote users", correct:false},
      {text:"A cellular network integration for voice failover", correct:false}
    ],
    explanation:"MRA uses Expressway-C/E pair to provide VPN-less access to CUCM services (registration, calling, voicemail, IM/presence, directory) for Jabber and Webex clients outside the corporate network."
  },
  {
    id:95, category:"Infrastructure", subcategory:"Design", difficulty:"medium", type:"single",
    question:"What is a CUCM cluster?",
    options:[
      {text:"A group of CUCM servers (Publisher and Subscribers) sharing a replicated database, providing scalability and redundancy", correct:true},
      {text:"A single CUCM server with multiple virtual machines", correct:false},
      {text:"A group of gateways registered to the same CUCM", correct:false},
      {text:"A collection of IP phone device pools", correct:false}
    ],
    explanation:"A CUCM cluster has one Publisher (read-write database) and up to 11 Subscribers (read-only replicas). Phones register to Subscribers. The Publisher handles DB writes and replication."
  },
  {
    id:96, category:"Infrastructure", subcategory:"Design", difficulty:"medium", type:"single",
    question:"What is the maximum number of CUCM nodes (servers) in a single cluster?",
    options:[
      {text:"12 (1 Publisher + up to 11 Subscribers)", correct:false},
      {text:"21 (1 Publisher + up to 20 Subscribers/specialized servers)", correct:true},
      {text:"4 (1 Publisher + 3 Subscribers)", correct:false},
      {text:"Unlimited", correct:false}
    ],
    explanation:"A CUCM cluster supports up to 21 nodes: 1 Publisher, and up to 20 additional servers (Subscribers, TFTP, media resource servers). The older limit was 12, but current versions support up to 21."
  },
  // ========== Additional Call Control ==========
  {
    id:97, category:"Call Control", subcategory:"CUCM Routing", difficulty:"medium", type:"single",
    question:"What is a Route Group in CUCM?",
    options:[
      {text:"An ordered list of gateways/trunks that CUCM uses to route calls, providing failover if the first device is unavailable", correct:true},
      {text:"A group of route patterns sharing the same partition", correct:false},
      {text:"A set of phones that can receive group calls", correct:false},
      {text:"A collection of dial rules for digit manipulation", correct:false}
    ],
    explanation:"A Route Group contains one or more gateways or SIP trunks in a prioritized list. CUCM tries the first device; if unavailable, it tries the next. Route Groups are referenced by Route Lists."
  },
  {
    id:98, category:"Call Control", subcategory:"CUCM Routing", difficulty:"medium", type:"single",
    question:"What is a Route List in CUCM and how does it relate to Route Groups?",
    options:[
      {text:"A Route List is an ordered collection of Route Groups; Route Patterns point to Route Lists, which contain Route Groups, which contain gateways/trunks", correct:true},
      {text:"A Route List is the same as a Route Group", correct:false},
      {text:"A Route List contains Route Patterns organized by priority", correct:false},
      {text:"A Route List is a list of dialed digit patterns", correct:false}
    ],
    explanation:"The routing hierarchy is: Route Pattern → Route List → Route Group → Gateway/Trunk. This three-tier architecture provides flexible failover and load distribution for call routing."
  },
  {
    id:99, category:"Call Control", subcategory:"CUCM Routing", difficulty:"hard", type:"single",
    question:"In CUCM, what does the '!' wildcard do in a route pattern?",
    options:[
      {text:"Matches one or more digits (equivalent to .+ in regex) — routes immediately without waiting for more digits", correct:true},
      {text:"Matches exactly one digit", correct:false},
      {text:"Matches zero or more digits", correct:false},
      {text:"Blocks the matched pattern", correct:false}
    ],
    explanation:"The '!' wildcard matches one or more digits and triggers immediate routing without inter-digit timeout. This is different from 'X' (single digit) and '@' (NANP pattern). Example: 9.! routes all calls starting with 9."
  },
  {
    id:100, category:"Call Control", subcategory:"CUCM Routing", difficulty:"medium", type:"single",
    question:"What is a Device Pool in CUCM?",
    options:[
      {text:"A collection of common settings (region, date/time group, SRST reference, calling search space) applied to multiple devices for simplified administration", correct:true},
      {text:"A pool of available IP addresses for phones", correct:false},
      {text:"A group of phones that share a single directory number", correct:false},
      {text:"A set of DSP resources allocated to a gateway", correct:false}
    ],
    explanation:"Device Pools provide a template of common parameters (region, location, SRST reference, date/time, softkey template, media resource group list) applied to phones, gateways, and trunks."
  },
  // ========== Additional Collaboration Applications ==========
  {
    id:101, category:"Collaboration Apps", subcategory:"Unity Connection", difficulty:"medium", type:"single",
    question:"What is the purpose of a Voice Mail Pilot and Voice Mail Profile in CUCM?",
    options:[
      {text:"The Pilot is the DN that calls are forwarded to for voicemail; the Profile links the Pilot to specific phones/line groups for proper voicemail access", correct:true},
      {text:"The Pilot records greetings; the Profile stores messages", correct:false},
      {text:"The Pilot is the MWI number; the Profile is the PIN policy", correct:false},
      {text:"They are the same thing with different names", correct:false}
    ],
    explanation:"Voice Mail Pilot = the directory number of Unity Connection (e.g., 9000). Voice Mail Profile = associates the Pilot with devices. When a user presses the messages button or a CFNA triggers, the call goes to the Pilot DN."
  },
  {
    id:102, category:"Collaboration Apps", subcategory:"IM & Presence", difficulty:"medium", type:"single",
    question:"What presence states are available in Cisco IM&P?",
    options:[
      {text:"Available, Busy, Away, Do Not Disturb, Offline — aggregated from multiple sources (phone state, calendar, manual)", correct:true},
      {text:"Online and Offline only", correct:false},
      {text:"Active and Inactive only", correct:false},
      {text:"Available, Ringing, and Busy only", correct:false}
    ],
    explanation:"IM&P aggregates presence from multiple sources: CUCM phone state, calendar (Exchange/O365), manual user input, and client activity. The most restrictive state wins in aggregation."
  },
  {
    id:103, category:"Collaboration Apps", subcategory:"Webex", difficulty:"medium", type:"single",
    question:"What is Cisco Webex Calling?",
    options:[
      {text:"A cloud-based enterprise phone system (UCaaS) that replaces or supplements on-premises CUCM with cloud call control", correct:true},
      {text:"A video conferencing-only platform", correct:false},
      {text:"A SIP trunking service for PSTN connectivity", correct:false},
      {text:"A VPN client for remote Jabber users", correct:false}
    ],
    explanation:"Webex Calling is Cisco's cloud UCaaS platform providing PBX functionality (call control, voicemail, auto-attendant, hunt groups) from the cloud. It can work standalone or in hybrid with on-premises CUCM."
  },
  {
    id:104, category:"Collaboration Apps", subcategory:"Webex", difficulty:"medium", type:"single",
    question:"What is a Local Gateway in Webex Calling?",
    options:[
      {text:"A CUBE or IOS-XE router that connects Webex Calling to on-premises PSTN or existing PBX infrastructure", correct:true},
      {text:"A switch that provides PoE to IP phones", correct:false},
      {text:"A cloud-based SIP proxy", correct:false},
      {text:"A DNS server for Webex domain resolution", correct:false}
    ],
    explanation:"A Local Gateway (typically CUBE on ISR/CSR) connects Webex Calling to local PSTN trunks (SIP/PRI) or existing on-premises PBX systems, enabling hybrid deployments and local PSTN breakout."
  },
  // ========== Additional IOS XE Gateway ==========
  {
    id:105, category:"IOS XE Gateway", subcategory:"Gateway Config", difficulty:"hard", type:"single",
    question:"What is the purpose of <code>voice register global</code> on an IOS-XE gateway?",
    options:[
      {text:"Enables SIP phone registration on the gateway (for CME or SIP SRST), defining max-dn, max-pool, and source address", correct:true},
      {text:"Registers the gateway with CUCM as a MGCP gateway", correct:false},
      {text:"Configures global dial-peer settings", correct:false},
      {text:"Enables QoS for voice globally", correct:false}
    ],
    explanation:"<code>voice register global</code> enables SIP registrar functionality on the gateway. <code>max-dn</code> sets maximum directory numbers, <code>max-pool</code> sets maximum phones, and <code>source-address</code> defines the gateway's registration IP."
  },
  {
    id:106, category:"IOS XE Gateway", subcategory:"Gateway Config", difficulty:"medium", type:"single",
    question:"What is the difference between an FXS and FXO voice port?",
    options:[
      {text:"FXS provides dial tone to a phone/fax (station side); FXO receives dial tone from the PSTN/PBX (office side)", correct:true},
      {text:"FXS is for SIP; FXO is for H.323", correct:false},
      {text:"FXS is digital; FXO is analog", correct:false},
      {text:"FXS is inbound only; FXO is outbound only", correct:false}
    ],
    explanation:"FXS (Foreign Exchange Station) provides power, ring voltage, and dial tone — connects to phones. FXO (Foreign Exchange Office) connects to the CO/PBX, receiving dial tone. A router's FXS port connects to an analog phone; its FXO port connects to the PSTN."
  },
  {
    id:107, category:"IOS XE Gateway", subcategory:"Gateway Config", difficulty:"hard", type:"single",
    question:"What does <code>isdn switch-type primary-ni</code> configure?",
    options:[
      {text:"Sets the ISDN switch type to National ISDN for a T1 PRI interface in North America", correct:true},
      {text:"Enables ISDN BRI on the interface", correct:false},
      {text:"Configures the gateway as a network switch", correct:false},
      {text:"Sets the SIP transport to TCP", correct:false}
    ],
    explanation:"<code>isdn switch-type primary-ni</code> configures the PRI to use National ISDN protocol. Other common types: <code>primary-4ess</code> (AT&T), <code>primary-5ess</code> (Lucent), <code>primary-net5</code> (Euro ISDN)."
  },
  {
    id:108, category:"IOS XE Gateway", subcategory:"Media Resources", difficulty:"hard", type:"single",
    question:"What is a Media Resource Group List (MRGL) in CUCM?",
    options:[
      {text:"An ordered list of Media Resource Groups (MRGs) that defines the priority order for allocating media resources (transcoders, MTPs, conference bridges) to devices", correct:true},
      {text:"A list of media files for music on hold", correct:false},
      {text:"A group of SIP trunks for media routing", correct:false},
      {text:"A configuration for video endpoint resolution settings", correct:false}
    ],
    explanation:"MRGL → MRG → individual resources (transcoders, MTPs, conference bridges, MOH servers). MRGLs are assigned to Device Pools or individual devices. CUCM searches groups in MRGL order to find available resources."
  },
  // ========== Additional Scenario-Based Questions ==========
  {
    id:109, category:"QoS", subcategory:"MQC Framework", difficulty:"hard", type:"single",
    question:"A WAN link is 10 Mbps but the ISP CIR is 5 Mbps. How do you apply QoS to prevent dropping at the ISP?",
    cli_context:"policy-map SHAPER\n  class class-default\n    shape average 5000000\n    service-policy QOS-CHILD\npolicy-map QOS-CHILD\n  class VOICE\n    priority percent 20\n  class VIDEO\n    bandwidth percent 30\n  class class-default\n    fair-queue",
    options:[
      {text:"H-QoS: parent shapes to 5 Mbps CIR; child policy provides LLQ for voice (20% of 5M = 1M), CBWFQ for video (30%), and WFQ for default", correct:true},
      {text:"The parent sends voice at 20 Mbps; the child limits video to 30 Mbps", correct:false},
      {text:"Shaping and queuing cannot be combined in a single policy", correct:false},
      {text:"The percentages are based on the physical 10 Mbps, not the shaped rate", correct:false}
    ],
    explanation:"In H-QoS, the child policy percentages are relative to the parent's shaped rate (5 Mbps), not the physical interface speed. Voice gets ~1 Mbps priority, video gets ~1.5 Mbps guaranteed. This prevents ISP drops by matching QoS to the contracted rate."
  },
  {
    id:110, category:"CUBE", subcategory:"Troubleshooting", difficulty:"hard", type:"single",
    question:"A one-way audio issue exists on calls through CUBE. What is the most likely cause?",
    options:[
      {text:"NAT or firewall blocking RTP in one direction; or incorrect media binding (bind media source-interface mismatch)", correct:true},
      {text:"Codec mismatch between endpoints", correct:false},
      {text:"SIP signaling is using TLS", correct:false},
      {text:"The CUCM publisher is down", correct:false}
    ],
    explanation:"One-way audio on CUBE is typically caused by: 1) NAT/firewall blocking RTP, 2) incorrect <code>bind media source-interface</code>, 3) IP routing asymmetry, or 4) media flow-around with NAT. Check with <code>show voip rtp connections</code> and verify bidirectional RTP."
  },
  {
    id:111, category:"CUBE", subcategory:"Basic Configuration", difficulty:"hard", type:"single",
    question:"What does <code>voice service voip\n sip\n  no supplementary-service sip moved-temporarily</code> do?",
    options:[
      {text:"Prevents CUBE from processing SIP 302 Moved Temporarily redirects, keeping CUBE in the call path for transferred calls", correct:true},
      {text:"Disables all SIP services temporarily", correct:false},
      {text:"Stops CUBE from moving calls between dial-peers", correct:false},
      {text:"Blocks temporary phone registrations", correct:false}
    ],
    explanation:"By default, CUBE follows SIP 302 redirects by sending a new INVITE to the redirect target. <code>no supplementary-service sip moved-temporarily</code> passes the 302 back to the originator, keeping CUBE in the signaling path for policy enforcement."
  },
  {
    id:112, category:"Protocols", subcategory:"SIP", difficulty:"hard", type:"single",
    question:"What is the difference between SIP 401 and 407 response codes?",
    options:[
      {text:"401 = endpoint must authenticate with the UAS (WWW-Authenticate); 407 = endpoint must authenticate with the proxy (Proxy-Authenticate)", correct:true},
      {text:"401 = forbidden; 407 = method not allowed", correct:false},
      {text:"401 = server error; 407 = client error", correct:false},
      {text:"They are identical in function", correct:false}
    ],
    explanation:"401 Unauthorized is sent by the UAS (User Agent Server) requesting WWW-Authenticate credentials. 407 Proxy Authentication Required is sent by a SIP proxy requesting Proxy-Authenticate credentials. Both trigger digest authentication."
  },
  {
    id:113, category:"Infrastructure", subcategory:"Design", difficulty:"hard", type:"single",
    question:"What is the Cisco Unified CM Session Management Edition (SME)?",
    options:[
      {text:"A centralized CUCM instance that acts as a SIP session routing hub, interconnecting multiple CUCM leaf clusters and unifying dial plans", correct:true},
      {text:"A management tool for monitoring SIP sessions", correct:false},
      {text:"A scaled-down CUCM for small branch offices", correct:false},
      {text:"A cloud management portal for CUCM clusters", correct:false}
    ],
    explanation:"CUCM SME provides centralized session routing between multiple leaf clusters via SIP trunks. It simplifies dial plan management by handling inter-cluster routing, URI dialing, and PSTN gateway selection from a single point."
  },
  {
    id:114, category:"Call Control", subcategory:"CUCM Routing", difficulty:"hard", type:"single",
    question:"What is a SIP Route Pattern in CUCM?",
    options:[
      {text:"A pattern that routes SIP requests (including URI-based dialing) to a SIP trunk, enabling domain-based call routing", correct:true},
      {text:"A route pattern that only works with SCCP phones", correct:false},
      {text:"A pattern for matching SIP response codes", correct:false},
      {text:"A DNS configuration for SIP servers", correct:false}
    ],
    explanation:"SIP Route Patterns match the domain portion of SIP URIs (e.g., *@example.com) and route calls to the specified SIP trunk. They enable URI-based dialing alongside traditional E.164 route patterns."
  },
  {
    id:115, category:"QoS", subcategory:"Classification & Marking", difficulty:"medium", type:"single",
    question:"What is the relationship between IP Precedence and DSCP?",
    options:[
      {text:"IP Precedence uses the first 3 bits of the ToS byte (8 values); DSCP uses the first 6 bits (64 values) — DSCP supersedes IP Precedence and is backward compatible", correct:true},
      {text:"They are completely separate fields in different headers", correct:false},
      {text:"IP Precedence is for IPv4; DSCP is for IPv6 only", correct:false},
      {text:"DSCP is a subset of IP Precedence", correct:false}
    ],
    explanation:"DSCP redefines the ToS byte, using 6 bits instead of the 3-bit IP Precedence field. Class Selector (CS) DSCP values map directly to IP Precedence values for backward compatibility (CS0=0, CS1=1, etc.)."
  },
  // ====== MULTI-SELECT QUESTIONS ======
  {
    id:116, category:"QoS", subcategory:"MQC Framework", difficulty:"medium", type:"multiple",
    question:"Which three components make up the MQC (Modular QoS CLI) framework? (Choose 3)",
    options:[
      {text:"class-map — classifies traffic based on match criteria", correct:true},
      {text:"policy-map — defines actions to apply to classified traffic", correct:true},
      {text:"service-policy — attaches the policy to an interface", correct:true},
      {text:"access-map — filters traffic using VACLs", correct:false},
      {text:"route-map — matches and sets attributes for routing", correct:false}
    ],
    explanation:"MQC uses three components: <code>class-map</code> (classify), <code>policy-map</code> (define actions like police, shape, queue), and <code>service-policy</code> (apply to interface). Access-maps and route-maps are unrelated features."
  },
  {
    id:117, category:"CUBE", subcategory:"Troubleshooting", difficulty:"hard", type:"multiple",
    question:"Which two commands are most useful for real-time troubleshooting of SIP calls on CUBE? (Choose 2)",
    options:[
      {text:"debug ccsip messages", correct:true},
      {text:"debug voip ccapi inout", correct:true},
      {text:"show running-config | section sip-ua", correct:false},
      {text:"show ip interface brief", correct:false}
    ],
    explanation:"<code>debug ccsip messages</code> displays raw SIP message exchanges (INVITE, 200 OK, etc.), while <code>debug voip ccapi inout</code> traces the call control API showing call setup flow and dial-peer selection. The show commands provide configuration info but not real-time call debugging."
  },
  {
    id:118, category:"Protocols", subcategory:"SIP", difficulty:"medium", type:"multiple",
    question:"Which two of the following are SIP provisional (1xx) responses? (Choose 2)",
    options:[
      {text:"100 Trying", correct:true},
      {text:"180 Ringing", correct:true},
      {text:"200 OK", correct:false},
      {text:"302 Moved Temporarily", correct:false},
      {text:"404 Not Found", correct:false}
    ],
    explanation:"1xx responses are provisional: 100 Trying (request received, working), 180 Ringing (alerting user), 183 Session Progress. 200 OK is a success (2xx), 302 is redirection (3xx), and 404 is client error (4xx)."
  },
  {
    id:119, category:"Infrastructure", subcategory:"CUCM", difficulty:"hard", type:"multiple",
    question:"Which three services are unique to the CUCM Publisher node and cannot run on Subscribers? (Choose 3)",
    options:[
      {text:"Database write/replication master", correct:true},
      {text:"TFTP file master (initial file creation)", correct:true},
      {text:"CDR/CAR repository master", correct:true},
      {text:"Call processing (Cisco CallManager service)", correct:false},
      {text:"CTI Manager service", correct:false}
    ],
    explanation:"The Publisher is the database master (read/write), TFTP master, and CDR repository. Call processing (CCM service) and CTI Manager run on Subscribers as well as the Publisher for redundancy."
  },
  {
    id:120, category:"QoS", subcategory:"Queuing", difficulty:"hard", type:"multiple",
    question:"Which two statements about Low Latency Queuing (LLQ) are correct? (Choose 2)",
    options:[
      {text:"LLQ provides a strict priority queue for delay-sensitive traffic like voice", correct:true},
      {text:"LLQ traffic is policed to prevent it from starving other queues", correct:true},
      {text:"LLQ guarantees bandwidth but does not prioritize packet ordering", correct:false},
      {text:"LLQ uses tail-drop exclusively and cannot use WRED", correct:false}
    ],
    explanation:"LLQ (<code>priority</code> command in policy-map) creates a strict priority queue — packets are always serviced first. To prevent starvation, traffic exceeding the configured bandwidth is policed (dropped). WRED is not applied to LLQ classes."
  },
  {
    id:121, category:"Call Control", subcategory:"Routing", difficulty:"medium", type:"multiple",
    question:"Which two elements are required to implement a complete call routing chain in CUCM? (Choose 2)",
    options:[
      {text:"Route Group — groups gateways/trunks for redundancy and load balancing", correct:true},
      {text:"Route List — ordered list of Route Groups tried sequentially", correct:true},
      {text:"Media Resource Group List — assigns conference bridges and transcoders", correct:false},
      {text:"Device Pool — assigns date/time group and region to phones", correct:false}
    ],
    explanation:"A Route Pattern points to a Route List, which contains ordered Route Groups. Each Route Group contains gateways or trunks. MRGL and Device Pool are configuration elements but not part of the call routing chain."
  },
  {
    id:122, category:"CUBE", subcategory:"Configuration", difficulty:"hard", type:"multiple",
    question:"Which two configuration elements are required on CUBE to enable basic SIP-to-SIP call routing? (Choose 2)",
    options:[
      {text:"An inbound dial-peer matching the calling pattern or SIP URI", correct:true},
      {text:"An outbound dial-peer with a destination-pattern pointing to the next hop", correct:true},
      {text:"A voice class codec preference list on every dial-peer", correct:false},
      {text:"An ISDN switch-type configuration under the voice port", correct:false}
    ],
    explanation:"CUBE requires at minimum an inbound dial-peer (matching incoming calls) and an outbound dial-peer (routing to destination). Codec preferences and ISDN switch-types are optional or used for TDM interfaces, not basic SIP-to-SIP routing."
  },
  {
    id:123, category:"Collaboration Apps", subcategory:"IM&P", difficulty:"medium", type:"multiple",
    question:"Which two presence states are defined in XMPP for Cisco IM and Presence? (Choose 2)",
    options:[
      {text:"Available", correct:true},
      {text:"Do Not Disturb", correct:true},
      {text:"Parked", correct:false},
      {text:"Holding", correct:false}
    ],
    explanation:"Standard XMPP/IM&P presence states include Available, Away, Do Not Disturb (DND), and Offline. Parked and Holding are call states, not presence states."
  },
  {
    id:124, category:"IOS XE Gateway", subcategory:"Voice Ports", difficulty:"medium", type:"multiple",
    question:"Which two statements correctly describe voice port types on an IOS-XE gateway? (Choose 2)",
    options:[
      {text:"FXS ports connect to analog endpoints like phones and fax machines", correct:true},
      {text:"FXO ports connect to the PSTN or a PBX trunk line", correct:true},
      {text:"FXS ports connect to the PSTN for outbound dialing", correct:false},
      {text:"FXO ports provide ring voltage and battery to analog devices", correct:false}
    ],
    explanation:"FXS (Foreign Exchange Station) provides dial tone, ring voltage, and battery to endpoint devices. FXO (Foreign Exchange Office) connects to the PSTN or PBX, receiving ring voltage. They are complementary — FXS connects to stations, FXO connects to the office/network side."
  },
  {
    id:125, category:"QoS", subcategory:"Policing & Shaping", difficulty:"hard", type:"multiple",
    question:"Which two statements about traffic policing are correct? (Choose 2)",
    options:[
      {text:"Policing drops or re-marks excess traffic immediately", correct:true},
      {text:"Policing operates at the ingress or egress of an interface", correct:true},
      {text:"Policing buffers excess traffic to smooth bursts", correct:false},
      {text:"Policing can only be applied in the outbound direction", correct:false}
    ],
    explanation:"Traffic policing uses a token bucket to measure traffic rates and immediately drops or re-marks packets exceeding the committed rate. Unlike shaping, policing does not buffer packets. It can be applied inbound or outbound via <code>service-policy input|output</code>."
  }
];
