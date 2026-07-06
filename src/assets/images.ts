const images = {
  loaderBg: require('./windsor-my-hub-loader-bg.png'),
  loaderIcon: require('./windsor-my-hub-loader-icon.png'),
  onboardBg1: require('./windsor-my-hub-onboard-bg-1.png'),
  onboardBg2: require('./windsor-my-hub-onboard-bg-2.png'),
  onboardBg3: require('./windsor-my-hub-onboard-bg-3.png'),
  onboardBg4: require('./windsor-my-hub-onboard-bg-4.png'),
  onboardBg5: require('./windsor-my-hub-onboard-bg-5.png'),
  GrilledAngusRibeye: require('./windsor-my-hub-grilled-angus-ribeye.png'),
  HerbRoastedSalmon: require('./windsor-my-hub-herb-roasted-salmon.png'),
  FiletMignonDeluxe: require('./windsor-my-hub-filet-mignon-deluxe.png'),
  RoastedChickenSupreme: require('./windsor-my-hub-roasted-chicken-supreme.png'),
  SurfAndTurfPlate: require('./windsor-my-hub-surf-and-turf-plate.png'),
  CreamyChickenAlfredo: require('./windsor-my-hub-creamy-chicken-alfredo.png'),
  ClassicBeefLasagna: require('./windsor-my-hub-classic-beef-lasagna.png'),
  MargheritaPizza: require('./windsor-my-hub-margherita-pizza.png'),
  ChickenCaesarWrap: require('./windsor-my-hub-chicken-caesar-wrap.png'),
  GourmetCheeseburger: require('./windsor-my-hub-gourmet-cheeseburger.png'),
  ChocolateLavaCake: require('./windsor-my-hub-chocolate-lava-cake.png'),
  NewYorkCheesecake: require('./windsor-my-hub-new-york-cheesecake.png'),
  FreshFruitPlatter: require('./windsor-my-hub-fresh-fruit-platter.png'),
  TiramisuDelight: require('./windsor-my-hub-tiramisu-delight.png'),
  IceCreamSelection: require('./windsor-my-hub-ice-cream-selection.png'),
};

export type ImageKey = keyof typeof images;

export function getImage(key: string) {
  return images[key as ImageKey];
}

export default images;
