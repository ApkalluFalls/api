/**
 * This array provides extensions to mappy NPC data.
 * If `npm run update website` has warnings like `Missing map data for NPC {ID}...` they can be
 * manually entered here instead. NPCs are missing when they're from expired events, or simply from
 * times when Mappy hasn't captured new NPC positions.
 * 
 * Data IDs must be added to the first array, then mapped to a location afterwards. Failure to do
 * so will result in an error.
 * 
 * Remember that `npm run update data` will need running to apply any changes.
 * 
 * NPC locations can be found per ID from Garland Tools' DB, i.e. at:
 * https://garlandtools.org/db/#npc/1017172.
 */
module.exports = [
  1018723, 1018724, 1018725, 1024166, 1024167, 1024168, 1025470, 1026635, 1026636, 1026637,
  1028400, 1016093, 1023940, 1023794, 1018128, 1018129, 1018130, 1017844, 1017230, 1012135,
  1016902, 1016903, 1016904, 1005159, 1025313, 1017172, 1016264, 1019804, 1010753, 1010757,
  1010761, 1010780, 1010781, 1010782, 1010790, 1010791, 1010792, 1010793, 1010794, 1010795,
  1005970, 1009290
].map(id => {
  let location;
  let x;
  let y;

  switch (id) {
    case 1010780: // Mammet Dispensator #012P
    case 1010790: // Mammet Dispensator #012P
    case 1016902: // Dreamer
    case 1017844: // Alluring Peddler
    case 1018128: // Green Tori
    case 1018723: // House Valentione Maid
    case 1024166: // Starlight Celebrant
    case 1025313: // House Valentione Maid
    case 1026635: // Starlight Celebrant
      location = 133; // Old Gridania
      x = 11;
      y = 9;
      break;
    case 1010781: // Mammet Dispensator #012P
    case 1010791: // Mammet Dispensator #012P
    case 1016903: // Dreamer
    case 1018129: // Red Tori
    case 1018724: // House Valentione Maid
    case 1024167: // Starlight Celebrant
    case 1026636: // Starlight Celebrant
    case 1028400: // Ironworks Hand
      location = 128; // Limsa Lominsa Upper Decks
      x = 11;
      y = 14;
      break;
    case 1009290: // Rising Vendor
    case 1010782: // Mammet Dispensator #012P
    case 1010792: // Mammet Dispensator #012P
    case 1016904: // Dreamer
    case 1018130: // Blue Tori
    case 1018725: // House Valentione Maid
    case 1023940: // Rising Vendor
    case 1024168: // Starlight Celebrant
    case 1025470: // Royal Servant
    case 1026637: // Starlight Celebrant
      location = 182; // Ul'dah - Steps of Nald
      x = 11;
      y = 9;
      break;
    case 1016264: // Spoils Collector
    case 1019804: // Spoils Collector
      location = 512; // The Diadem
      x = 9;
      y = 19;
      break;
    case 1010761: // Mammet Dispensator #012P
    case 1010793: // Mammet Dispensator #012P
      location = 340; // The Lavender Beds
      x = 11;
      y = 14;
      break;
    case 1010757: // Mammet Dispensator #012P
    case 1010794: // Mammet Dispensator #012P
      location = 339; // Mist
      x = 12;
      y = 12;
      break;
    case 1010753: // Mammet Dispensator #012P
    case 1010795: // Mammet Dispensator #012P
      location = 341; // The Goblet
      x = 12;
      y = 12;
      break;
    case 1016093: // Luna Vanu
      location = 401; // The Sea of Clouds
      x = 7;
      y = 14;
      break;
    case 1023794: // Wunthyll
      location = 137; // Eastern La Noscea
      x = 37;
      y = 31;
      break;
    case 1017230: // P'obyano
      location = 137; // Eastern La Noscea
      x = 33;
      y = 29;
      break;
    case 1012135: // Junkmonger
      location = 463; // Matoya's Cave
      x = 7;
      y = 6;
      break;
    case 1005159: // Haneko Burneko
      location = 212; // The Waking Sands
      x = 6;
      y = 5;
      break;
    case 1017172: // Mogmul Mogbelly
      location = 400; // The Churning Mists
      x = 16;
      y = 29;
      break;
    case 1005970: // Itinerant Moogle
      location = 132; // New Gridania
      x = 12;
      y = 12;
      break;
    default:
      throw new Error(`NPC extension ${id} added to array but not handled in mapping.`);
  }

  return {
    id,
    location,
    type: 'NPC',
    x,
    y
  }
});