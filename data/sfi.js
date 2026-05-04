// SFI Asset Register data for Sea Wolf X
// Certificate branch moved to data/certificates.js
// Equipment hierarchy shifted up after moving certificate records to their own page
window.SFI_GROUPS = [
  {
    "code": "01",
    "name": "Hull, Tanks & Structure",
    "icon": "box",
    "count": 163,
    "children": [
      {
        "code": "01.3",
        "name": "Cathodic Protection & Antifouling",
        "count": 1
      },
      {
        "code": "01.5",
        "name": "Doors",
        "count": 39,
        "children": [
          {
            "code": "01.5.1",
            "name": "Watertight & External Doors",
            "count": 11
          },
          {
            "code": "01.5.2",
            "name": "Fire & WT Doors",
            "count": 2
          },
          {
            "code": "01.5.3",
            "name": "Bulwark Doors",
            "count": 7
          },
          {
            "code": "01.5.4",
            "name": "Hatches",
            "count": 19
          }
        ]
      },
      {
        "code": "01.6",
        "name": "Deck Hatches & Access",
        "count": 48,
        "children": [
          {
            "code": "01.6.1",
            "name": "Handrails & Guard Rails",
            "count": 4
          },
          {
            "code": "01.6.2",
            "name": "Hatches — External Access",
            "count": 42
          }
        ]
      },
      {
        "code": "01.8",
        "name": "Tanks & Probes",
        "count": 59,
        "children": [
          {
            "code": "01.8.1",
            "name": "Tanks — Fuel Oil",
            "count": 8
          },
          {
            "code": "01.8.2",
            "name": "Tanks — Fresh Water",
            "count": 4
          },
          {
            "code": "01.8.4",
            "name": "Tanks — Grey/Black Water & Scupper",
            "count": 7
          },
          {
            "code": "01.8.5",
            "name": "Tanks — Oils, Sludge & Bilge Water",
            "count": 8
          },
          {
            "code": "01.8.7",
            "name": "Tanks — Technical & Non-Potable Water",
            "count": 1
          }
        ]
      },
      {
        "code": "01.9",
        "name": "Cathodic Protection",
        "count": 12,
        "children": [
          {
            "code": "01.9.1",
            "name": "Cathodic Protection — Hull Anodes",
            "count": 10
          },
          {
            "code": "01.9.2",
            "name": "Cathodic Protection — Monitoring System",
            "count": 2
          }
        ]
      }
    ]
  },
  {
    "code": "02",
    "name": "Machinery — Propulsion",
    "icon": "gauge",
    "count": 40,
    "children": [
      {
        "code": "02.1",
        "name": "Engines & Generators",
        "count": 28
      },
      {
        "code": "02.2",
        "name": "Diesel Generator Sets",
        "count": 6
      },
      {
        "code": "02.3",
        "name": "Propulsion — Gearboxes",
        "count": 2
      },
      {
        "code": "02.4",
        "name": "Shaftline",
        "count": 10,
        "children": [
          {
            "code": "02.4.1",
            "name": "Shaftline — Propulsion Motors (PEM)",
            "count": 2
          },
          {
            "code": "02.4.2",
            "name": "Shaftline — Propellers",
            "count": 2
          },
          {
            "code": "02.4.3",
            "name": "Shaftline — Shafts & Couplings",
            "count": 3
          },
          {
            "code": "02.4.4",
            "name": "Shaftline — Shaft Bearings",
            "count": 2
          },
          {
            "code": "02.4.5",
            "name": "Shaftline — Shaft Seals",
            "count": 1
          }
        ]
      },
      {
        "code": "02.5",
        "name": "Steering & Exhaust",
        "count": 6,
        "children": [
          {
            "code": "02.5.2",
            "name": "Steering — Gear Actuators",
            "count": 2
          },
          {
            "code": "02.5.3",
            "name": "Steering — Control Cabinets",
            "count": 2
          }
        ]
      },
      {
        "code": "02.6",
        "name": "Bow Thrusters",
        "count": 6,
        "children": [
          {
            "code": "02.6.1",
            "name": "Bow Thrusters — Motors",
            "count": 2
          },
          {
            "code": "02.6.2",
            "name": "Bow Thrusters — Power Units",
            "count": 2
          },
          {
            "code": "02.6.3",
            "name": "Bow Thrusters — Retracting Mechanisms",
            "count": 2
          }
        ]
      },
      {
        "code": "02.7",
        "name": "Gearboxes & Flexible Couplings",
        "count": 6
      },
      {
        "code": "02.8",
        "name": "Exhaust",
        "count": 4,
        "children": [
          {
            "code": "02.8.1",
            "name": "Exhaust — Diesel Particulate Filters (DPF)",
            "count": 2
          },
          {
            "code": "02.8.2",
            "name": "Exhaust — Mufflers",
            "count": 2
          }
        ]
      }
    ]
  },
  {
    "code": "03",
    "name": "Auxiliary Systems",
    "icon": "pipe",
    "count": 162,
    "children": [
      {
        "code": "03.1",
        "name": "Fuel Transfer",
        "count": 11,
        "children": [
          {
            "code": "03.1.1",
            "name": "Fuel Transfer — Powered Pumps",
            "count": 4
          },
          {
            "code": "03.1.2",
            "name": "Fuel Transfer — Manual Pumps",
            "count": 4
          },
          {
            "code": "03.1.3",
            "name": "Fuel Transfer — Tender Refill",
            "count": 2
          }
        ]
      },
      {
        "code": "03.2",
        "name": "Fuel Treatment",
        "count": 6,
        "children": [
          {
            "code": "03.2.1",
            "name": "Fuel Treatment — Purifier & Feed Pump",
            "count": 3
          },
          {
            "code": "03.2.2",
            "name": "Fuel Treatment — Pre-Filters (Racor)",
            "count": 3
          }
        ]
      },
      {
        "code": "03.3",
        "name": "Lube Oil",
        "count": 9,
        "children": [
          {
            "code": "03.3.1",
            "name": "Lube Oil — Clean LO Pumps",
            "count": 4
          },
          {
            "code": "03.3.2",
            "name": "Lube Oil — Dirty LO Pumps",
            "count": 4
          },
          {
            "code": "03.3.3",
            "name": "Lube Oil — Valves",
            "count": 1
          }
        ]
      },
      {
        "code": "03.4",
        "name": "Sea Water",
        "count": 30,
        "children": [
          {
            "code": "03.4.1",
            "name": "Sea Water — Main & AC Sea Strainers",
            "count": 14
          },
          {
            "code": "03.4.2",
            "name": "Sea Water — AC Chiller Pumps",
            "count": 4
          },
          {
            "code": "03.4.3",
            "name": "Sea Water — BT & Switchboard Cooling Pumps",
            "count": 4
          },
          {
            "code": "03.4.4",
            "name": "Sea Water — Gearbox & Shaft Seal Cooling",
            "count": 2
          },
          {
            "code": "03.4.5",
            "name": "Sea Water — Watermaker Feed Pumps",
            "count": 4
          },
          {
            "code": "03.4.6",
            "name": "Sea Water — Sewage Plant Supply",
            "count": 1
          },
          {
            "code": "03.4.7",
            "name": "Sea Water — System Valves",
            "count": 1
          }
        ]
      },
      {
        "code": "03.5",
        "name": "Glycol",
        "count": 8,
        "children": [
          {
            "code": "03.5.1",
            "name": "Glycol — PEM Cooling Pumps",
            "count": 4
          },
          {
            "code": "03.5.2",
            "name": "Glycol — Bow Thruster Cooling Pumps",
            "count": 2
          },
          {
            "code": "03.5.3",
            "name": "Glycol — Switchboard Cooling Pumps",
            "count": 2
          }
        ]
      },
      {
        "code": "03.6",
        "name": "Heat Exchangers",
        "count": 3
      },
      {
        "code": "03.7",
        "name": "Compressed Air System",
        "count": 14
      },
      {
        "code": "03.8",
        "name": "Breathing Air System",
        "count": 11
      },
      {
        "code": "03.9",
        "name": "Bilge System",
        "count": 44,
        "children": [
          {
            "code": "03.9.1",
            "name": "Bilge — Main/Fire Pumps",
            "count": 15
          },
          {
            "code": "03.9.2",
            "name": "Bilge — Bow Bilge",
            "count": 9
          },
          {
            "code": "03.9.3",
            "name": "Bilge — Garage Bilge Pumps",
            "count": 6
          },
          {
            "code": "03.9.4",
            "name": "Bilge — Tank Discharge",
            "count": 8
          },
          {
            "code": "03.9.5",
            "name": "Bilge — Valves",
            "count": 3
          },
          {
            "code": "03.9.6",
            "name": "Bilge — System Valves",
            "count": 3
          }
        ]
      },
      {
        "code": "03.10",
        "name": "Oily Water Separator",
        "count": 2
      },
      {
        "code": "03.12",
        "name": "Hydraulic Systems",
        "count": 16
      },
      {
        "code": "03.13",
        "name": "Engine Room Ventilation",
        "count": 8
      }
    ]
  },
  {
    "code": "04",
    "name": "Electrical",
    "icon": "bolt",
    "count": 71,
    "children": [
      {
        "code": "04.1",
        "name": "Battery Packs",
        "count": 29,
        "children": [
          {
            "code": "04.1.1",
            "name": "Battery Packs — Emergency",
            "count": 3
          },
          {
            "code": "04.1.2",
            "name": "Battery Packs — Generator Start",
            "count": 3
          },
          {
            "code": "04.1.3",
            "name": "Battery Packs — Radio",
            "count": 3
          },
          {
            "code": "04.1.4",
            "name": "Battery Packs — Service / Hotel",
            "count": 3
          },
          {
            "code": "04.1.5",
            "name": "Battery Packs — Rescue Hydraulic",
            "count": 3
          },
          {
            "code": "04.1.6",
            "name": "Battery Packs — EFP Start",
            "count": 4
          },
          {
            "code": "04.1.7",
            "name": "Battery Packs — Main Propulsion",
            "count": 10
          }
        ]
      },
      {
        "code": "04.2",
        "name": "Battery Chargers",
        "count": 2,
        "children": [
          {
            "code": "04.2.7",
            "name": "Battery Chargers — Main Propulsion",
            "count": 2
          }
        ]
      },
      {
        "code": "04.4",
        "name": "UPS Systems",
        "count": 3,
        "children": [
          {
            "code": "04.4.1",
            "name": "UPS — AV / IT Rack",
            "count": 1
          },
          {
            "code": "04.4.2",
            "name": "UPS — Electric Sliding Doors",
            "count": 1
          },
          {
            "code": "04.4.3",
            "name": "UPS — Steering",
            "count": 1
          }
        ]
      },
      {
        "code": "04.5",
        "name": "Shore Power",
        "count": 10,
        "children": [
          {
            "code": "04.5.1",
            "name": "Shore Power — Cable Reel & Converter",
            "count": 2
          },
          {
            "code": "04.5.2",
            "name": "Shore Power — Siemens Distribution & DC Bus",
            "count": 7
          }
        ]
      },
      {
        "code": "04.6",
        "name": "Transformers",
        "count": 4
      },
      {
        "code": "04.8",
        "name": "Battery Locker & Underwater Lights",
        "count": 22,
        "children": [
          {
            "code": "04.8.2",
            "name": "Underwater Lights — Light Fittings",
            "count": 16
          }
        ]
      },
      {
        "code": "04.9",
        "name": "Electrical — Cooling",
        "count": 1
      }
    ]
  },
  {
    "code": "05",
    "name": "HVAC & Refrigeration",
    "icon": "snow",
    "count": 68,
    "children": [
      {
        "code": "05.1",
        "name": "Chiller Units",
        "count": 4
      },
      {
        "code": "05.2",
        "name": "Chilled Water System",
        "count": 8,
        "children": [
          {
            "code": "05.2.1",
            "name": "Chilled Water — Circulation Pumps",
            "count": 3
          },
          {
            "code": "05.2.2",
            "name": "Chilled Water — Expansion Vessels",
            "count": 3
          },
          {
            "code": "05.2.3",
            "name": "Chilled Water — Dirt Collector",
            "count": 1
          }
        ]
      },
      {
        "code": "05.3",
        "name": "Fan Coils",
        "count": 16,
        "children": [
          {
            "code": "05.3.1",
            "name": "Fan Coils — Crew Areas",
            "count": 6
          },
          {
            "code": "05.3.2",
            "name": "Fan Coils — Guest Cabins",
            "count": 4
          },
          {
            "code": "05.3.3",
            "name": "Fan Coils — Guest & Owner Spaces",
            "count": 4
          },
          {
            "code": "05.3.4",
            "name": "Fan Coils — Bridge & Wheelhouse",
            "count": 1
          },
          {
            "code": "05.3.5",
            "name": "Fan Coils — Technical Spaces",
            "count": 1
          }
        ]
      },
      {
        "code": "05.4",
        "name": "HVAC — Chillers",
        "count": 7
      },
      {
        "code": "05.5",
        "name": "Air Extraction & Ventilation",
        "count": 23
      },
      {
        "code": "05.6",
        "name": "Freezers & Ice Makers",
        "count": 3,
        "children": [
          {
            "code": "05.6.1",
            "name": "Freezers",
            "count": 2
          },
          {
            "code": "05.6.2",
            "name": "Ice Makers",
            "count": 1
          }
        ]
      },
      {
        "code": "05.7",
        "name": "Refrigerators",
        "count": 7,
        "children": [
          {
            "code": "05.7.1",
            "name": "Refrigerators — Galley",
            "count": 3
          },
          {
            "code": "05.7.2",
            "name": "Refrigerators — Bar, Pantry & Deck",
            "count": 3
          },
          {
            "code": "05.7.3",
            "name": "Refrigerators — Crew",
            "count": 1
          }
        ]
      }
    ]
  },
  {
    "code": "06",
    "name": "Fresh Water, Sewage & Pool",
    "icon": "droplet",
    "count": 74,
    "children": [
      {
        "code": "06.1",
        "name": "Watermakers (Reverse Osmosis)",
        "count": 2
      },
      {
        "code": "06.2",
        "name": "Cold Water",
        "count": 18,
        "children": [
          {
            "code": "06.2.1",
            "name": "Cold Water — Pressure Pumps",
            "count": 7
          },
          {
            "code": "06.2.2",
            "name": "Cold Water — Expansion Tank & Filters",
            "count": 6
          },
          {
            "code": "06.2.3",
            "name": "Cold Water — Mixers & Thermostats",
            "count": 3
          },
          {
            "code": "06.2.4",
            "name": "Cold Water — System Valves",
            "count": 1
          }
        ]
      },
      {
        "code": "06.3",
        "name": "Hot Water & Watermaker",
        "count": 8,
        "children": [
          {
            "code": "06.3.1",
            "name": "Hot Water — Boilers",
            "count": 4
          },
          {
            "code": "06.3.3",
            "name": "Hot Water — Circulation Pumps",
            "count": 2
          },
          {
            "code": "06.3.4",
            "name": "Hot Water — System Valves",
            "count": 1
          }
        ]
      },
      {
        "code": "06.4",
        "name": "Water Treatment & Conditioning",
        "count": 9
      },
      {
        "code": "06.5",
        "name": "Pool & Spa Systems",
        "count": 16,
        "children": [
          {
            "code": "06.5.1",
            "name": "Pool — Pumps",
            "count": 2
          },
          {
            "code": "06.5.2",
            "name": "Pool — Heaters",
            "count": 3
          },
          {
            "code": "06.5.3",
            "name": "Pool — Filter & UV",
            "count": 8
          },
          {
            "code": "06.5.4",
            "name": "Pool — System Valves",
            "count": 1
          }
        ]
      },
      {
        "code": "06.6",
        "name": "Shore Services & Sewage",
        "count": 11,
        "children": [
          {
            "code": "06.6.1",
            "name": "Sewage — Treatment Plant",
            "count": 1
          },
          {
            "code": "06.6.2",
            "name": "Sewage — UV Sterilisers",
            "count": 2
          },
          {
            "code": "06.6.3",
            "name": "Sewage — External Booster Pump",
            "count": 1
          },
          {
            "code": "06.6.4",
            "name": "Sewage — Valves",
            "count": 2
          }
        ]
      },
      {
        "code": "06.7",
        "name": "Waste Water",
        "count": 6,
        "children": [
          {
            "code": "06.7.1",
            "name": "Waste Water — Black Water Discharge Pumps",
            "count": 2
          },
          {
            "code": "06.7.2",
            "name": "Waste Water — Black Water Transfer Pump",
            "count": 1
          },
          {
            "code": "06.7.3",
            "name": "Waste Water — Jets Pumps",
            "count": 2
          },
          {
            "code": "06.7.4",
            "name": "Waste Water — Sewage Feeder Pump",
            "count": 1
          }
        ]
      },
      {
        "code": "06.8",
        "name": "Fresh Water & Toilets",
        "count": 4,
        "children": [
          {
            "code": "06.8.1",
            "name": "Toilets — Crew",
            "count": 1
          },
          {
            "code": "06.8.2",
            "name": "Toilets — Guest",
            "count": 1
          },
          {
            "code": "06.8.3",
            "name": "Vacuum Collection Tanks (Jets Tank)",
            "count": 1
          }
        ]
      }
    ]
  },
  {
    "code": "07",
    "name": "Safety, Fire & Security",
    "icon": "fire",
    "count": 194,
    "children": [
      {
        "code": "07.1",
        "name": "Fire Detection",
        "count": 64,
        "children": [
          {
            "code": "07.1.1",
            "name": "Fire Detection — Detection Devices",
            "count": 15
          },
          {
            "code": "07.1.2",
            "name": "Emergency Lighting — Escape Routes",
            "count": 27
          },
          {
            "code": "07.1.3",
            "name": "Fire Detection — Sounders, Panels & Control",
            "count": 20
          }
        ]
      },
      {
        "code": "07.2",
        "name": "Fire Suppression",
        "count": 3,
        "children": [
          {
            "code": "07.2.3",
            "name": "Fire Suppression — Novec / Gas",
            "count": 1
          },
          {
            "code": "07.2.4",
            "name": "Fire Suppression — MAS Activation System",
            "count": 1
          }
        ]
      },
      {
        "code": "07.3",
        "name": "Life-Saving — Rings",
        "count": 8
      },
      {
        "code": "07.4",
        "name": "LSA — Fire Fighting Equipment",
        "count": 38
      },
      {
        "code": "07.5",
        "name": "Fire Detection — Panels",
        "count": 26,
        "children": [
          {
            "code": "07.5.1",
            "name": "Fire Detection — Main Panel",
            "count": 4
          },
          {
            "code": "07.5.2",
            "name": "Fire Detection — Alarm Devices",
            "count": 5
          },
          {
            "code": "07.5.3",
            "name": "Fire Detection — Detectors",
            "count": 8
          },
          {
            "code": "07.5.4",
            "name": "Fire Detection — Call Points",
            "count": 3
          },
          {
            "code": "07.5.5",
            "name": "Fire Detection — Sounders & Alarms",
            "count": 6
          }
        ]
      },
      {
        "code": "07.6",
        "name": "CCTV & Fixed Gas Suppression",
        "count": 11,
        "children": [
          {
            "code": "07.6.1",
            "name": "Fixed Gas Suppression — ER",
            "count": 1
          },
          {
            "code": "07.6.2",
            "name": "Fixed Gas Suppression — ER",
            "count": 2
          },
          {
            "code": "07.6.3",
            "name": "Fixed Gas Suppression — ER",
            "count": 2
          },
          {
            "code": "07.6.4",
            "name": "Fixed Gas Suppression — ER",
            "count": 1
          },
          {
            "code": "07.6.5",
            "name": "Fixed Gas Suppression — ER",
            "count": 2
          },
          {
            "code": "07.6.6",
            "name": "Fixed Gas Suppression — ER",
            "count": 1
          }
        ]
      },
      {
        "code": "07.7",
        "name": "Fire Boundaries",
        "count": 24,
        "children": [
          {
            "code": "07.7.1",
            "name": "Fire Boundaries — Fire Doors",
            "count": 3
          },
          {
            "code": "07.7.2",
            "name": "Fire Boundaries — Dampers (Machinery Spaces)",
            "count": 5
          },
          {
            "code": "07.7.3",
            "name": "Fire Boundaries — Dampers (Service Spaces)",
            "count": 15
          }
        ]
      }
    ]
  },
  {
    "code": "08",
    "name": "Navigation & Communications",
    "icon": "compass",
    "count": 166,
    "children": [
      {
        "code": "08.1",
        "name": "Radar & Navigation Displays",
        "count": 36
      },
      {
        "code": "08.2",
        "name": "Compass — Antennas",
        "count": 11
      },
      {
        "code": "08.3",
        "name": "GPS & GNSS — Antennas",
        "count": 8
      },
      {
        "code": "08.4",
        "name": "AIS & Antennas",
        "count": 12,
        "children": [
          {
            "code": "08.4.1",
            "name": "Antennas — Marine & Coastal",
            "count": 3
          },
          {
            "code": "08.4.2",
            "name": "Antennas — 5G / LTE",
            "count": 2
          },
          {
            "code": "08.4.3",
            "name": "Antennas — Junction & Connection Equipment",
            "count": 2
          }
        ]
      },
      {
        "code": "08.5",
        "name": "GMDSS & Communications",
        "count": 51
      },
      {
        "code": "08.6",
        "name": "Autopilot & Steering",
        "count": 11
      },
      {
        "code": "08.7",
        "name": "Navigation Sensors & Transducers",
        "count": 7
      },
      {
        "code": "08.8",
        "name": "Meteorological Instruments",
        "count": 5
      },
      {
        "code": "08.9",
        "name": "Navigation Lights",
        "count": 25
      }
    ]
  },
  {
    "code": "09",
    "name": "AV, IT & Bridge",
    "icon": "monitor",
    "count": 69,
    "children": [
      {
        "code": "09.1",
        "name": "Audio Systems",
        "count": 28,
        "children": [
          {
            "code": "09.1.1",
            "name": "Audio — Amplifiers & Processors",
            "count": 6
          },
          {
            "code": "09.1.2",
            "name": "Audio — Speakers & Subwoofers",
            "count": 11
          },
          {
            "code": "09.1.3",
            "name": "Audio — Source & Streaming Equipment",
            "count": 2
          }
        ]
      },
      {
        "code": "09.2",
        "name": "Video & Display Systems",
        "count": 15,
        "children": [
          {
            "code": "09.2.1",
            "name": "Video — TV Sets",
            "count": 6
          },
          {
            "code": "09.2.2",
            "name": "Video — Projectors & Screens",
            "count": 3
          },
          {
            "code": "09.2.3",
            "name": "Video — Monitors & Touch Displays",
            "count": 2
          },
          {
            "code": "09.2.4",
            "name": "Video — Source Equipment",
            "count": 3
          }
        ]
      },
      {
        "code": "09.3",
        "name": "Networking & IT Infrastructure",
        "count": 3
      },
      {
        "code": "09.4",
        "name": "Lighting Automation & Control",
        "count": 9
      },
      {
        "code": "09.6",
        "name": "CCTV — Mast/Rollbar",
        "count": 11
      },
      {
        "code": "09.7",
        "name": "Comms — Cellular/WiFi",
        "count": 3
      }
    ]
  },
  {
    "code": "10",
    "name": "Deck Equipment",
    "icon": "anchor",
    "count": 38,
    "children": [
      {
        "code": "10.1",
        "name": "Anchoring Equipment",
        "count": 5
      },
      {
        "code": "10.2",
        "name": "Mooring Equipment",
        "count": 6
      },
      {
        "code": "10.3",
        "name": "Cranes & Davits",
        "count": 2
      },
      {
        "code": "10.4",
        "name": "Passerelle & Boarding Equipment",
        "count": 7
      },
      {
        "code": "10.6",
        "name": "Awnings & Covers",
        "count": 4
      },
      {
        "code": "10.7",
        "name": "Hydraulic Power Units",
        "count": 12
      },
      {
        "code": "10.9",
        "name": "Deck Equipment — Lights",
        "count": 2
      }
    ]
  },
  {
    "code": "11",
    "name": "Tenders & Craft",
    "icon": "boat",
    "count": 15,
    "children": [
      {
        "code": "11.1",
        "name": "Limo Tender (Castoldi)",
        "count": 3
      },
      {
        "code": "11.2",
        "name": "Sport Tender",
        "count": 5
      },
      {
        "code": "11.3",
        "name": "Chase Boat",
        "count": 2
      },
      {
        "code": "11.4",
        "name": "Rescue / MOB Boat",
        "count": 5
      }
    ]
  },
  {
    "code": "12",
    "name": "Galley & Hospitality",
    "icon": "cup",
    "count": 29,
    "children": [
      {
        "code": "12.1",
        "name": "Galley Appliances",
        "count": 11
      },
      {
        "code": "12.2",
        "name": "Galley — Cooking Equipment",
        "count": 9
      },
      {
        "code": "12.3",
        "name": "Galley — Dishwashing",
        "count": 3
      },
      {
        "code": "12.4",
        "name": "Laundry Appliances",
        "count": 5
      },
      {
        "code": "12.5",
        "name": "Crew Mess Appliances",
        "count": 1
      }
    ]
  },
  {
    "code": "13",
    "name": "Accommodation & Interior",
    "icon": "bed",
    "count": 0
  },
  {
    "code": "14",
    "name": "Medical & Health",
    "icon": "cross",
    "count": 0
  },
  {
    "code": "15",
    "name": "Aviation & Helideck",
    "icon": "helicopter",
    "count": 0
  },
  {
    "code": "16",
    "name": "Engineering Inventory",
    "icon": "wrench",
    "count": 2,
    "children": [
      {
        "code": "16.1",
        "name": "Engineering — Tools & Test Equipment",
        "count": 1
      },
      {
        "code": "16.2",
        "name": "Engineering — Electrical Equipment",
        "count": 1
      }
    ]
  },
  {
    "code": "17",
    "name": "Deck Inventory",
    "icon": "box",
    "count": 0
  },
  {
    "code": "18",
    "name": "Interior Inventory",
    "icon": "box",
    "count": 0
  },
  {
    "code": "19",
    "name": "Galley Inventory",
    "icon": "box",
    "count": 0
  },
  {
    "code": "20",
    "name": "Laundry Inventory",
    "icon": "box",
    "count": 4,
    "children": [
      {
        "code": "20.1",
        "name": "Laundry — Washing Machines",
        "count": 2
      },
      {
        "code": "20.2",
        "name": "Laundry — Tumble Dryers",
        "count": 2
      }
    ]
  }
];

