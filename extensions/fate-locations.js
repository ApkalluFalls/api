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
  // It's Not Lupus
  335: {
    location: 137,
    x: 31,
    y: 34
  }
};