import { OlfactoryNote, Testimonial, FaqItem, Benefit } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGUNK2XI5jarBX9hbiG8sNaeE2rEEZa2WXLPXw-ED8naHzIjPDQKvawUJsZowpje1sMarT6CuWkzgmzkuprmNBfPNRh2VV37Q2hQZAfFGd0ATtwH92Y2gqcXzOmfNLkwTZyKXwSZ7iUeWDUrhUrecAQCEDzP4xlALZSuqGXQ2OSyzQvSempasHp7dDt14oZL_jvOgPCAFlmbRayuc7NcwOntgusBArcyE9RuJdVju7Vqm2tkWpwWQz4ASa9UlB-hqzyBY',
  heroBottle: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzVoAFLl5-WOFdNH4afqsAux9LLP-8j6JUWiZhKR4b2v-emlwTUygmJGLsU0ug9CzyWD8fwFcJEWXE6GxpK3uZbZRWJIpWoJPXfVgYExMIw-eml5Wu2N8asfYyWoq4i35GQzInXthq0Qi6hizEVsDMysVjgWUeDB6T7DO-6Hc6jXXj2kz3QSVelb6k9j7KizrR5EP58TZ-9LuCLdkZjGupm9aFNJKj0e7unJTqAbwyR3SanxMKHMnuUEmxAQ7-FmK2nSA',
  openingCitrus: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeRr1F-_-J2Ffr5aA0nHqdYOZaHbCuXfck8n3UE626O1R0utczAdu4SUEDit4dlx7X5AkBli-CTsZ6Ka7R8q6Fqz9XMsAiORSSg-xDnEfDuSPOw04Q5tqnnqvNllJN_6P9JRvcbiRifwvc8Hs1_b0syQui5WjAemliEFRvAO-T5jFHLB3k0s9xt1fKTAYMIuIGRhMVwBiw9g-vxfCo7TsdX_j8O8KhByevySjmV0_1DFv_IkV-GUSbU_egJcmIsb_CSAg',
  drydownWood: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCjOBGgQROvcyo0lniEVU90SZ4ezadlwUClio2OqSV2ZQPWBGqkd3jy5hexFK_HNmn5p-oh-zecLmuyu0KWGfwU8wjo0fMTh4gTzDTBeoVOjTRNYZ5nAWFMhwa_TQTRFVFSplpKrifAiywgO3MXpfEsWmK7W61qkRol43y-grVVCAJqpSUaKm4QWW5-KFyjJIcFuPYV5ZdCZuY7EfBscj2WRni5fVwm1x3K5r7giN6gn7DsTwlFxDy9FIAvqwLRgtR-gY',
  lifestyleExecutive: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSVH8EAw79f9Xw8SzwEG9CBVTSxJCbw_PDlt0RDvjfNWG_twZb1kaakifCn1PKKnTr9QEWuVe2rZtnrqgC2dLq4bhiZMr9E9Wf-bH_iOteOUdsaqzBFJuXwUZi6Xf-aFsuncjVbfD5tuvYfBhKBBuv82tIX34M8ByaWHfZ1ABQ-fVHgW-kdo8ZNML-LGWdWpxj-jYrWVDb1w-eSDaKsIf_heNWyMJzorH6JFT3hZA82psg4AWtLrYcn9jKNjYVgL1Zpy0',
  offerPromo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmHojlKp_7Hs6UQpG8ACtBIHB9M6GtDfXgk8AR5TRRX3iUvySVTG8N0C7am3FRBRcKaqSgKUqsIqg6dC9Idjl_wdim_ygx4UDlAkUS_3_fLR0QyyyxWq6Qfz5w2wrMIcJn_q0NcKiV2H3g_O48xVAnO-NV2M4Dbrpauvp4jeBsdLo8sUQSJ9ziIrHnwdJb1XT54uSkNl9aTcxUWXXbVZrZ3PTMypuOmzvCsH9Ch9ky70KD7_imoaiW00Rxs-DbPMnR8Uk',
  finalAtmosphere: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC25hYoFIJb-aKRNaWDHXqou7xPiQf1-ZeFxbWiHiprcv7f3j9e9EblwZ3-MhoLHhp7HIkFz8Mtx_N-DEu7wsGn0B5-rexgqEtDS2b1OKlhbs1XIysBRtSuw9ZpjcPdLSafrOojhA_tAiwNSUE_9eFGyUhGuSTbyxjRzdhX5JEVBKVtjgWIGZ0wE7TKgjZDengIEa3F0lYOrNciYZA0vc8FwwPvg19M8u65JhQO7Elhdoi8ZCSz4-RAyNezCN7Q39IMUHg',
  stickyThumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4k430Tn5L4_0un5Dkzo5RNB7RVwCY33CYTRRYpkM7Oe23akUXhQiRfMXIevSgzoL00qJ5Cqurnn0w_DpP_plbYR3ifZL8FY2ps794-ttudsObVZn4H1ea4y_tFIYt-krpgQpvm0Vb_1DSKBz_dBIA9m7mBZtCZn2B6SvikpGaA0LcjwUz_ifkASiGkxsEhDZjBgrk8lLrMsxjnMMQVjAZO6QIMGixOztN8KZTfq3xtWlbUOgyFMbytLDXy9qCOvf_Q5s',
  footerLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXzqGwBY0sykMsXsKRbwcBDIIoWPQ0SLcDW5gi-Qc-RIBPUYF-no8C7xuKzhkvOO7I2v_T3Mupr5h1O6lJBVVjWMZ3AvMW6iuPF5PuAiEeTURtSdWiV_mswPPTyfMCBbMBzxJnZadn1YRB-Vo_T8F-z45StW1ySXsvP5EnziwUQhoOCEU_nkh3zkBztssVz5PPqJEplgpeZE4Otqo4LtWmjFpqs-K2FfUB4WKNRj5f6jV5KRSDTEb_mWLZa8sq_XARTkU'
};

export const PRODUCT_DETAILS = {
  name: 'Khushboo Extrait De Parfum',
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
    description: 'A fragrance created to stay with you throughout your day. Formulated with Extrait-level oil concentration.'
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
    answer: 'Khushboo is designed for strong performance and lasting presence. As an Extrait de Parfum concentration, users report lingering projection between 12 to 16+ hours on skin and multiple days on cotton or wool suits.'
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
