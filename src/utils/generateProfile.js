export function generate_profile() {
  const profile = [
    'bear',
    'crab',
    'dog',
    'jellyfish',
    'octopus',
    'pigeon',
    'reindeer',
    'squid',
    'starfish',
    'owl',
  ]
  return profile[Math.floor(Math.random() * Math.floor(9))]
}
