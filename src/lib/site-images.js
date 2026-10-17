'use strict';

const root = '/assets/img/site-upscaled';
const image = (folder, file) => `${root}/${folder}/${file}`;

module.exports = Object.freeze({
  homepageHero: image('Homepage', '01_homepage_hero.jpg'),
  brandVision: image('Homepage', '02_brand_vision.jpg'),
  architecture: Object.freeze({
    'swahili-coastal': image('Architecture', '03_swahili_coastal.jpg'),
    victorian: image('Architecture', '04_victorian_georgian.jpg'),
    contemporary: image('Architecture', '07_contemporary_minimalist.jpg'),
  }),
  architectureInspiration: Object.freeze([
    {
      src: image('Architecture', '05_mediterranean_moorish.jpg'),
      title: 'Mediterranean and Moorish',
      alt: 'Mediterranean and Moorish architectural concept image',
    },
    {
      src: image('Architecture', '06_cape_dutch.jpg'),
      title: 'Cape Dutch',
      alt: 'Cape Dutch architectural concept image',
    },
    {
      src: image('Architecture', '08_african_inspired.jpg'),
      title: 'African-inspired forms',
      alt: 'African-inspired architectural concept image',
    },
  ]),
  apps: Object.freeze({
    home: image('Smart_Home', '09_smart_home_control.jpg'),
    farm: image('Agriculture', '11_smart_agriculture.jpg'),
    rent: image('Lifestyle', '19_lifestyle_comfort.jpg'),
    market: image('Real_Estate', '13_luxury_property_showcase.jpg'),
    school: image('Education', '15_modern_classroom.jpg'),
  }),
  appDetails: Object.freeze({
    home: image('Smart_Home', '10_smart_living_interior.jpg'),
    farm: image('Agriculture', '12_sustainable_farming.jpg'),
    rent: image('Lifestyle', '20_community_living.jpg'),
    market: image('Real_Estate', '14_interior_living_space.jpg'),
    school: image('Education', '16_online_learning.jpg'),
  }),
  technology: Object.freeze({
    innovation: image('Technology', '17_innovation_research.jpg'),
    infrastructure: image('Technology', '18_data_infrastructure.jpg'),
  }),
  materials: image('Brand_Assets', '21_materials_textures.jpg'),
  regionalLandscape: image('Brand_Assets', '22_nairobi_landscape.jpg'),
});
