'use strict';

const root = '/assets/img/site-upscaled';
const image = (folder, file) => `${root}/${folder}/${file}`;
const remote = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

module.exports = Object.freeze({
  homepageHero: remote('photo-1512917774080-9991f1c4c750'),
  brandVision: remote('photo-1494526585095-c41746248156'),
  architecture: Object.freeze({
    'swahili-coastal': remote('photo-1505693416388-ac5ce068fe85'),
    victorian: remote('photo-1460317442991-0ec209397118'),
    contemporary: remote('photo-1502672260266-1c1ef2d93688'),
  }),
  architectureInspiration: Object.freeze([
    {
      src: remote('photo-1600585154340-be6161a56a0c'),
      title: 'Mediterranean and Moorish',
      alt: 'Luxury modern villa exterior inspired by Mediterranean architecture',
    },
    {
      src: remote('photo-1600607687939-ce8a6c25118c'),
      title: 'Cape Dutch',
      alt: 'Contemporary hillside home with glass living spaces',
    },
    {
      src: remote('photo-1512917774080-9991f1c4c750'),
      title: 'African-inspired forms',
      alt: 'Warm-toned contemporary home with courtyard living',
    },
  ]),
  apps: Object.freeze({
    home: remote('photo-1505693416388-ac5ce068fe85'),
    farm: image('Agriculture', '11_smart_agriculture.jpg'),
    rent: remote('photo-1484154218962-a197022b5858'),
    market: remote('photo-1600573472550-8090b5e0745e'),
    school: image('Education', '15_modern_classroom.jpg'),
  }),
  appDetails: Object.freeze({
    home: remote('photo-1494526585095-c41746248156'),
    farm: image('Agriculture', '12_sustainable_farming.jpg'),
    rent: remote('photo-1502672260266-1c1ef2d93688'),
    market: remote('photo-1600607687939-ce8a6c25118c'),
    school: image('Education', '16_online_learning.jpg'),
  }),
  technology: Object.freeze({
    innovation: image('Technology', '17_innovation_research.jpg'),
    infrastructure: image('Technology', '18_data_infrastructure.jpg'),
  }),
  materials: image('Brand_Assets', '21_materials_textures.jpg'),
  regionalLandscape: image('Brand_Assets', '22_nairobi_landscape.jpg'),
});
