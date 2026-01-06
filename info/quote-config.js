// SkyShield Booking Calculator - Pricing Configuration
// Last updated: 2025-01-06

const QUOTE_CONFIG = {
  // Base package
  base: {
    price: 7500,
    hours: 8,
    teams: 1
  },

  // Extra time/team pricing
  extra_hour_price: 750,                // $/hour per team after base 8 hours
  extra_team_price: 6000,               // $ per additional team (for base 8-hour window)

  // Travel from Austin, TX
  travel: {
    included_miles: 30,                 // one-way from Austin
    per_mile: 2.50,                     // per mile after included (one-way)
    minimum: 150                        // minimum overage fee
  },

  // Night operations (after sunset)
  night_ops_fee: 1500,

  // Deposit
  deposit: {
    enabled: true,
    percent: 25
  },

  // Limits
  limits: {
    min_hours: 4,
    max_hours: 16
  },

  // Team recommendation thresholds (acres per team)
  team_heuristic: {
    by_acres: {
      low: 6,       // 1 team per 6 acres
      medium: 4,    // 1 team per 4 acres
      high: 3       // 1 team per 3 acres
    },
    by_perimeter_miles: {
      low: 1.5,     // 1 team per 1.5 miles
      medium: 1.0,  // 1 team per 1 mile
      high: 0.75    // 1 team per 0.75 miles
    },
    not_sure_default: 1
  },

  // Event type to risk mapping
  event_types: {
    corporate: { risk: 'low' },
    wedding: { risk: 'low' },
    private_party: { risk: 'medium' },
    festival: { risk: 'high' },
    concert: { risk: 'high' },
    sporting: { risk: 'medium' },
    political: { risk: 'high' },
    vip: { risk: 'high' },
    other: { risk: 'medium' }
  },

  // Fixed per-team resources
  fleet_per_team: {
    total_drones: 3,
    airborne: 2,
    hot_spare: 1,
    model: "DJI Matrice 4T"
  },

  staff_per_team: {
    pilots: 2,
    ops_manager: 1,
    pilot_certification: "FAA Part 107"
  },

  // What's always included
  included: [
    "Live overwatch + radio callouts",
    "Incident Log",
    "Safety Receipt PDF within 24 hours",
    "Privacy: no biometric ID or ALPR by default"
  ],

  // Disclaimers
  disclaimers: {
    final_quote: "Final quote depends on site layout, airspace approvals, and operational constraints (Part 107/VLOS/venue permissions).",
    airspace_auth: "This location may require airspace authorization. We'll confirm before finalizing."
  },

  // Email for quote submissions
  quote_email: "quotes@skyshield.us"
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUOTE_CONFIG };
}
