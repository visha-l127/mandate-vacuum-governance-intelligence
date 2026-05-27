export const complaintMetrics: Record<string, any> = {
  Electrical: {
    entropy: 0.98,
    halfLife: 33.9,
    primaryOwner: "Electrical Dept",
    avgResolutionDays: 9,
    fragmentationLevel: "HIGH"
  },

  Drain: {
    entropy: 0.91,
    halfLife: 28.9,
    primaryOwner: "Drainage Dept",
    avgResolutionDays: 48,
    fragmentationLevel: "HIGH"
  },

  "Solid Waste": {
    entropy: 0.99,
    halfLife: 34.1,
    primaryOwner: "Sanitation Dept",
    avgResolutionDays: 35,
    fragmentationLevel: "HIGH"
  },

  "Road Maintenance": {
    entropy: 1.0,
    halfLife: 33.9,
    primaryOwner: "PWD",
    avgResolutionDays: 34,
    fragmentationLevel: "HIGH"
  },

  Forest: {
    entropy: 0.98,
    halfLife: 28.9,
    primaryOwner: "Parks Dept",
    avgResolutionDays: 31,
    fragmentationLevel: "HIGH"
  },

  Health: {
    entropy: 1.0,
    halfLife: 38.1,
    primaryOwner: "Health Dept",
    avgResolutionDays: 38,
    fragmentationLevel: "HIGH"
  }
};