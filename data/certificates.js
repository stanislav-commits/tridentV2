// Certificate register data for Sea Wolf X.
// Each item is shown with issue/expiry dates and a document upload control.
window.CERTIFICATE_GROUPS = [
  {
    code: "A",
    title: "REGISTRATION - FLAG",
    items: [
      { code: "A01", title: "Certificate of Registry - Commercial & Private" },
      { code: "A02", title: "Yacht Engaged in Trade (YET) Certificate of Compliance" },
      { code: "A03", title: "International Tonnage Certificate" },
      { code: "A04", title: "+ Addendum of Spaces Included to ITC" },
      { code: "A05", title: "Tonnage Certificate - Panama Canal" },
      { code: "A06", title: "Tonnage Certificate - Suez Canal" },
      { code: "A07", title: "Carving & Marking Note" },
      { code: "A08", title: "Builders Certificate and Delivery & Acceptance Protocol" },
      { code: "A09", title: "Certificate of (Initial) Survey" },
      { code: "A10", title: "Statement of Registration as Pleasure Vessel CISR" },
      { code: "A11", title: "Statement CISR under responsibility UK MCA" }
    ]
  },
  {
    code: "B",
    title: "CLASSIFICATION - CLASS",
    items: [
      { code: "B01", title: "Certificate of Classification" },
      { code: "B02", title: "Interim Certificate(s) of Class" },
      { code: "B03", title: "Class Summary / Quarterly Listings (Lloyds) / Safenet Report (ABS) etc." },
      { code: "B04", title: "Certificate of Laying of Keel or Similar Stage of Construction" },
      { code: "B05", title: "Certificate of First Entry of Classification" },
      { code: "B06", title: "Dry Docking Survey Report" },
      { code: "B07", title: "Tail Shaft(s) Survey Report" },
      { code: "B08", title: "Rudder (shaft/post/stock wear, bearing clearances) Survey Report" },
      { code: "B09", title: "Anchors & Cables Type Approval Certificates" }
    ]
  },
  {
    code: "C",
    title: "Safety (SOLAS)",
    section: "STATUTORY CERTIFICATES",
    items: [
      { code: "C01", title: "Certificate of Compliance for a Large Commercial Yacht (LYC)" },
      { code: "C02", title: "+ Record of Equipment for LYC Certificate (Form Y)" },
      { code: "C03", title: "Convention or Code Exemption / Compliance Statements" },
      { code: "C04", title: "Cargo Ship Safety Construction Certificate (SAFCON)" },
      { code: "C05", title: "Cargo Ship Safety Equipment Certificate (SEC)" },
      { code: "C06", title: "+ Record of Equipment for the Cargo Ship SEC (Form E)" },
      { code: "C07", title: "Letter of Acceptance for ECDIS (where applicable)" }
    ]
  },
  {
    code: "D",
    title: "Radio (GMDSS)",
    items: [
      { code: "D01", title: "Cargo Ship Safety Radio Certificate (GMDSS)" },
      { code: "D02", title: "+ Record of Equipment for the Cargo Ship Radio (Form R)" },
      { code: "D03", title: "+ Record of Approved GMDSS Radio Installation" },
      { code: "D04", title: "+ Ship's Radio Station Licence" },
      { code: "D05", title: "+ EPIRB - Database Report" },
      { code: "D06", title: "+ Declaration of Shore Based Maintenance Certificate" },
      { code: "D07", title: "+ GMDSS Safety Radio Annual Survey Report - Class" },
      { code: "D08", title: "+ GMDSS Safety Radio Annual Survey Report - Approved Servicing Company" },
      { code: "D09", title: "+ EPIRB - Annual Test Report #" },
      { code: "D10", title: "+ Grab Bag EPIRB - Annual Test Report #" },
      { code: "D11", title: "+ Automatic Identification System (AIS) - Annual Test Report * #" },
      { code: "D12", title: "+ Search And Rescue Transponder (SART) - Annual Test Report #" },
      { code: "D13", title: "+ Long Range International Tracking (LRIT) Conformance Test Certificate *" },
      { code: "D14", title: "+ Radio Traffic Accounting Authority Services Agreement (SAT C etc)" }
    ],
    notes: [
      "* = Technically falling under the scope of the SEC rather than the SRC",
      "# = Usually part of the annual survey report"
    ]
  },
  {
    code: "E",
    title: "Loadline",
    items: [
      { code: "E01", title: "International Load Line Certificate" },
      { code: "E02", title: "+ Record of Conditions of Assignment - International Load Lines" },
      { code: "E03", title: "+ Last Light Ship Survey (5 yearly)" }
    ]
  },
  {
    code: "F",
    title: "Pollution (MARPOL)",
    items: [
      { code: "F01", title: "International Oil Pollution Prevention Certificate (IOPP) (MARPOL Annex 1)" },
      { code: "F02", title: "+ Record of Construction and Equipment (Form A)" },
      { code: "F03", title: "Statement of Approval for SOPEP" },
      { code: "F04", title: "Certificate of Calibration of OWS Oil Content Meter" },
      { code: "F05", title: "Statement of Compliance with USA CFR 33 sub O, part 151-159 (Pollution)" },
      { code: "F06", title: "International Air Pollution Prevention Certificate (IAPP) (MARPOL Annex VI)" },
      { code: "F07", title: "+ Record of Construction and Equipment for IAPP Certificate" },
      { code: "F08", title: "Main Engine EIAPP Certificate(s) (1 per engine unit)" },
      { code: "F08A", title: "+ Technical File appended to ME EIAPP" },
      { code: "F09", title: "+ Generator Engine EIAPP Certificate(s) (1 per Generator Engine unit)" },
      { code: "F09A", title: "+ Technical File appended to GE EIAPP" },
      { code: "F10", title: "International Sewage Pollution Prevention Certificate (ISPP) (MARPOL Annex IV)" },
      { code: "F10A", title: "+ Approved (Maximum Allowable) Discharge Rate Statement" },
      { code: "F11", title: "Anti-Fouling System Certificate of Compliance" },
      { code: "F12", title: "+ Record of Anti-Fouling System" },
      { code: "F13", title: "+ Type Approval Certificate of AFS applied (from paint manufacturer or shipyard)" },
      { code: "F14", title: "International Energy Efficiency Certificate (IEE Certificate)" },
      { code: "F15", title: "+ IEE Record of Construction" },
      { code: "F16", title: "Ballast Water Management (BWM) Certificate of Compliance" },
      { code: "F17", title: "Statement of Approval for Ballast Water Management Plan (BWMP)" }
    ]
  },
  {
    code: "G",
    title: "ISM, ISPS & MLC & STCW",
    items: [
      { code: "G01", title: "Safety Management Certificate (SMC)" },
      { code: "G02", title: "+ Copy of Document of Compliance (with ISM, from Management Company)" },
      { code: "G03", title: "+ ISM Clause 3.1 Declaration (from Owning Company appointing Manager)" },
      { code: "G04", title: "International Ship Security Certificate (ISSC)" },
      { code: "G05", title: "+ Ship Security Plan Approval Letter" },
      { code: "G06", title: "Continuous Synopsis Records (CSR) (All Issued Docs since #1)" },
      { code: "G07", title: "Maritime Labour Convention Certificate (MLC)" },
      { code: "G08", title: "Declaration of Maritime Labour Compliance - Part I (DMLC-I)" },
      { code: "G09", title: "Declaration of Maritime Labour Compliance - Part II (DMLC-II)" },
      { code: "G10", title: "Minimum Safe Manning Document (MSMD)" },
      { code: "G11", title: "+ MSMD Exemption or Dispensation Certificates" }
    ]
  },
  {
    code: "H",
    title: "GENERAL",
    items: [
      { code: "H01", title: "Ship Sanitation Control Exemption Certificate (SSCEC) (World Health Organisation)" },
      { code: "H02", title: "Magnetic Compass Deviation Card" },
      { code: "H03", title: "Annual Gyro Compass Service Report" },
      { code: "H04", title: "Nautical Chart and Publication Correction Service Subscription/Agreement" },
      { code: "H05", title: "ECDIS - Annual Subscription/Agreement for chart updates" },
      { code: "H06", title: "Regs-4-Yachts Subscription/Agreement" },
      { code: "H07", title: "(LR) Ship Emergency Response Service (SERS) Agreement or similar" },
      { code: "H08", title: "Medical Services Agreement + Medical Chest Certificate" },
      { code: "H09", title: "Lub Oil Analysis Agreement" },
      { code: "H10", title: "VSAT Broadband Agreement" },
      { code: "H11", title: "Record of Lifeboats, Tenders & Appurtenances" },
      { code: "H12", title: "RYA / PWC / Jetski Training Centre Certificate" },
      { code: "H13", title: "IRC Racing Certificate for Sailing Yachts" }
    ]
  },
  {
    code: "I",
    title: "OWNING COMPANY",
    items: [
      { code: "I01", title: "Bill of Sale" },
      { code: "I02", title: "VAT - Certificate of VAT Paid" },
      { code: "I03", title: "VAT Registration Certificate" },
      { code: "I04", title: "Captain's Letter of Authority (Power of Attorney)" },
      { code: "I05", title: "Company Documents: Certificates of Incorporation, Good Standing, etc" },
      { code: "I06", title: "Beneficial Owner's passport" }
    ]
  },
  {
    code: "J",
    title: "INSURANCE",
    items: [
      { code: "J01", title: "Hull & Machinery Policy" },
      { code: "J02", title: "Protection & Indemnity Policy" },
      { code: "J03", title: "P&I - Greece" },
      { code: "J04", title: "P&I - Italy" },
      { code: "J05", title: "P&I - Spain" },
      { code: "J06a", title: "Certificate of Insurance - MLC Clause (A) 2.5.2 (Seafarer Repatriation)" },
      { code: "J06b", title: "Certificate of Insurance - MLC Clause (A) 4.2.1 (Shipowners' Liability)" },
      { code: "J07", title: "Nairobi Wreck Removal Convention (NWRC) - Insurance Certificate (Flag)" },
      { code: "J07a", title: "NWRC - (P&I) Insurance Blue Card" },
      { code: "J08", title: "Civil Liability (for Bunk Oil Pollut'n Damage) Convent'n (CLC) - Insurance Cert (Flag)" },
      { code: "J08a", title: "CLC - (P&I) Insurance Blue Card" },
      { code: "J09", title: "Crew Medical & Travel Policy" }
    ]
  },
  {
    code: "K",
    title: "USA CRUISING",
    items: [
      { code: "K01", title: "Non-Tank Vessel Response Plan (NTVRP) (Federal)" },
      { code: "K02", title: "State Specific (Non-Tank) Vessel Response Plans (CA, OR, WA, AK)" },
      { code: "K03", title: "US Certificate of Financial Responsibility (CoFR)" },
      { code: "K04", title: "Certificate of Entry and Acceptance (from WQIS or other Insurer)" },
      { code: "K05", title: "Vessel General Permit (?)" },
      { code: "K06", title: "US Cruising Licences" },
      { code: "K07", title: "Cruising Licences Bahamas" }
    ]
  },
  {
    code: "L",
    title: "LSA & FFA Certificates",
    items: [
      { code: "L01a", title: "Liferaft Annual Inspection Certificate (one line per raft)" },
      { code: "L01b", title: "Liferaft Annual Inspection Certificate (one line per raft)" },
      { code: "L01c", title: "Liferaft Annual Inspection Certificate (one line per raft)" },
      { code: "L01d", title: "Liferaft Annual Inspection Certificate (one line per raft)" },
      { code: "L02a", title: "Liferaft - Hydrostatic Releases Expiry Date (one per raft)" },
      { code: "L02b", title: "Liferaft - Hydrostatic Releases Expiry Date (one per raft)" },
      { code: "L02c", title: "Liferaft - Hydrostatic Releases Expiry Date (one per raft)" },
      { code: "L02d", title: "Liferaft - Hydrostatic Releases Expiry Date (one per raft)" },
      { code: "L03", title: "Testing & Servicing of Rescue Boat" },
      { code: "L04", title: "Lifejackets (inflatable SOLAS) Annual Inspection Certificate" },
      { code: "L05", title: "Annual/Periodical Inspection Certificate for B.A Cylinders" },
      { code: "L06a", title: "Annual Inspection of EEBD (one line per EEBD)" },
      { code: "L06b", title: "Annual Inspection of EEBD (one line per EEBD)" },
      { code: "L06c", title: "Annual Inspection of EEBD (one line per EEBD)" },
      { code: "L06d", title: "Annual Inspection of EEBD (one line per EEBD)" },
      { code: "L06e", title: "Annual Inspection of EEBD (one line per EEBD)" },
      { code: "L07", title: "Inspection of Immersion suits" },
      { code: "L08a", title: "EPIRB (Float Free) - Hydrostatic Release (one per line)" },
      { code: "L08b", title: "EPIRB (Float Free) - Hydrostatic Release (one per line)" },
      { code: "L09a", title: "EPIRB Battery Expiry Date" },
      { code: "L09b", title: "EPIRB Battery Expiry Date" },
      { code: "L10", title: "Search And Rescue Transponder 1 & 2 (SART) Battery Expiry Date" },
      { code: "L11", title: "MOB smoke floats, handheld flares, rocket flares" },
      { code: "L12", title: "Multi Gas / O2 Detector (Entry into enclosed space)" },
      { code: "L13", title: "Single Gas Detector (Petrol Store)" },
      { code: "L14", title: "Annual Inspection of Fire Detection System" },
      { code: "L15", title: "Annual Inspection Hi-Fog / Ultra-Fog System" },
      { code: "L16", title: "Five Year Service Hi-Fog / Ultra-Fog System" },
      { code: "L17", title: "Hydrostatic Pressure Test Hi-Fog / Ultra-Fog System" },
      { code: "L18", title: "Weighing (content measuring) of Bottles Hi-Fog / Ultra-Fog System" },
      { code: "L19", title: "Annual Inspection of CO2 system" },
      { code: "L20", title: "Five Year Service CO2 system" },
      { code: "L21", title: "Hydrostatic Pressure Test CO2 System Cylinders" },
      { code: "L22", title: "Weighing (content measuring) of bottles CO2 System" },
      { code: "L23", title: "Annual/Periodical Inspection of NOVEC Extinguishing System" },
      { code: "L24", title: "Annual/Periodical Inspection of Fixed Galley Ducting Fire Suppresion System" },
      { code: "L25", title: "Inspection of Portable Fire Extinguishers" },
      { code: "L26", title: "Hydrostatic Pressure Test of Portable extinguishers (pressurised models only)" }
    ]
  },
  {
    code: "M",
    title: "Lifting Appliances",
    items: [
      { kind: "section", title: "Rescue Boat Crane" },
      { code: "M01", title: "Annual Testing & Servicing of Crane #1, Lifting strops and Hooks service certificate" },
      { code: "M02", title: "5 Yearly Testing & Servicing of Crane #1, Lifting strops and Hooks service certificate" },
      { code: "M03", title: "Type Approval Rescue Boat, Outboard, Cable, Hook" },
      { code: "M04", title: "Pad Eye Load Test (not compulsory)" },
      { kind: "section", title: "Trackways and Cars" },
      { code: "M05", title: "Annual Testing & Servicing certificates for Trackways and Cars" },
      { code: "M06", title: "5 Yearly Testing & Servicing certificates for Trackways and Cars" },
      { kind: "section", title: "Side Boarding Ladder" },
      { code: "M07", title: "Annual Testing & Servicing of Ladder" },
      { code: "M08", title: "5 Yearly Testing & Servicing of Ladder" },
      { kind: "section", title: "Passerelle" },
      { code: "M09", title: "Annual Testing & Servicing of Passerelle" },
      { code: "M10", title: "5 Yearly Testing & Servicing of Passerelle" },
      { kind: "section", title: "Lifts" },
      { code: "M11", title: "Annual Testing & Servicing of Passenger lift" },
      { code: "M12", title: "Annual Testing & Servicing of food lift" },
      { kind: "section", title: "SCUBA Diving Equipment" },
      { code: "M13", title: "Annual Service Diving Compressor" },
      { code: "M14", title: "Annual Air Sample Analysis" },
      { code: "M15", title: "5 Yearly Hydrostatic Pressure Test SCUBA bottles" }
    ]
  },
  {
    code: "1",
    title: "Loadline",
    items: [
      { code: "1.a", title: "Stability Information Booklets (Approved by Class for Flag) - Intact" },
      { code: "1.b", title: "Stability Information Booklets (Approved by Class for Flag) - Damaged" }
    ]
  },
  {
    code: "2",
    title: "Pollution (MARPOL)",
    items: [
      { code: "2.a", title: "SOPEP" },
      { code: "2.b", title: "Technical Data Files (for EIAPP Certificates)" },
      { code: "2.c", title: "SEEMP" }
    ]
  },
  {
    code: "3",
    title: "Plans",
    items: [
      { code: "3.a", title: "Fire Control and Safety Plans" },
      { code: "3.b", title: "Pumping and Piping Plan/Schematic" },
      { code: "3.c", title: "General Arrangement" },
      { code: "3.d", title: "Tank Capacity Plan" },
      { code: "3.e", title: "Docking Plan" }
    ]
  },
  {
    code: "4",
    title: "Other",
    items: [
      { code: "4.a", title: "Emergency Towing Booklet (3 copies on board)" },
      { code: "4.b", title: "SERS" },
      { code: "4.c", title: "Survey Reports" }
    ]
  },
  {
    code: "5",
    title: "Special Considerations for USA Cruising",
    items: [
      { code: "5.a", title: "Non Tank Vessel Response Plan (NTVRP)" }
    ]
  },
  {
    code: "6",
    title: "ISM & ISPS",
    items: [
      { code: "6.a", title: "Ship Security Plan & Assessment + Annual Review" }
    ]
  }
];
