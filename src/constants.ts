export const LINKS = {
  spotify: 'https://open.spotify.com/artist/2A3kRqveR7iDjFFnO8LYWq',
  spotifyEmbed: 'https://open.spotify.com/embed/artist/2A3kRqveR7iDjFFnO8LYWq',
  youtube: 'https://www.youtube.com/channel/UCnf8lvUfE1sABg_Nzy-byOg',
  tiktok: 'https://www.tiktok.com/@hazzler',
  instagram: 'https://www.instagram.com/hazzlermusic/',
  patreon:
    'https://patreon.com/hazzler?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink',
  gumroad: 'https://hazzler.gumroad.com',
  distrokid: 'https://distrokid.com/vip/seven/7237992',
} as const;

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'music', label: 'Music', href: '#music' },
  { id: 'videos', label: 'Videos', href: '#videos' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'join', label: 'Join', href: '#join' },
] as const;

export const EXTERNAL_REL = 'noopener noreferrer';
export const AFFILIATE_REL = 'noopener noreferrer sponsored';
