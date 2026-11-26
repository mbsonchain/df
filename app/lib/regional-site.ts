import {locations, type SiteId} from '~/content/site';
import centers from '~/content/time-zone-centers.json';

// Representative locations from the public-domain IANA tzdb 2026c zone.tab
// with its historical zone aliases. Used only when access coordinates are missing.
const zoneCenters: Readonly<Record<string, readonly number[]>> = centers;
const radians = (degrees: number) => degrees * Math.PI / 180;

function nearestSite(latitude: number, longitude: number): SiteId {
  const visitorLatitude = radians(latitude);
  let nearest: SiteId = locations[0].id;
  let bestScore = -Infinity;
  for (const site of locations) {
    const siteLatitude = radians(site.latitude);
    // Maximizing the cosine of the central angle minimizes great-circle distance.
    const score = Math.sin(visitorLatitude) * Math.sin(siteLatitude)
      + Math.cos(visitorLatitude) * Math.cos(siteLatitude) * Math.cos(radians(longitude - site.longitude));
    if (score > bestScore) {
      bestScore = score;
      nearest = site.id;
    }
  }
  return nearest;
}

export function siteForTimeZone(zone: string | null): SiteId | null {
  if (!zone || !Object.hasOwn(zoneCenters, zone)) return null;
  const [latitude, longitude] = zoneCenters[zone];
  return nearestSite(latitude, longitude);
}

function coordinate(value: string | null, limit: number): number | null {
  if (!value?.trim()) return null;
  const number = Number(value);
  return Number.isFinite(number) && Math.abs(number) <= limit ? number : null;
}

export function siteForAccess(headers: Headers): SiteId | null {
  const latitude = coordinate(headers.get('oxygen-buyer-latitude'), 90);
  const longitude = coordinate(headers.get('oxygen-buyer-longitude'), 180);
  if (latitude !== null && longitude !== null) return nearestSite(latitude, longitude);
  return siteForTimeZone(headers.get('oxygen-buyer-timezone'));
}
