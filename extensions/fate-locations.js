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
  }
};