// Sample assets for Engines & Generators (02.1)
window.SFI_ASSETS_SAMPLE = [
  {
    "id": "02.1.001",
    "sfi": "02.1.001",
    "name": "Main Engine — Port",
    "mfr": "MTU",
    "model": "16V 4000 M93L",
    "serial": "538122-014",
    "location": "Engine Room — Port",
    "status": "operational",
    "running_hrs": 4218,
    "manuals": 3,
    "tasks_open": 1,
    "certs": 2,
    "spares": 47,
    "last_service": "2026-03-12"
  },
  {
    "id": "02.1.002",
    "sfi": "02.1.002",
    "name": "Main Engine — Starboard",
    "mfr": "MTU",
    "model": "16V 4000 M93L",
    "serial": "538122-015",
    "location": "Engine Room — Stbd",
    "status": "operational",
    "running_hrs": 4231,
    "manuals": 3,
    "tasks_open": 0,
    "certs": 2,
    "spares": 47,
    "last_service": "2026-03-12"
  },
  {
    "id": "02.1.003",
    "sfi": "02.1.003",
    "name": "Generator 1 (Port)",
    "mfr": "MASE",
    "model": "IS 44",
    "serial": "M44-2018-0421",
    "location": "Engine Room — Port",
    "status": "operational",
    "running_hrs": 8412,
    "manuals": 2,
    "tasks_open": 2,
    "certs": 1,
    "spares": 23,
    "last_service": "2026-02-04"
  },
  {
    "id": "02.1.004",
    "sfi": "02.1.004",
    "name": "Generator 2 (Starboard)",
    "mfr": "MASE",
    "model": "IS 44",
    "serial": "M44-2018-0422",
    "location": "Engine Room — Stbd",
    "status": "operational",
    "running_hrs": 8367,
    "manuals": 2,
    "tasks_open": 0,
    "certs": 1,
    "spares": 23,
    "last_service": "2026-02-04"
  },
  {
    "id": "02.1.005",
    "sfi": "02.1.005",
    "name": "Emergency Generator",
    "mfr": "Volvo Penta",
    "model": "D5A T",
    "serial": "VP-441-2018",
    "location": "Aft — Tech Compartment",
    "status": "maintenance",
    "running_hrs": 612,
    "manuals": 1,
    "tasks_open": 4,
    "certs": 1,
    "spares": 12,
    "last_service": "2026-04-21"
  },
  {
    "id": "02.1.006",
    "sfi": "02.1.006",
    "name": "Day Tank Transfer Pump A",
    "mfr": "Allweiler",
    "model": "TRA-25",
    "serial": "AW-2018-1142",
    "location": "Engine Room — Port",
    "status": "operational",
    "running_hrs": 2105,
    "manuals": 1,
    "tasks_open": 0,
    "certs": 0,
    "spares": 8,
    "last_service": "2025-11-18"
  },
  {
    "id": "02.1.007",
    "sfi": "02.1.007",
    "name": "Engine Mount — Port FWD",
    "mfr": "CMP",
    "model": "AVM-450",
    "serial": "CMP-450-A1",
    "location": "Engine Room — Port",
    "status": "operational",
    "running_hrs": null,
    "manuals": 1,
    "tasks_open": 0,
    "certs": 0,
    "spares": 4,
    "last_service": "2025-09-02"
  },
  {
    "id": "02.1.008",
    "sfi": "02.1.008",
    "name": "Engine Mount — Port AFT",
    "mfr": "CMP",
    "model": "AVM-450",
    "serial": "CMP-450-A2",
    "location": "Engine Room — Port",
    "status": "operational",
    "running_hrs": null,
    "manuals": 1,
    "tasks_open": 0,
    "certs": 0,
    "spares": 4,
    "last_service": "2025-09-02"
  },
  {
    "id": "02.1.009",
    "sfi": "02.1.009",
    "name": "Engine Mount — Stbd FWD",
    "mfr": "CMP",
    "model": "AVM-450",
    "serial": "CMP-450-B1",
    "location": "Engine Room — Stbd",
    "status": "operational",
    "running_hrs": null,
    "manuals": 1,
    "tasks_open": 0,
    "certs": 0,
    "spares": 4,
    "last_service": "2025-09-02"
  },
  {
    "id": "02.1.010",
    "sfi": "02.1.010",
    "name": "Engine Mount — Stbd AFT",
    "mfr": "CMP",
    "model": "AVM-450",
    "serial": "CMP-450-B2",
    "location": "Engine Room — Stbd",
    "status": "fault",
    "running_hrs": null,
    "manuals": 1,
    "tasks_open": 1,
    "certs": 0,
    "spares": 4,
    "last_service": "2025-09-02"
  },
  {
    "id": "02.1.011",
    "sfi": "02.1.011",
    "name": "Genset Sound Shield A",
    "mfr": "MASE",
    "model": "SH-44",
    "serial": "—",
    "location": "Engine Room — Port",
    "status": "operational",
    "running_hrs": null,
    "manuals": 1,
    "tasks_open": 0,
    "certs": 0,
    "spares": 0,
    "last_service": "—"
  },
  {
    "id": "02.1.012",
    "sfi": "02.1.012",
    "name": "Genset Sound Shield B",
    "mfr": "MASE",
    "model": "SH-44",
    "serial": "—",
    "location": "Engine Room — Stbd",
    "status": "operational",
    "running_hrs": null,
    "manuals": 1,
    "tasks_open": 0,
    "certs": 0,
    "spares": 0,
    "last_service": "—"
  }
];

window.SHIP_INFO = {
  "name": "Sea Wolf X",
  "org": "SeaWolfX",
  "imo": "1234567",
  "build": 2018,
  "loa": "52.4 m",
  "flag": "Cayman Islands",
  "total_assets": 2247,
  "total_metrics": 1207,
  "total_documents": 172
};
