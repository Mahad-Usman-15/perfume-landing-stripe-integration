import { OlfactoryNote, Testimonial, FaqItem, Benefit } from '../types';
import logoImg from '../assets/logo.png';
import heroImg from '../assets/hero.png';
import discountImg from '../assets/discount.png';
import productImg from '../assets/product.png';
import menImg from '../assets/men.png';
import stillLifeImg from '../assets/still-life.png';

export const ASSETS = {
  logo: logoImg,
  heroBottle: heroImg,
  openingCitrus: stillLifeImg,
  drydownWood: productImg,
  lifestyleExecutive: menImg,
  offerPromo: discountImg,
  finalAtmosphere: heroImg,
  stickyThumbnail: productImg,
  footerLogo: logoImg,
};

export const PRODUCT_DETAILS = {
  name: 'Khushboo Premium Perfume',
  volume: '100ml / 3.4 FL.OZ',
  regularPrice: 2667,
  discountPrice: 2000,
  savings: 667,
  discountPercentage: 25,
  offerExpiry: '15 September',
  deliveryCost: 0,
  savedDelivery: 250,
  currency: 'Rs.'
};

export const OLFACTORY_STAGES: OlfactoryNote[] = [
  {
    stage: 'STAGE 01 • TOP NOTES',
    hours: '0 - 2 Hours',
    title: 'Fresh Confidence',
    ingredients: 'Pineapple • Lemon • Bergamot • Pear • Plum',
    description: "A fresh opening that creates an energetic first impression. Crisp high notes slice through Karachi's heat while radiating effortless vitality.",
    projection: 'Intense',
    originOrCharacter: {
      label: 'Origin',
      value: 'Sicilian Citrus'
    }
  },
  {
    stage: 'STAGE 02 • HEART NOTES',
    hours: '2 - 6 Hours',
    title: 'Executive Character',
    ingredients: 'Cedarwood • Tobacco • Patchouli',
    description: 'A sophisticated masculine heart with depth and personality. Blends seasoned timber and cured tobacco leaves that anchor your presence in meetings.',
    projection: 'Sophisticated',
    originOrCharacter: {
      label: 'Character',
      value: 'Commanding'
    }
  },
  {
    stage: 'STAGE 03 • BASE NOTES',
    hours: '6 - 16+ Hours',
    title: 'Unforgettable Memory',
    ingredients: 'Sandalwood • Musk • Smoky Accords',
    description: 'A warm and lasting finish that stays memorable. Intimate whispers of burnt cedar and sensual musk lingering softly on coats and cuffs until midnight.',
    projection: 'Intimate Sillage',
    originOrCharacter: {
      label: 'Longevity',
      value: '16+ Hours'
    }
  }
];

export const BENEFITS: Benefit[] = [
  {
    id: 'b1',
    icon: 'schedule',
    title: 'Long Lasting Performance',
    description: 'A fragrance created to stay with you throughout your day. Formulated with high perfume oil concentration for long-lasting performance.'
  },
  {
    id: 'b2',
    icon: 'diamond',
    title: 'Premium Scent Profile',
    description: 'A balanced blend of freshness, warmth, and sophistication engineered for modern executive distinction.'
  },
  {
    id: 'b3',
    icon: 'ac_unit',
    title: 'Perfect For Pakistan Weather',
    description: 'Fresh enough for Karachi’s warm climate with a powerful masculine finish that never cloys or vanishes.'
  },
  {
    id: 'b4',
    icon: 'savings',
    title: 'Affordable Luxury',
    description: 'Experience a premium fragrance without the premium price. Direct-from-atelier bottle delivery.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    rating: 5,
    quote: "I’ve tried quite a few perfumes, but Khushboo is my absolute favorite.",
    author: 'Tariq M.',
    role: 'Managing Partner',
    city: 'Lahore',
    verified: true
  },
  {
    id: 't2',
    rating: 5,
    quote: "The fragrance gives a warm, rich, and slightly smoky character. The tobacco note makes it feel deeper and more sophisticated. 5/5 from me.",
    author: 'Shahmeer K.',
    role: 'Corporate Director',
    city: 'Islamabad',
    verified: true
  },
  {
    id: 't3',
    rating: 5,
    quote: "This is my fourth bottle of Khushboo. I have purchased its roll-on as well and I’m obsessed with this fragrance.",
    author: 'Bilal Raza',
    role: 'Creative Lead',
    city: 'Karachi',
    verified: true
  },
  {
    id: 't4',
    rating: 5,
    quote: "The longevity in Pakistani summer is unmatched. Sits on clothes for days and projects effortlessly.",
    author: 'Zain H.',
    role: 'Investment Banker',
    city: 'Karachi',
    verified: true
  },
  {
    id: 't5',
    rating: 5,
    quote: "Best perfume for summer. I am personally in love with Lemon & Pineapple. This one is best for hot n humid weather of Pakistan. Strong and Sillage is high. Some of its notes (this is totally my personal view and you have the right to disagree) slightly touches the creamy pineapple & Khushboo. Recommended!!!",
    author: 'Farhan A.',
    role: 'Brand Strategist',
    city: 'Karachi',
    verified: true
  },
  {
    id: 't6',
    rating: 5,
    quote: "Almost all their fragrances are good. Some stay for longer some a little less. Also depends on the individual. If you something to stay close with you, not very loud then it is a perfect one. Sillage is little low. Otherwise the perfume is very good.",
    author: 'Usman S.',
    role: 'Software Consultant',
    city: 'Lahore',
    verified: true
  },
  {
    id: 't7',
    rating: 5,
    quote: "Indeed people go through a mass of fragrances but the experience I have gained so far using Khushboo is unexplainable. Its aroma entice others to buy it without thinking for a while. I recommend it to all who want to fall in love with Khushboo.",
    author: 'Hamza N.',
    role: 'Commercial Lead',
    city: 'Islamabad',
    verified: true
  },
  {
    id: 't8',
    rating: 5,
    quote: "Remarkable sillage and a refined opening. The citrus and smoky wood balance is truly signature-worthy.",
    author: 'Daniyal M.',
    role: 'Architect',
    city: 'Rawalpindi',
    verified: true
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq1',
    question: 'How long does Khushboo last?',
    answer: 'Khushboo is designed for strong performance and lasting presence. Formulated with high oil concentration, users report lingering projection between 12 to 16+ hours on skin and multiple days on cotton or wool suits.'
  },
  {
    id: 'faq2',
    question: 'Is Khushboo suitable for Karachi weather?',
    answer: 'Yes. The fresh opening makes it suitable for warm and humid environments. The initial blast of pineapple, bergamot, and Sicilian lemon pierces through high humidity before settling comfortably into a warm dry tobacco accord.'
  },
  {
    id: 'faq3',
    question: 'What payment methods are accepted?',
    answer: 'We accept secure online bank transfers, debit/credit cards, and verified digital payment methods with instant order confirmation and express nationwide courier dispatch.'
  },
  {
    id: 'faq4',
    question: 'Is Khushboo suitable for office use?',
    answer: 'Yes. It is designed as a professional signature fragrance. While distinct and noticeable, its sillage maintains executive composure without inducing headaches or overwhelming colleagues in enclosed conference rooms.'
  }
];

export const MAJOR_CITIES_PAKISTAN = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Sargodha',
  'Other City'
];
