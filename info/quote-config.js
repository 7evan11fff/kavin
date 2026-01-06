// SkyShield Booking Calculator - Pricing Configuration
// Last updated: 2025-12-18

const SKYSHIELD_CONFIG = {
  // Base package
  base: {
    price: 7500,
    hours: 8,
    teams: 1
  },

  // Extra time/team pricing
  extra_hour_rate_per_team: 750,        // $/hour per team after base 8 hours
  extra_team_rate_base_window: 6000,    // $ per additional team (for base 8-hour window)

  // Travel from Austin, TX
  travel: {
    included_miles_from_austin_one_way: 30,
    per_mile_after_one_way: 2.50,
    minimum_overage_fee: 150
  },

  // Night operations (after sunset)
  night_ops_fee_per_event: 1500,

  // Deposit
  deposit_percent: 25,

  // Team recommendation thresholds (acres per team)
  team_thresholds: {
    low_risk: 6,      // 1 team per 6 acres
    medium_risk: 4,   // 1 team per 4 acres
    high_risk: 3      // 1 team per 3 acres
  },

  // Team recommendation thresholds (perimeter miles per team)
  team_thresholds_perimeter: {
    low_risk: 1.5,    // 1 team per 1.5 miles
    medium_risk: 1.0, // 1 team per 1 mile
    high_risk: 0.75   // 1 team per 0.75 miles
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
  ]
};

// Price calculation functions
function calculateTeams(acres, riskLevel) {
  const thresholds = SKYSHIELD_CONFIG.team_thresholds;
  let threshold;
  
  switch(riskLevel) {
    case 'high': threshold = thresholds.high_risk; break;
    case 'medium': threshold = thresholds.medium_risk; break;
    case 'low': 
    default: threshold = thresholds.low_risk; break;
  }
  
  return Math.max(1, Math.ceil(acres / threshold));
}

function calculateTeamsByPerimeter(perimeterMiles, riskLevel) {
  const thresholds = SKYSHIELD_CONFIG.team_thresholds_perimeter;
  let threshold;
  
  switch(riskLevel) {
    case 'high': threshold = thresholds.high_risk; break;
    case 'medium': threshold = thresholds.medium_risk; break;
    case 'low': 
    default: threshold = thresholds.low_risk; break;
  }
  
  return Math.max(1, Math.ceil(perimeterMiles / threshold));
}

function calculateTravelFee(milesFromAustin) {
  const travel = SKYSHIELD_CONFIG.travel;
  const extraMiles = Math.max(0, milesFromAustin - travel.included_miles_from_austin_one_way);
  
  if (extraMiles === 0) return 0;
  
  const fee = extraMiles * travel.per_mile_after_one_way * 2; // Round trip
  return Math.max(fee, travel.minimum_overage_fee);
}

function calculateTotal(options) {
  const config = SKYSHIELD_CONFIG;
  const {
    hours = 8,
    teams = 1,
    days = 1,
    nightOps = false,
    milesFromAustin = 0
  } = options;

  // Base package
  let total = config.base.price;
  
  // Extra hours (per team, per day)
  const extraHours = Math.max(0, hours - config.base.hours);
  total += extraHours * config.extra_hour_rate_per_team * teams;
  
  // Extra teams
  const extraTeams = Math.max(0, teams - config.base.teams);
  total += extraTeams * config.extra_team_rate_base_window;
  
  // Apply to multi-day
  total *= days;
  
  // Night ops (per event, not per day)
  if (nightOps) {
    total += config.night_ops_fee_per_event;
  }
  
  // Travel
  total += calculateTravelFee(milesFromAustin);
  
  return {
    total: total,
    deposit: Math.round(total * (config.deposit_percent / 100)),
    breakdown: {
      base: config.base.price * days,
      extraHours: extraHours * config.extra_hour_rate_per_team * teams * days,
      extraTeams: extraTeams * config.extra_team_rate_base_window * days,
      nightOps: nightOps ? config.night_ops_fee_per_event : 0,
      travel: calculateTravelFee(milesFromAustin)
    }
  };
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SKYSHIELD_CONFIG, calculateTeams, calculateTeamsByPerimeter, calculateTravelFee, calculateTotal };
}

