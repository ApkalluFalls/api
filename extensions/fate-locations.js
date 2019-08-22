/**
 * FATE locations are not stored client-side and aren't tracked by Mappy, so they need to be
 * manually mapped here.
 * 
 * If `npm run update website` has warnings like:
 * `An extension is required for FATE ...'s location. Skipping.` they can be manually entered here
 * instead.
 * 
 * FATE locations can be found per ID from Garland Tools' DB, i.e. at:
 * https://garlandtools.org/db/#fate/335.
 */
module.exports = {
  // Clearing the Hive
  160: {
    location: 153,
    x: 21,
    y: 16
  },
  // Attack on Highbridge: Act III
  194: {
    location: 145,
    x: 22,
    y: 21
  },
  // Lazy For You
  218: {
    location: 152,
    x: 23,
    y: 29
  },
  // It's Not Lupus
  335: {
    location: 137,
    x: 31,
    y: 34
  },
  // Poor Maid's Misfortune
  453: {
    location: 139,
    x: 11,
    y: 24
  },
  // The Eyes Have It
  507: {
    location: 155,
    x: 15,
    y: 19
  },
  // Go, Go, Gorgimera
  647: {
    location: 147,
    x: 17,
    y: 14
  },
  // On Dangerous Ground
  855: {
    location: 401,
    x: 21,
    y: 12
  },
  // Vedrfolnir Devoteth
  871: {
    location: 400,
    x: 11,
    y: 36
  },
  // Secret Of The Lost Legend (Diadem)
  968: {
    location: 512
  },
  // Where's The Beef (Diadem)
  1035: {
    location: 512
  },
  // Blood Wings (Diadem)
  1050: {
    location: 512
  },
  // On The Inside (Diadem)
  1094: {
    location: 512
  },
  // The Evil Seed
  1129: {
    location: 612,
    x: 15,
    y: 22
  },
  // Never Say Daimyo
  1172: {
    location: 613,
    x: 17,
    y: 9
  },
  // Rattle And Humbaba
  1194: {
    location: 620,
    x: 15,
    y: 30
  },
  // Wine And Honey (Eureka Anemos)
  1331: {
    location: 732
  },
  // Short Serket 2 (Eureka Anemos)
  1339: {
    location: 732
  },
  // The Shadow Over Anemos (Eureka Anemos)
  1348: {
    location: 732
  },
  // The Baldesion Arsenal: Expedition Support (Eureka Hydatos)
  1422: {
    location: 827,
    x: 18,
    y: 28
  }
};