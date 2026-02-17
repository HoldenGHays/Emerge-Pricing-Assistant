export interface MarketplaceResult {
  target: number;
  targetPercentage: number;
  expectedGP: number;
  expectedCM: number;
  saasAddOn?: number;
}

export interface SaaSResult {
  revenue: number;
  expectedGP: number;
  expectedCM: number;
}

export interface PricingDataRow {
  annual_freight_spend: number;
  coreMarketplace: MarketplaceResult;
  proMarketplace: MarketplaceResult;
  coreSaaS: SaaSResult;
  proSaaS: SaaSResult;
}

// Data parsed from tool_input_file - Sheet1.csv
export const pricingData: PricingDataRow[] = [
  {
    "annual_freight_spend": 1000000.0,
    "coreMarketplace": {
      "target": 100000.0,
      "targetPercentage": 0.1,
      "expectedGP": 6790.0,
      "expectedCM": 3395.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 100000.0,
      "targetPercentage": 0.1,
      "saasAddOn": 1019.0,
      "expectedGP": 7809.0,
      "expectedCM": 4414.0
    },
    "coreSaaS": {
      "revenue": 3395.0,
      "expectedGP": 3395.0,
      "expectedCM": 3395.0
    },
    "proSaaS": {
      "revenue": 4414.0,
      "expectedGP": 4414.0,
      "expectedCM": 4414.0
    }
  },
  {
    "annual_freight_spend": 5000000.0,
    "coreMarketplace": {
      "target": 175000.0,
      "targetPercentage": 0.035,
      "expectedGP": 11883.0,
      "expectedCM": 5941.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 175000.0,
      "targetPercentage": 0.035,
      "saasAddOn": 1782.0,
      "expectedGP": 13665.0,
      "expectedCM": 7724.0
    },
    "coreSaaS": {
      "revenue": 5941.0,
      "expectedGP": 5941.0,
      "expectedCM": 5941.0
    },
    "proSaaS": {
      "revenue": 7724.0,
      "expectedGP": 7724.0,
      "expectedCM": 7724.0
    }
  },
  {
    "annual_freight_spend": 10000000.0,
    "coreMarketplace": {
      "target": 250000.0,
      "targetPercentage": 0.025,
      "expectedGP": 16975.0,
      "expectedCM": 8488.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 250000.0,
      "targetPercentage": 0.025,
      "saasAddOn": 2546.0,
      "expectedGP": 19521.0,
      "expectedCM": 11034.0
    },
    "coreSaaS": {
      "revenue": 8488.0,
      "expectedGP": 8488.0,
      "expectedCM": 8488.0
    },
    "proSaaS": {
      "revenue": 11034.0,
      "expectedGP": 11034.0,
      "expectedCM": 11034.0
    }
  },
  {
    "annual_freight_spend": 25000000.0,
    "coreMarketplace": {
      "target": 325000.0,
      "targetPercentage": 0.013000000000000001,
      "expectedGP": 22068.0,
      "expectedCM": 11034.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 325000.0,
      "targetPercentage": 0.013000000000000001,
      "saasAddOn": 3310.0,
      "expectedGP": 25378.0,
      "expectedCM": 14344.0
    },
    "coreSaaS": {
      "revenue": 11034.0,
      "expectedGP": 11034.0,
      "expectedCM": 11034.0
    },
    "proSaaS": {
      "revenue": 14344.0,
      "expectedGP": 14344.0,
      "expectedCM": 14344.0
    }
  },
  {
    "annual_freight_spend": 50000000.0,
    "coreMarketplace": {
      "target": 600000.0,
      "targetPercentage": 0.012,
      "expectedGP": 40740.0,
      "expectedCM": 20370.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 600000.0,
      "targetPercentage": 0.012,
      "saasAddOn": 6111.0,
      "expectedGP": 46851.0,
      "expectedCM": 26481.0
    },
    "coreSaaS": {
      "revenue": 20370.0,
      "expectedGP": 20370.0,
      "expectedCM": 20370.0
    },
    "proSaaS": {
      "revenue": 26481.0,
      "expectedGP": 26481.0,
      "expectedCM": 26481.0
    }
  },
  {
    "annual_freight_spend": 75000000.0,
    "coreMarketplace": {
      "target": 825000.0,
      "targetPercentage": 0.011000000000000001,
      "expectedGP": 56018.0,
      "expectedCM": 28009.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 825000.0,
      "targetPercentage": 0.011000000000000001,
      "saasAddOn": 8403.0,
      "expectedGP": 64420.0,
      "expectedCM": 36411.0
    },
    "coreSaaS": {
      "revenue": 28009.0,
      "expectedGP": 28009.0,
      "expectedCM": 28009.0
    },
    "proSaaS": {
      "revenue": 36411.0,
      "expectedGP": 36411.0,
      "expectedCM": 36411.0
    }
  },
  {
    "annual_freight_spend": 100000000.0,
    "coreMarketplace": {
      "target": 1000000.0,
      "targetPercentage": 0.01,
      "expectedGP": 67900.0,
      "expectedCM": 33950.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 1000000.0,
      "targetPercentage": 0.01,
      "saasAddOn": 10185.0,
      "expectedGP": 78085.0,
      "expectedCM": 44135.0
    },
    "coreSaaS": {
      "revenue": 33950.0,
      "expectedGP": 33950.0,
      "expectedCM": 33950.0
    },
    "proSaaS": {
      "revenue": 44135.0,
      "expectedGP": 44135.0,
      "expectedCM": 44135.0
    }
  },
  {
    "annual_freight_spend": 125000000.0,
    "coreMarketplace": {
      "target": 1229167.0,
      "targetPercentage": 0.0098,
      "expectedGP": 83460.0,
      "expectedCM": 41730.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 1229167.0,
      "targetPercentage": 0.0098,
      "saasAddOn": 12519.0,
      "expectedGP": 95979.0,
      "expectedCM": 54249.0
    },
    "coreSaaS": {
      "revenue": 41730.0,
      "expectedGP": 41730.0,
      "expectedCM": 41730.0
    },
    "proSaaS": {
      "revenue": 54249.0,
      "expectedGP": 54249.0,
      "expectedCM": 54249.0
    }
  },
  {
    "annual_freight_spend": 150000000.0,
    "coreMarketplace": {
      "target": 1450000.0,
      "targetPercentage": 0.0097,
      "expectedGP": 98455.0,
      "expectedCM": 49228.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 1450000.0,
      "targetPercentage": 0.0097,
      "saasAddOn": 14768.0,
      "expectedGP": 113223.0,
      "expectedCM": 63996.0
    },
    "coreSaaS": {
      "revenue": 49228.0,
      "expectedGP": 49228.0,
      "expectedCM": 49228.0
    },
    "proSaaS": {
      "revenue": 63996.0,
      "expectedGP": 63996.0,
      "expectedCM": 63996.0
    }
  },
  {
    "annual_freight_spend": 175000000.0,
    "coreMarketplace": {
      "target": 1662500.0,
      "targetPercentage": 0.0095,
      "expectedGP": 112884.0,
      "expectedCM": 56442.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 1662500.0,
      "targetPercentage": 0.0095,
      "saasAddOn": 16933.0,
      "expectedGP": 129816.0,
      "expectedCM": 73374.0
    },
    "coreSaaS": {
      "revenue": 56442.0,
      "expectedGP": 56442.0,
      "expectedCM": 56442.0
    },
    "proSaaS": {
      "revenue": 73374.0,
      "expectedGP": 73374.0,
      "expectedCM": 73374.0
    }
  },
  {
    "annual_freight_spend": 200000000.0,
    "coreMarketplace": {
      "target": 1866667.0,
      "targetPercentage": 0.009300000000000001,
      "expectedGP": 126747.0,
      "expectedCM": 63373.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 1866667.0,
      "targetPercentage": 0.009300000000000001,
      "saasAddOn": 19012.0,
      "expectedGP": 145759.0,
      "expectedCM": 82385.0
    },
    "coreSaaS": {
      "revenue": 63373.0,
      "expectedGP": 63373.0,
      "expectedCM": 63373.0
    },
    "proSaaS": {
      "revenue": 82385.0,
      "expectedGP": 82385.0,
      "expectedCM": 82385.0
    }
  },
  {
    "annual_freight_spend": 225000000.0,
    "coreMarketplace": {
      "target": 2062500.0,
      "targetPercentage": 0.0092,
      "expectedGP": 140044.0,
      "expectedCM": 70022.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 2062500.0,
      "targetPercentage": 0.0092,
      "saasAddOn": 21007.0,
      "expectedGP": 161050.0,
      "expectedCM": 91028.0
    },
    "coreSaaS": {
      "revenue": 70022.0,
      "expectedGP": 70022.0,
      "expectedCM": 70022.0
    },
    "proSaaS": {
      "revenue": 91028.0,
      "expectedGP": 91028.0,
      "expectedCM": 91028.0
    }
  },
  {
    "annual_freight_spend": 250000000.0,
    "coreMarketplace": {
      "target": 2250000.0,
      "targetPercentage": 0.009000000000000001,
      "expectedGP": 152775.0,
      "expectedCM": 76388.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 2250000.0,
      "targetPercentage": 0.009000000000000001,
      "saasAddOn": 22916.0,
      "expectedGP": 175691.0,
      "expectedCM": 99304.0
    },
    "coreSaaS": {
      "revenue": 76388.0,
      "expectedGP": 76388.0,
      "expectedCM": 76388.0
    },
    "proSaaS": {
      "revenue": 99304.0,
      "expectedGP": 99304.0,
      "expectedCM": 99304.0
    }
  },
  {
    "annual_freight_spend": 275000000.0,
    "coreMarketplace": {
      "target": 2447500.0,
      "targetPercentage": 0.0089,
      "expectedGP": 166185.0,
      "expectedCM": 83093.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 2447500.0,
      "targetPercentage": 0.0089,
      "saasAddOn": 24928.0,
      "expectedGP": 191113.0,
      "expectedCM": 108020.0
    },
    "coreSaaS": {
      "revenue": 83093.0,
      "expectedGP": 83093.0,
      "expectedCM": 83093.0
    },
    "proSaaS": {
      "revenue": 108020.0,
      "expectedGP": 108020.0,
      "expectedCM": 108020.0
    }
  },
  {
    "annual_freight_spend": 300000000.0,
    "coreMarketplace": {
      "target": 2640000.0,
      "targetPercentage": 0.0088,
      "expectedGP": 179256.0,
      "expectedCM": 89628.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 2640000.0,
      "targetPercentage": 0.0088,
      "saasAddOn": 26888.0,
      "expectedGP": 206144.0,
      "expectedCM": 116516.0
    },
    "coreSaaS": {
      "revenue": 89628.0,
      "expectedGP": 89628.0,
      "expectedCM": 89628.0
    },
    "proSaaS": {
      "revenue": 116516.0,
      "expectedGP": 116516.0,
      "expectedCM": 116516.0
    }
  },
  {
    "annual_freight_spend": 325000000.0,
    "coreMarketplace": {
      "target": 2827500.0,
      "targetPercentage": 0.0087,
      "expectedGP": 191987.0,
      "expectedCM": 95994.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 2827500.0,
      "targetPercentage": 0.0087,
      "saasAddOn": 28798.0,
      "expectedGP": 220785.0,
      "expectedCM": 124792.0
    },
    "coreSaaS": {
      "revenue": 95994.0,
      "expectedGP": 95994.0,
      "expectedCM": 95994.0
    },
    "proSaaS": {
      "revenue": 124792.0,
      "expectedGP": 124792.0,
      "expectedCM": 124792.0
    }
  },
  {
    "annual_freight_spend": 350000000.0,
    "coreMarketplace": {
      "target": 3010000.0,
      "targetPercentage": 0.0086,
      "expectedGP": 204379.0,
      "expectedCM": 102190.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 3010000.0,
      "targetPercentage": 0.0086,
      "saasAddOn": 30657.0,
      "expectedGP": 235036.0,
      "expectedCM": 132846.0
    },
    "coreSaaS": {
      "revenue": 102190.0,
      "expectedGP": 102190.0,
      "expectedCM": 102190.0
    },
    "proSaaS": {
      "revenue": 132846.0,
      "expectedGP": 132846.0,
      "expectedCM": 132846.0
    }
  },
  {
    "annual_freight_spend": 375000000.0,
    "coreMarketplace": {
      "target": 3187500.0,
      "targetPercentage": 0.0085,
      "expectedGP": 216431.0,
      "expectedCM": 108216.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 3187500.0,
      "targetPercentage": 0.0085,
      "saasAddOn": 32465.0,
      "expectedGP": 248896.0,
      "expectedCM": 140680.0
    },
    "coreSaaS": {
      "revenue": 108216.0,
      "expectedGP": 108216.0,
      "expectedCM": 108216.0
    },
    "proSaaS": {
      "revenue": 140680.0,
      "expectedGP": 140680.0,
      "expectedCM": 140680.0
    }
  },
  {
    "annual_freight_spend": 400000000.0,
    "coreMarketplace": {
      "target": 3360000.0,
      "targetPercentage": 0.0084,
      "expectedGP": 228144.0,
      "expectedCM": 114072.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 3360000.0,
      "targetPercentage": 0.0084,
      "saasAddOn": 34222.0,
      "expectedGP": 262366.0,
      "expectedCM": 148294.0
    },
    "coreSaaS": {
      "revenue": 114072.0,
      "expectedGP": 114072.0,
      "expectedCM": 114072.0
    },
    "proSaaS": {
      "revenue": 148294.0,
      "expectedGP": 148294.0,
      "expectedCM": 148294.0
    }
  },
  {
    "annual_freight_spend": 425000000.0,
    "coreMarketplace": {
      "target": 3527500.0,
      "targetPercentage": 0.0083,
      "expectedGP": 239517.0,
      "expectedCM": 119759.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 3527500.0,
      "targetPercentage": 0.0083,
      "saasAddOn": 35928.0,
      "expectedGP": 275445.0,
      "expectedCM": 155686.0
    },
    "coreSaaS": {
      "revenue": 119759.0,
      "expectedGP": 119759.0,
      "expectedCM": 119759.0
    },
    "proSaaS": {
      "revenue": 155686.0,
      "expectedGP": 155686.0,
      "expectedCM": 155686.0
    }
  },
  {
    "annual_freight_spend": 450000000.0,
    "coreMarketplace": {
      "target": 3690000.0,
      "targetPercentage": 0.008199999999999999,
      "expectedGP": 250551.0,
      "expectedCM": 125276.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 3690000.0,
      "targetPercentage": 0.008199999999999999,
      "saasAddOn": 37583.0,
      "expectedGP": 288134.0,
      "expectedCM": 162858.0
    },
    "coreSaaS": {
      "revenue": 125276.0,
      "expectedGP": 125276.0,
      "expectedCM": 125276.0
    },
    "proSaaS": {
      "revenue": 162858.0,
      "expectedGP": 162858.0,
      "expectedCM": 162858.0
    }
  },
  {
    "annual_freight_spend": 475000000.0,
    "coreMarketplace": {
      "target": 3847500.0,
      "targetPercentage": 0.008100000000000001,
      "expectedGP": 261245.0,
      "expectedCM": 130623.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 3847500.0,
      "targetPercentage": 0.008100000000000001,
      "saasAddOn": 39187.0,
      "expectedGP": 300432.0,
      "expectedCM": 169809.0
    },
    "coreSaaS": {
      "revenue": 130623.0,
      "expectedGP": 130623.0,
      "expectedCM": 130623.0
    },
    "proSaaS": {
      "revenue": 169809.0,
      "expectedGP": 169809.0,
      "expectedCM": 169809.0
    }
  },
  {
    "annual_freight_spend": 500000000.0,
    "coreMarketplace": {
      "target": 4000000.0,
      "targetPercentage": 0.008,
      "expectedGP": 271600.0,
      "expectedCM": 135800.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 4000000.0,
      "targetPercentage": 0.008,
      "saasAddOn": 40740.0,
      "expectedGP": 312340.0,
      "expectedCM": 176540.0
    },
    "coreSaaS": {
      "revenue": 135800.0,
      "expectedGP": 135800.0,
      "expectedCM": 135800.0
    },
    "proSaaS": {
      "revenue": 176540.0,
      "expectedGP": 176540.0,
      "expectedCM": 176540.0
    }
  },
  {
    "annual_freight_spend": 525000000.0,
    "coreMarketplace": {
      "target": 4147500.0,
      "targetPercentage": 0.0079,
      "expectedGP": 281615.0,
      "expectedCM": 140808.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 4147500.0,
      "targetPercentage": 0.0079,
      "saasAddOn": 42242.0,
      "expectedGP": 323858.0,
      "expectedCM": 183050.0
    },
    "coreSaaS": {
      "revenue": 140808.0,
      "expectedGP": 140808.0,
      "expectedCM": 140808.0
    },
    "proSaaS": {
      "revenue": 183050.0,
      "expectedGP": 183050.0,
      "expectedCM": 183050.0
    }
  },
  {
    "annual_freight_spend": 550000000.0,
    "coreMarketplace": {
      "target": 4290000.0,
      "targetPercentage": 0.0078000000000000005,
      "expectedGP": 291291.0,
      "expectedCM": 145646.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 4290000.0,
      "targetPercentage": 0.0078000000000000005,
      "saasAddOn": 43694.0,
      "expectedGP": 334985.0,
      "expectedCM": 189339.0
    },
    "coreSaaS": {
      "revenue": 145646.0,
      "expectedGP": 145646.0,
      "expectedCM": 145646.0
    },
    "proSaaS": {
      "revenue": 189339.0,
      "expectedGP": 189339.0,
      "expectedCM": 189339.0
    }
  },
  {
    "annual_freight_spend": 575000000.0,
    "coreMarketplace": {
      "target": 4427500.0,
      "targetPercentage": 0.0077,
      "expectedGP": 300627.0,
      "expectedCM": 150314.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 4427500.0,
      "targetPercentage": 0.0077,
      "saasAddOn": 45094.0,
      "expectedGP": 345721.0,
      "expectedCM": 195408.0
    },
    "coreSaaS": {
      "revenue": 150314.0,
      "expectedGP": 150314.0,
      "expectedCM": 150314.0
    },
    "proSaaS": {
      "revenue": 195408.0,
      "expectedGP": 195408.0,
      "expectedCM": 195408.0
    },
    "coreMarketplace": {
      "target": 4560000.0,
      "targetPercentage": 0.0076,
      "expectedGP": 309624.0,
      "expectedCM": 154812.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 4560000.0,
      "targetPercentage": 0.0076,
      "saasAddOn": 46444.0,
      "expectedGP": 356068.0,
      "expectedCM": 201256.0
    },
    "coreSaaS": {
      "revenue": 154812.0,
      "expectedGP": 154812.0,
      "expectedCM": 154812.0
    },
    "proSaaS": {
      "revenue": 201256.0,
      "expectedGP": 201256.0,
      "expectedCM": 201256.0
    },
    "annual_freight_spend": 625000000.0,
    "coreMarketplace": {
      "target": 4687500.0,
      "targetPercentage": 0.0075,
      "expectedGP": 318281.0,
      "expectedCM": 159141.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 4687500.0,
      "targetPercentage": 0.0075,
      "saasAddOn": 47742.0,
      "expectedGP": 366023.0,
      "expectedCM": 206883.0
    },
    "coreSaaS": {
      "revenue": 159141.0,
      "expectedGP": 159141.0,
      "expectedCM": 159141.0
    },
    "proSaaS": {
      "revenue": 206883.0,
      "expectedGP": 206883.0,
      "expectedCM": 206883.0
    },
    "annual_freight_spend": 650000000.0,
    "coreMarketplace": {
      "target": 4810000.0,
      "targetPercentage": 0.0074,
      "expectedGP": 326599.0,
      "expectedCM": 163300.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 4810000.0,
      "targetPercentage": 0.0074,
      "saasAddOn": 48990.0,
      "expectedGP": 375589.0,
      "expectedCM": 212289.0
    },
    "coreSaaS": {
      "revenue": 163300.0,
      "expectedGP": 163300.0,
      "expectedCM": 163300.0
    },
    "proSaaS": {
      "revenue": 212289.0,
      "expectedGP": 212289.0,
      "expectedCM": 212289.0
    },
    "annual_freight_spend": 675000000.0,
    "coreMarketplace": {
      "target": 4927500.0,
      "targetPercentage": 0.0073,
      "expectedGP": 334577.0,
      "expectedCM": 167289.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 4927500.0,
      "targetPercentage": 0.0073,
      "saasAddOn": 50187.0,
      "expectedGP": 384764.0,
      "expectedCM": 217475.0
    },
    "coreSaaS": {
      "revenue": 167289.0,
      "expectedGP": 167289.0,
      "expectedCM": 167289.0
    },
    "proSaaS": {
      "revenue": 217475.0,
      "expectedGP": 217475.0,
      "expectedCM": 217475.0
    },
    "annual_freight_spend": 700000000.0,
    "coreMarketplace": {
      "target": 5040000.0,
      "targetPercentage": 0.0072,
      "expectedGP": 342216.0,
      "expectedCM": 171108.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 5040000.0,
      "targetPercentage": 0.0072,
      "saasAddOn": 51332.0,
      "expectedGP": 393548.0,
      "expectedCM": 222440.0
    },
    "coreSaaS": {
      "revenue": 171108.0,
      "expectedGP": 171108.0,
      "expectedCM": 171108.0
    },
    "proSaaS": {
      "revenue": 222440.0,
      "expectedGP": 222440.0,
      "expectedCM": 222440.0
    },
    "annual_freight_spend": 725000000.0,
    "coreMarketplace": {
      "target": 5147500.0,
      "targetPercentage": 0.0070999999999999995,
      "expectedGP": 349515.0,
      "expectedCM": 174758.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 5147500.0,
      "targetPercentage": 0.0070999999999999995,
      "saasAddOn": 52427.0,
      "expectedGP": 401943.0,
      "expectedCM": 227185.0
    },
    "coreSaaS": {
      "revenue": 174758.0,
      "expectedGP": 174758.0,
      "expectedCM": 174758.0
    },
    "proSaaS": {
      "revenue": 227185.0,
      "expectedGP": 227185.0,
      "expectedCM": 227185.0
    },
    "annual_freight_spend": 750000000.0,
    "coreMarketplace": {
      "target": 5250000.0,
      "targetPercentage": 0.006999999999999999,
      "expectedGP": 356475.0,
      "expectedCM": 178238.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 5250000.0,
      "targetPercentage": 0.006999999999999999,
      "saasAddOn": 53471.0,
      "expectedGP": 409946.0,
      "expectedCM": 231709.0
    },
    "coreSaaS": {
      "revenue": 178238.0,
      "expectedGP": 178238.0,
      "expectedCM": 178238.0
    },
    "proSaaS": {
      "revenue": 231709.0,
      "expectedGP": 231709.0,
      "expectedCM": 231709.0
    },
    "annual_freight_spend": 775000000.0,
    "coreMarketplace": {
      "target": 5347500.0,
      "targetPercentage": 0.0069,
      "expectedGP": 363095.0,
      "expectedCM": 181548.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 5347500.0,
      "targetPercentage": 0.0069,
      "saasAddOn": 54464.0,
      "expectedGP": 417560.0,
      "expectedCM": 236012.0
    },
    "coreSaaS": {
      "revenue": 181548.0,
      "expectedGP": 181548.0,
      "expectedCM": 181548.0
    },
    "proSaaS": {
      "revenue": 236012.0,
      "expectedGP": 236012.0,
      "expectedCM": 236012.0
    },
    "annual_freight_spend": 800000000.0,
    "coreMarketplace": {
      "target": 5440000.0,
      "targetPercentage": 0.0068000000000000005,
      "expectedGP": 369376.0,
      "expectedCM": 184688.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 5440000.0,
      "targetPercentage": 0.0068000000000000005,
      "saasAddOn": 55406.0,
      "expectedGP": 424782.0,
      "expectedCM": 240094.0
    },
    "coreSaaS": {
      "revenue": 184688.0,
      "expectedGP": 184688.0,
      "expectedCM": 184688.0
    },
    "proSaaS": {
      "revenue": 240094.0,
      "expectedGP": 240094.0,
      "expectedCM": 240094.0
    },
    "annual_freight_spend": 825000000.0,
    "coreMarketplace": {
      "target": 5527500.0,
      "targetPercentage": 0.0067,
      "expectedGP": 375317.0,
      "expectedCM": 187659.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 5527500.0,
      "targetPercentage": 0.0067,
      "saasAddOn": 56298.0,
      "expectedGP": 431615.0,
      "expectedCM": 243956.0
    },
    "coreSaaS": {
      "revenue": 187659.0,
      "expectedGP": 187659.0,
      "expectedCM": 187659.0
    },
    "proSaaS": {
      "revenue": 243956.0,
      "expectedGP": 243956.0,
      "expectedCM": 243956.0
    },
    "annual_freight_spend": 850000000.0,
    "coreMarketplace": {
      "target": 5610000.0,
      "targetPercentage": 0.0066,
      "expectedGP": 380919.0,
      "expectedCM": 190460.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 5610000.0,
      "targetPercentage": 0.0066,
      "saasAddOn": 57138.0,
      "expectedGP": 438057.0,
      "expectedCM": 247597.0
    },
    "coreSaaS": {
      "revenue": 190460.0,
      "expectedGP": 190460.0,
      "expectedCM": 190460.0
    },
    "proSaaS": {
      "revenue": 247597.0,
      "expectedGP": 247597.0,
      "expectedCM": 247597.0
    },
    "annual_freight_spend": 875000000.0,
    "coreMarketplace": {
      "target": 5687500.0,
      "targetPercentage": 0.006500000000000001,
      "expectedGP": 386181.0,
      "expectedCM": 193091.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 5687500.0,
      "targetPercentage": 0.006500000000000001,
      "saasAddOn": 57927.0,
      "expectedGP": 444108.0,
      "expectedCM": 251018.0
    },
    "coreSaaS": {
      "revenue": 193091.0,
      "expectedGP": 193091.0,
      "expectedCM": 193091.0
    },
    "proSaaS": {
      "revenue": 251018.0,
      "expectedGP": 251018.0,
      "expectedCM": 251018.0
    },
    "annual_freight_spend": 900000000.0,
    "coreMarketplace": {
      "target": 5760000.0,
      "targetPercentage": 0.0064,
      "expectedGP": 391104.0,
      "expectedCM": 195552.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 5760000.0,
      "targetPercentage": 0.0064,
      "saasAddOn": 58666.0,
      "expectedGP": 449770.0,
      "expectedCM": 254218.0
    },
    "coreSaaS": {
      "revenue": 195552.0,
      "expectedGP": 195552.0,
      "expectedCM": 195552.0
    },
    "proSaaS": {
      "revenue": 254218.0,
      "expectedGP": 254218.0,
      "expectedCM": 254218.0
    },
    "annual_freight_spend": 925000000.0,
    "coreMarketplace": {
      "target": 5827500.0,
      "targetPercentage": 0.0063,
      "expectedGP": 395687.0,
      "expectedCM": 197844.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 5827500.0,
      "targetPercentage": 0.0063,
      "saasAddOn": 59353.0,
      "expectedGP": 455040.0,
      "expectedCM": 257197.0
    },
    "coreSaaS": {
      "revenue": 197844.0,
      "expectedGP": 197844.0,
      "expectedCM": 197844.0
    },
    "proSaaS": {
      "revenue": 257197.0,
      "expectedGP": 257197.0,
      "expectedCM": 257197.0
    },
    "annual_freight_spend": 950000000.0,
    "coreMarketplace": {
      "target": 5890000.0,
      "targetPercentage": 0.0062,
      "expectedGP": 399931.0,
      "expectedCM": 199966.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 5890000.0,
      "targetPercentage": 0.0062,
      "saasAddOn": 59990.0,
      "expectedGP": 459921.0,
      "expectedCM": 259955.0
    },
    "coreSaaS": {
      "revenue": 199966.0,
      "expectedGP": 199966.0,
      "expectedCM": 199966.0
    },
    "proSaaS": {
      "revenue": 259955.0,
      "expectedGP": 259955.0,
      "expectedCM": 259955.0
    },
    "annual_freight_spend": 975000000.0,
    "coreMarketplace": {
      "target": 5947500.0,
      "targetPercentage": 0.0060999999999999995,
      "expectedGP": 403835.0,
      "expectedCM": 201918.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 5947500.0,
      "targetPercentage": 0.0060999999999999995,
      "saasAddOn": 60575.0,
      "expectedGP": 464411.0,
      "expectedCM": 262493.0
    },
    "coreSaaS": {
      "revenue": 201918.0,
      "expectedGP": 201918.0,
      "expectedCM": 201918.0
    },
    "proSaaS": {
      "revenue": 262493.0,
      "expectedGP": 262493.0,
      "expectedCM": 262493.0
    },
    "annual_freight_spend": 1000000000.0,
    "coreMarketplace": {
      "target": 6000000.0,
      "targetPercentage": 0.006,
      "expectedGP": 407400.0,
      "expectedCM": 203700.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 6000000.0,
      "targetPercentage": 0.006,
      "saasAddOn": 61110.0,
      "expectedGP": 468510.0,
      "expectedCM": 264810.0
    },
    "coreSaaS": {
      "revenue": 203700.0,
      "expectedGP": 203700.0,
      "expectedCM": 203700.0
    },
    "proSaaS": {
      "revenue": 264810.0,
      "expectedGP": 264810.0,
      "expectedCM": 264810.0
    },
    "annual_freight_spend": 1025000000.0,
    "coreMarketplace": {
      "target": 6123718.0,
      "targetPercentage": 0.006,
      "expectedGP": 415800.0,
      "expectedCM": 207900.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 6123718.0,
      "targetPercentage": 0.006,
      "saasAddOn": 62370.0,
      "expectedGP": 478171.0,
      "expectedCM": 270270.0
    },
    "coreSaaS": {
      "revenue": 207900.0,
      "expectedGP": 207900.0,
      "expectedCM": 207900.0
    },
    "proSaaS": {
      "revenue": 270270.0,
      "expectedGP": 270270.0,
      "expectedCM": 270270.0
    },
    "annual_freight_spend": 1050000000.0,
    "coreMarketplace": {
      "target": 6246154.0,
      "targetPercentage": 0.0059,
      "expectedGP": 424114.0,
      "expectedCM": 212057.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 6246154.0,
      "targetPercentage": 0.0059,
      "saasAddOn": 63617.0,
      "expectedGP": 487731.0,
      "expectedCM": 275674.0
    },
    "coreSaaS": {
      "revenue": 212057.0,
      "expectedGP": 212057.0,
      "expectedCM": 212057.0
    },
    "proSaaS": {
      "revenue": 275674.0,
      "expectedGP": 275674.0,
      "expectedCM": 275674.0
    },
    "annual_freight_spend": 1075000000.0,
    "coreMarketplace": {
      "target": 6367308.0,
      "targetPercentage": 0.0059,
      "expectedGP": 432340.0,
      "expectedCM": 216170.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 6367308.0,
      "targetPercentage": 0.0059,
      "saasAddOn": 64851.0,
      "expectedGP": 497191.0,
      "expectedCM": 281021.0
    },
    "coreSaaS": {
      "revenue": 216170.0,
      "expectedGP": 216170.0,
      "expectedCM": 216170.0
    },
    "proSaaS": {
      "revenue": 281021.0,
      "expectedGP": 281021.0,
      "expectedCM": 281021.0
    },
    "annual_freight_spend": 1100000000.0,
    "coreMarketplace": {
      "target": 6487179.0,
      "targetPercentage": 0.0059,
      "expectedGP": 440479.0,
      "expectedCM": 220240.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 6487179.0,
      "targetPercentage": 0.0059,
      "saasAddOn": 66072.0,
      "expectedGP": 506551.0,
      "expectedCM": 286312.0
    },
    "coreSaaS": {
      "revenue": 220240.0,
      "expectedGP": 220240.0,
      "expectedCM": 220240.0
    },
    "proSaaS": {
      "revenue": 286312.0,
      "expectedGP": 286312.0,
      "expectedCM": 286312.0
    },
    "annual_freight_spend": 1125000000.0,
    "coreMarketplace": {
      "target": 6605769.0,
      "targetPercentage": 0.0059,
      "expectedGP": 448532.0,
      "expectedCM": 224266.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 6605769.0,
      "targetPercentage": 0.0059,
      "saasAddOn": 67280.0,
      "expectedGP": 515811.0,
      "expectedCM": 291546.0
    },
    "coreSaaS": {
      "revenue": 224266.0,
      "expectedGP": 224266.0,
      "expectedCM": 224266.0
    },
    "proSaaS": {
      "revenue": 291546.0,
      "expectedGP": 291546.0,
      "expectedCM": 291546.0
    },
    "annual_freight_spend": 1150000000.0,
    "coreMarketplace": {
      "target": 6723077.0,
      "targetPercentage": 0.0058,
      "expectedGP": 456497.0,
      "expectedCM": 228248.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 6723077.0,
      "targetPercentage": 0.0058,
      "saasAddOn": 68475.0,
      "expectedGP": 524971.0,
      "expectedCM": 296723.0
    },
    "coreSaaS": {
      "revenue": 228248.0,
      "expectedGP": 228248.0,
      "expectedCM": 228248.0
    },
    "proSaaS": {
      "revenue": 296723.0,
      "expectedGP": 296723.0,
      "expectedCM": 296723.0
    },
    "annual_freight_spend": 1175000000.0,
    "coreMarketplace": {
      "target": 6839103.0,
      "targetPercentage": 0.0058,
      "expectedGP": 464375.0,
      "expectedCM": 232188.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 6839103.0,
      "targetPercentage": 0.0058,
      "saasAddOn": 69656.0,
      "expectedGP": 534031.0,
      "expectedCM": 301844.0
    },
    "coreSaaS": {
      "revenue": 232188.0,
      "expectedGP": 232188.0,
      "expectedCM": 232188.0
    },
    "proSaaS": {
      "revenue": 301844.0,
      "expectedGP": 301844.0,
      "expectedCM": 301844.0
    },
    "annual_freight_spend": 1200000000.0,
    "coreMarketplace": {
      "target": 6953846.0,
      "targetPercentage": 0.0058,
      "expectedGP": 472166.0,
      "expectedCM": 236083.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 6953846.0,
      "targetPercentage": 0.0058,
      "saasAddOn": 70825.0,
      "expectedGP": 542991.0,
      "expectedCM": 306908.0
    },
    "coreSaaS": {
      "revenue": 236083.0,
      "expectedGP": 236083.0,
      "expectedCM": 236083.0
    },
    "proSaaS": {
      "revenue": 306908.0,
      "expectedGP": 306908.0,
      "expectedCM": 306908.0
    },
    "annual_freight_spend": 1225000000.0,
    "coreMarketplace": {
      "target": 7067308.0,
      "targetPercentage": 0.0058,
      "expectedGP": 479870.0,
      "expectedCM": 239935.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 7067308.0,
      "targetPercentage": 0.0058,
      "saasAddOn": 71981.0,
      "expectedGP": 551851.0,
      "expectedCM": 311916.0
    },
    "coreSaaS": {
      "revenue": 239935.0,
      "expectedGP": 239935.0,
      "expectedCM": 239935.0
    },
    "proSaaS": {
      "revenue": 311916.0,
      "expectedGP": 311916.0,
      "expectedCM": 311916.0
    },
    "annual_freight_spend": 1250000000.0,
    "coreMarketplace": {
      "target": 7179487.0,
      "targetPercentage": 0.005699999999999999,
      "expectedGP": 487487.0,
      "expectedCM": 243744.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 7179487.0,
      "targetPercentage": 0.005699999999999999,
      "saasAddOn": 73123.0,
      "expectedGP": 560610.0,
      "expectedCM": 316867.0
    },
    "coreSaaS": {
      "revenue": 243744.0,
      "expectedGP": 243744.0,
      "expectedCM": 243744.0
    },
    "proSaaS": {
      "revenue": 316867.0,
      "expectedGP": 316867.0,
      "expectedCM": 316867.0
    },
    "annual_freight_spend": 1275000000.0,
    "coreMarketplace": {
      "target": 7290385.0,
      "targetPercentage": 0.005699999999999999,
      "expectedGP": 495017.0,
      "expectedCM": 247509.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 7290385.0,
      "targetPercentage": 0.005699999999999999,
      "saasAddOn": 74253.0,
      "expectedGP": 569270.0,
      "expectedCM": 321761.0
    },
    "coreSaaS": {
      "revenue": 247509.0,
      "expectedGP": 247509.0,
      "expectedCM": 247509.0
    },
    "proSaaS": {
      "revenue": 321761.0,
      "expectedGP": 321761.0,
      "expectedCM": 321761.0
    },
    "annual_freight_spend": 1300000000.0,
    "coreMarketplace": {
      "target": 7400000.0,
      "targetPercentage": 0.005699999999999999,
      "expectedGP": 502460.0,
      "expectedCM": 251230.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 7400000.0,
      "targetPercentage": 0.005699999999999999,
      "saasAddOn": 75369.0,
      "expectedGP": 577829.0,
      "expectedCM": 326599.0
    },
    "coreSaaS": {
      "revenue": 251230.0,
      "expectedGP": 251230.0,
      "expectedCM": 251230.0
    },
    "proSaaS": {
      "revenue": 326599.0,
      "expectedGP": 326599.0,
      "expectedCM": 326599.0
    },
    "annual_freight_spend": 1325000000.0,
    "coreMarketplace": {
      "target": 7508333.0,
      "targetPercentage": 0.005699999999999999,
      "expectedGP": 509816.0,
      "expectedCM": 254908.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 7508333.0,
      "targetPercentage": 0.005699999999999999,
      "saasAddOn": 76472.0,
      "expectedGP": 586288.0,
      "expectedCM": 331380.0
    },
    "coreSaaS": {
      "revenue": 254908.0,
      "expectedGP": 254908.0,
      "expectedCM": 254908.0
    },
    "proSaaS": {
      "revenue": 331380.0,
      "expectedGP": 331380.0,
      "expectedCM": 331380.0
    },
    "annual_freight_spend": 1350000000.0,
    "coreMarketplace": {
      "target": 7615385.0,
      "targetPercentage": 0.005600000000000001,
      "expectedGP": 517085.0,
      "expectedCM": 258542.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 7615385.0,
      "targetPercentage": 0.005600000000000001,
      "saasAddOn": 77563.0,
      "expectedGP": 594647.0,
      "expectedCM": 336105.0
    },
    "coreSaaS": {
      "revenue": 258542.0,
      "expectedGP": 258542.0,
      "expectedCM": 258542.0
    },
    "proSaaS": {
      "revenue": 336105.0,
      "expectedGP": 336105.0,
      "expectedCM": 336105.0
    },
    "annual_freight_spend": 1375000000.0,
    "coreMarketplace": {
      "target": 7721154.0,
      "targetPercentage": 0.005600000000000001,
      "expectedGP": 524266.0,
      "expectedCM": 262133.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 7721154.0,
      "targetPercentage": 0.005600000000000001,
      "saasAddOn": 78640.0,
      "expectedGP": 602906.0,
      "expectedCM": 340773.0
    },
    "coreSaaS": {
      "revenue": 262133.0,
      "expectedGP": 262133.0,
      "expectedCM": 262133.0
    },
    "proSaaS": {
      "revenue": 340773.0,
      "expectedGP": 340773.0,
      "expectedCM": 340773.0
    },
    "annual_freight_spend": 1400000000.0,
    "coreMarketplace": {
      "target": 7825641.0,
      "targetPercentage": 0.005600000000000001,
      "expectedGP": 531361.0,
      "expectedCM": 265681.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 7825641.0,
      "targetPercentage": 0.005600000000000001,
      "saasAddOn": 79704.0,
      "expectedGP": 611065.0,
      "expectedCM": 345385.0
    },
    "coreSaaS": {
      "revenue": 265681.0,
      "expectedGP": 265681.0,
      "expectedCM": 265681.0
    },
    "proSaaS": {
      "revenue": 345385.0,
      "expectedGP": 345385.0,
      "expectedCM": 345385.0
    },
    "annual_freight_spend": 1425000000.0,
    "coreMarketplace": {
      "target": 7928846.0,
      "targetPercentage": 0.005600000000000001,
      "expectedGP": 538369.0,
      "expectedCM": 269184.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 7928846.0,
      "targetPercentage": 0.005600000000000001,
      "saasAddOn": 80755.0,
      "expectedGP": 619124.0,
      "expectedCM": 349940.0
    },
    "coreSaaS": {
      "revenue": 269184.0,
      "expectedGP": 269184.0,
      "expectedCM": 269184.0
    },
    "proSaaS": {
      "revenue": 349940.0,
      "expectedGP": 349940.0,
      "expectedCM": 349940.0
    },
    "annual_freight_spend": 1450000000.0,
    "coreMarketplace": {
      "target": 8030769.0,
      "targetPercentage": 0.0055000000000000005,
      "expectedGP": 545289.0,
      "expectedCM": 272645.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 8030769.0,
      "targetPercentage": 0.0055000000000000005,
      "saasAddOn": 81793.0,
      "expectedGP": 627083.0,
      "expectedCM": 354438.0
    },
    "coreSaaS": {
      "revenue": 272645.0,
      "expectedGP": 272645.0,
      "expectedCM": 272645.0
    },
    "proSaaS": {
      "revenue": 354438.0,
      "expectedGP": 354438.0,
      "expectedCM": 354438.0
    },
    "annual_freight_spend": 1475000000.0,
    "coreMarketplace": {
      "target": 8131410.0,
      "targetPercentage": 0.0055000000000000005,
      "expectedGP": 552123.0,
      "expectedCM": 276061.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 8131410.0,
      "targetPercentage": 0.0055000000000000005,
      "saasAddOn": 82818.0,
      "expectedGP": 634941.0,
      "expectedCM": 358880.0
    },
    "coreSaaS": {
      "revenue": 276061.0,
      "expectedGP": 276061.0,
      "expectedCM": 276061.0
    },
    "proSaaS": {
      "revenue": 358880.0,
      "expectedGP": 358880.0,
      "expectedCM": 358880.0
    },
    "annual_freight_spend": 1500000000.0,
    "coreMarketplace": {
      "target": 8230769.0,
      "targetPercentage": 0.0055000000000000005,
      "expectedGP": 558869.0,
      "expectedCM": 279435.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 8230769.0,
      "targetPercentage": 0.0055000000000000005,
      "saasAddOn": 83830.0,
      "expectedGP": 642700.0,
      "expectedCM": 363265.0
    },
    "coreSaaS": {
      "revenue": 279435.0,
      "expectedGP": 279435.0,
      "expectedCM": 279435.0
    },
    "proSaaS": {
      "revenue": 363265.0,
      "expectedGP": 363265.0,
      "expectedCM": 363265.0
    },
    "annual_freight_spend": 1525000000.0,
    "coreMarketplace": {
      "target": 8328846.0,
      "targetPercentage": 0.0055000000000000005,
      "expectedGP": 565529.0,
      "expectedCM": 282764.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 8328846.0,
      "targetPercentage": 0.0055000000000000005,
      "saasAddOn": 84829.0,
      "expectedGP": 650358.0,
      "expectedCM": 367594.0
    },
    "coreSaaS": {
      "revenue": 282764.0,
      "expectedGP": 282764.0,
      "expectedCM": 282764.0
    },
    "proSaaS": {
      "revenue": 367594.0,
      "expectedGP": 367594.0,
      "expectedCM": 367594.0
    },
    "annual_freight_spend": 1550000000.0,
    "coreMarketplace": {
      "target": 8425641.0,
      "targetPercentage": 0.0054,
      "expectedGP": 572101.0,
      "expectedCM": 286051.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 8425641.0,
      "targetPercentage": 0.0054,
      "saasAddOn": 85815.0,
      "expectedGP": 657916.0,
      "expectedCM": 371866.0
    },
    "coreSaaS": {
      "revenue": 286051.0,
      "expectedGP": 286051.0,
      "expectedCM": 286051.0
    },
    "proSaaS": {
      "revenue": 371866.0,
      "expectedGP": 371866.0,
      "expectedCM": 371866.0
    },
    "annual_freight_spend": 1575000000.0,
    "coreMarketplace": {
      "target": 8521154.0,
      "targetPercentage": 0.0054,
      "expectedGP": 578586.0,
      "expectedCM": 289293.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 8521154.0,
      "targetPercentage": 0.0054,
      "saasAddOn": 86788.0,
      "expectedGP": 665374.0,
      "expectedCM": 376081.0
    },
    "coreSaaS": {
      "revenue": 289293.0,
      "expectedGP": 289293.0,
      "expectedCM": 289293.0
    },
    "proSaaS": {
      "revenue": 376081.0,
      "expectedGP": 376081.0,
      "expectedCM": 376081.0
    },
    "annual_freight_spend": 1600000000.0,
    "coreMarketplace": {
      "target": 8615385.0,
      "targetPercentage": 0.0054,
      "expectedGP": 584985.0,
      "expectedCM": 292492.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 8615385.0,
      "targetPercentage": 0.0054,
      "saasAddOn": 87748.0,
      "expectedGP": 672732.0,
      "expectedCM": 380240.0
    },
    "coreSaaS": {
      "revenue": 292492.0,
      "expectedGP": 292492.0,
      "expectedCM": 292492.0
    },
    "proSaaS": {
      "revenue": 380240.0,
      "expectedGP": 380240.0,
      "expectedCM": 380240.0
    },
    "annual_freight_spend": 1625000000.0,
    "coreMarketplace": {
      "target": 8708333.0,
      "targetPercentage": 0.0054,
      "expectedGP": 591296.0,
      "expectedCM": 295648.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 8708333.0,
      "targetPercentage": 0.0054,
      "saasAddOn": 88694.0,
      "expectedGP": 679990.0,
      "expectedCM": 384342.0
    },
    "coreSaaS": {
      "revenue": 295648.0,
      "expectedGP": 295648.0,
      "expectedCM": 295648.0
    },
    "proSaaS": {
      "revenue": 384342.0,
      "expectedGP": 384342.0,
      "expectedCM": 384342.0
    },
    "annual_freight_spend": 1650000000.0,
    "coreMarketplace": {
      "target": 8800000.0,
      "targetPercentage": 0.0053,
      "expectedGP": 597520.0,
      "expectedCM": 298760.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 8800000.0,
      "targetPercentage": 0.0053,
      "saasAddOn": 89628.0,
      "expectedGP": 687148.0,
      "expectedCM": 388388.0
    },
    "coreSaaS": {
      "revenue": 298760.0,
      "expectedGP": 298760.0,
      "expectedCM": 298760.0
    },
    "proSaaS": {
      "revenue": 388388.0,
      "expectedGP": 388388.0,
      "expectedCM": 388388.0
    },
    "annual_freight_spend": 1675000000.0,
    "coreMarketplace": {
      "target": 8890385.0,
      "targetPercentage": 0.0053,
      "expectedGP": 603657.0,
      "expectedCM": 301829.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 8890385.0,
      "targetPercentage": 0.0053,
      "saasAddOn": 90549.0,
      "expectedGP": 694206.0,
      "expectedCM": 392377.0
    },
    "coreSaaS": {
      "revenue": 301829.0,
      "expectedGP": 301829.0,
      "expectedCM": 301829.0
    },
    "proSaaS": {
      "revenue": 392377.0,
      "expectedGP": 392377.0,
      "expectedCM": 392377.0
    },
    "annual_freight_spend": 1700000000.0,
    "coreMarketplace": {
      "target": 8979487.0,
      "targetPercentage": 0.0053,
      "expectedGP": 609707.0,
      "expectedCM": 304854.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 8979487.0,
      "targetPercentage": 0.0053,
      "saasAddOn": 91456.0,
      "expectedGP": 701163.0,
      "expectedCM": 396310.0
    },
    "coreSaaS": {
      "revenue": 304854.0,
      "expectedGP": 304854.0,
      "expectedCM": 304854.0
    },
    "proSaaS": {
      "revenue": 396310.0,
      "expectedGP": 396310.0,
      "expectedCM": 396310.0
    },
    "annual_freight_spend": 1725000000.0,
    "coreMarketplace": {
      "target": 9067308.0,
      "targetPercentage": 0.0053,
      "expectedGP": 615670.0,
      "expectedCM": 307835.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 9067308.0,
      "targetPercentage": 0.0053,
      "saasAddOn": 92351.0,
      "expectedGP": 708021.0,
      "expectedCM": 400186.0
    },
    "coreSaaS": {
      "revenue": 307835.0,
      "expectedGP": 307835.0,
      "expectedCM": 307835.0
    },
    "proSaaS": {
      "revenue": 400186.0,
      "expectedGP": 400186.0,
      "expectedCM": 400186.0
    },
    "annual_freight_spend": 1750000000.0,
    "coreMarketplace": {
      "target": 9153846.0,
      "targetPercentage": 0.0052,
      "expectedGP": 621546.0,
      "expectedCM": 310773.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 9153846.0,
      "targetPercentage": 0.0052,
      "saasAddOn": 93232.0,
      "expectedGP": 714778.0,
      "expectedCM": 404005.0
    },
    "coreSaaS": {
      "revenue": 310773.0,
      "expectedGP": 310773.0,
      "expectedCM": 310773.0
    },
    "proSaaS": {
      "revenue": 404005.0,
      "expectedGP": 404005.0,
      "expectedCM": 404005.0
    },
    "annual_freight_spend": 1775000000.0,
    "coreMarketplace": {
      "target": 9239103.0,
      "targetPercentage": 0.0052,
      "expectedGP": 627335.0,
      "expectedCM": 313668.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 9239103.0,
      "targetPercentage": 0.0052,
      "saasAddOn": 94100.0,
      "expectedGP": 721435.0,
      "expectedCM": 407768.0
    },
    "coreSaaS": {
      "revenue": 313668.0,
      "expectedGP": 313668.0,
      "expectedCM": 313668.0
    },
    "proSaaS": {
      "revenue": 407768.0,
      "expectedGP": 407768.0,
      "expectedCM": 407768.0
    },
    "annual_freight_spend": 1800000000.0,
    "coreMarketplace": {
      "target": 9323077.0,
      "targetPercentage": 0.0052,
      "expectedGP": 633037.0,
      "expectedCM": 316518.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 9323077.0,
      "targetPercentage": 0.0052,
      "saasAddOn": 94956.0,
      "expectedGP": 727992.0,
      "expectedCM": 411474.0
    },
    "coreSaaS": {
      "revenue": 316518.0,
      "expectedGP": 316518.0,
      "expectedCM": 316518.0
    },
    "proSaaS": {
      "revenue": 411474.0,
      "expectedGP": 411474.0,
      "expectedCM": 411474.0
    },
    "annual_freight_spend": 1825000000.0,
    "coreMarketplace": {
      "target": 9405769.0,
      "targetPercentage": 0.0052,
      "expectedGP": 638652.0,
      "expectedCM": 319326.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 9405769.0,
      "targetPercentage": 0.0052,
      "saasAddOn": 95798.0,
      "expectedGP": 734449.0,
      "expectedCM": 415124.0
    },
    "coreSaaS": {
      "revenue": 319326.0,
      "expectedGP": 319326.0,
      "expectedCM": 319326.0
    },
    "proSaaS": {
      "revenue": 415124.0,
      "expectedGP": 415124.0,
      "expectedCM": 415124.0
    },
    "annual_freight_spend": 1850000000.0,
    "coreMarketplace": {
      "target": 9487179.0,
      "targetPercentage": 0.0051,
      "expectedGP": 644179.0,
      "expectedCM": 322090.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 9487179.0,
      "targetPercentage": 0.0051,
      "saasAddOn": 96627.0,
      "expectedGP": 740806.0,
      "expectedCM": 418717.0
    },
    "coreSaaS": {
      "revenue": 322090.0,
      "expectedGP": 322090.0,
      "expectedCM": 322090.0
    },
    "proSaaS": {
      "revenue": 418717.0,
      "expectedGP": 418717.0,
      "expectedCM": 418717.0
    },
    "annual_freight_spend": 1875000000.0,
    "coreMarketplace": {
      "target": 9567308.0,
      "targetPercentage": 0.0051,
      "expectedGP": 649620.0,
      "expectedCM": 324810.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 9567308.0,
      "targetPercentage": 0.0051,
      "saasAddOn": 97443.0,
      "expectedGP": 747063.0,
      "expectedCM": 422253.0
    },
    "coreSaaS": {
      "revenue": 324810.0,
      "expectedGP": 324810.0,
      "expectedCM": 324810.0
    },
    "proSaaS": {
      "revenue": 422253.0,
      "expectedGP": 422253.0,
      "expectedCM": 422253.0
    },
    "annual_freight_spend": 1900000000.0,
    "coreMarketplace": {
      "target": 9646154.0,
      "targetPercentage": 0.0051,
      "expectedGP": 654974.0,
      "expectedCM": 327487.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 9646154.0,
      "targetPercentage": 0.0051,
      "saasAddOn": 98246.0,
      "expectedGP": 753220.0,
      "expectedCM": 425733.0
    },
    "coreSaaS": {
      "revenue": 327487.0,
      "expectedGP": 327487.0,
      "expectedCM": 327487.0
    },
    "proSaaS": {
      "revenue": 425733.0,
      "expectedGP": 425733.0,
      "expectedCM": 425733.0
    },
    "annual_freight_spend": 1925000000.0,
    "coreMarketplace": {
      "target": 9723718.0,
      "targetPercentage": 0.0051,
      "expectedGP": 660240.0,
      "expectedCM": 330120.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 9723718.0,
      "targetPercentage": 0.0051,
      "saasAddOn": 99036.0,
      "expectedGP": 759277.0,
      "expectedCM": 429156.0
    },
    "coreSaaS": {
      "revenue": 330120.0,
      "expectedGP": 330120.0,
      "expectedCM": 330120.0
    },
    "proSaaS": {
      "revenue": 429156.0,
      "expectedGP": 429156.0,
      "expectedCM": 429156.0
    },
    "annual_freight_spend": 1950000000.0,
    "coreMarketplace": {
      "target": 9800000.0,
      "targetPercentage": 0.005,
      "expectedGP": 665420.0,
      "expectedCM": 332710.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 9800000.0,
      "targetPercentage": 0.005,
      "saasAddOn": 99813.0,
      "expectedGP": 765233.0,
      "expectedCM": 432523.0
    },
    "coreSaaS": {
      "revenue": 332710.0,
      "expectedGP": 332710.0,
      "expectedCM": 332710.0
    },
    "proSaaS": {
      "revenue": 432523.0,
      "expectedGP": 432523.0,
      "expectedCM": 432523.0
    },
    "annual_freight_spend": 1975000000.0,
    "coreMarketplace": {
      "target": 9875000.0,
      "targetPercentage": 0.005,
      "expectedGP": 670513.0,
      "expectedCM": 335256.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 9875000.0,
      "targetPercentage": 0.005,
      "saasAddOn": 100577.0,
      "expectedGP": 771089.0,
      "expectedCM": 435833.0
    },
    "coreSaaS": {
      "revenue": 335256.0,
      "expectedGP": 335256.0,
      "expectedCM": 335256.0
    },
    "proSaaS": {
      "revenue": 435833.0,
      "expectedGP": 435833.0,
      "expectedCM": 435833.0
    },
    "annual_freight_spend": 2000000000.0,
    "coreMarketplace": {
      "target": 10000000.0,
      "targetPercentage": 0.005,
      "expectedGP": 679000.0,
      "expectedCM": 339500.0,
      "saasAddOn": 0
    },
    "proMarketplace": {
      "target": 10000000.0,
      "targetPercentage": 0.005,
      "saasAddOn": 101850.0,
      "expectedGP": 780850.0,
      "expectedCM": 441350.0
    },
    "coreSaaS": {
      "revenue": 339500.0,
      "expectedGP": 339500.0,
      "expectedCM": 339500.0
    },
    "proSaaS": {
      "revenue": 441350.0,
      "expectedGP": 441350.0,
      "expectedCM": 441350.0
    }
  }
]
