
export interface Destination {
  id: string;
  name: string;
  city: string;
  country: string;
  clues: string[];
  funFacts: string[];
  trivia?: string[];
  images: {
    main: string;
    thumbnail?: string;
  };
  continent: string;
}

export const destinations: Destination[] = [
  {
    id: "paris",
    name: "Paris",
    city: "Paris",
    country: "France",
    clues: [
      "This city is home to a famous tower that sparkles every night.",
      "Known as the 'City of Love' and a hub for fashion and art.",
      "Its most famous museum houses the Mona Lisa."
    ],
    funFacts: [
      "This city has only one stop sign in the entire city—most intersections rely on priority-to-the-right rules.",
      "The Eiffel Tower was initially intended to be a temporary structure that would be dismantled after 20 years.",
      "It takes 20,000 light bulbs to make the city's iconic tower sparkle at night."
    ],
    trivia: [
      "This city is famous for its croissants and macarons. Bon appétit!",
      "Paris was originally a Roman city called Lutetia."
    ],
    images: {
      main: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000",
      thumbnail: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=400"
    },
    continent: "Europe"
  },
  {
    id: "tokyo",
    name: "Tokyo",
    city: "Tokyo",
    country: "Japan",
    clues: [
      "This city is the most populous metropolitan area in the world.",
      "Famous for its cherry blossom season and vibrant street life.",
      "Home to the world's busiest pedestrian crossing."
    ],
    funFacts: [
      "This city has over 12 million residents in the metropolitan area.",
      "It hosts the world's largest fish market, selling over 2,000 tons of seafood daily.",
      "You can find over 300,000 vending machines throughout this city."
    ],
    trivia: [
      "This city hosted the Summer Olympics twice, in 1964 and 2021.",
      "It has more Michelin-starred restaurants than any other city in the world."
    ],
    images: {
      main: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1000",
      thumbnail: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=400"
    },
    continent: "Asia"
  },
  {
    id: "new-york",
    name: "New York City",
    city: "New York City",
    country: "USA",
    clues: [
      "This city has a famous statue that was a gift from France.",
      "Known as 'The Big Apple' and never sleeps.",
      "Home to a famous park spanning 843 acres in the middle of the city."
    ],
    funFacts: [
      "Over 800 languages are spoken in this diverse city, making it the most linguistically diverse city in the world.",
      "The subway system has 472 stations, the most of any system worldwide.",
      "The iconic Times Square is named after The New York Times newspaper."
    ],
    trivia: [
      "This city's famous pizza style is known for large, foldable slices.",
      "The city was originally called New Amsterdam before being renamed."
    ],
    images: {
      main: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000",
      thumbnail: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=400"
    },
    continent: "North America"
  },
  {
    id: "sydney",
    name: "Sydney",
    city: "Sydney",
    country: "Australia",
    clues: [
      "This city is famous for its distinctive opera house with sail-shaped shells.",
      "It hosted the Summer Olympics in 2000.",
      "Home to one of the world's most famous harbors and beaches."
    ],
    funFacts: [
      "The iconic Opera House has over one million roof tiles.",
      "The Sydney Harbour Bridge is the world's largest steel arch bridge.",
      "Bondi Beach attracts over 2.5 million visitors annually."
    ],
    trivia: [
      "This city's name comes from a British Home Secretary named Thomas Townshend, Lord Sydney.",
      "It wasn't Australia's first settlement but grew to become its largest city."
    ],
    images: {
      main: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1000",
      thumbnail: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=400"
    },
    continent: "Oceania"
  },
  {
    id: "rio-de-janeiro",
    name: "Rio de Janeiro",
    city: "Rio de Janeiro",
    country: "Brazil",
    clues: [
      "This city features a giant statue of Christ on a mountain overlooking the harbor.",
      "Known for its famous carnival celebration and beautiful beaches.",
      "It hosted the 2016 Summer Olympics, the first South American city to do so."
    ],
    funFacts: [
      "The famous statue overlooking the city stands 98 feet tall, not including its 26-foot pedestal.",
      "The city's name means 'January River' in Portuguese, though there is no river there.",
      "This city's famous Carnival attracts approximately 2 million people per day."
    ],
    trivia: [
      "This city was once the capital of Brazil from 1763 to 1960.",
      "Copacabana Beach is one of the most famous beaches in the world."
    ],
    images: {
      main: "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?q=80&w=1000",
      thumbnail: "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?q=80&w=400"
    },
    continent: "South America"
  },
  {
    id: "cairo",
    name: "Cairo",
    city: "Cairo",
    country: "Egypt",
    clues: [
      "This city sits near some of the world's most famous ancient pyramids.",
      "Located on the banks of the Nile River.",
      "It's home to one of the world's oldest Islamic universities."
    ],
    funFacts: [
      "It's the largest city in Africa and the Arab world.",
      "The city's traffic is legendary, with drivers creating as many as 8 unofficial lanes on 3-lane roads.",
      "Over 20 million people live in the greater metropolitan area."
    ],
    trivia: [
      "This city's name in Arabic means 'The Victorious'.",
      "The famous Egyptian Museum contains over 120,000 ancient Egyptian artifacts."
    ],
    images: {
      main: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=1000",
      thumbnail: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=400"
    },
    continent: "Africa"
  },
  {
    id: "venice",
    name: "Venice",
    city: "Venice",
    country: "Italy",
    clues: [
      "This city is built on more than 100 small islands in a lagoon.",
      "Instead of roads, it has canals and over 400 bridges.",
      "Famous for its gondolas and annual carnival with elaborate masks."
    ],
    funFacts: [
      "This city has no cars or roadways, just canals and over 400 bridges.",
      "The entire city is listed as a UNESCO World Heritage Site.",
      "It's slowly sinking at a rate of about 1-2mm per year."
    ],
    trivia: [
      "Marco Polo, the famous explorer, was born in this city.",
      "The city hosts the world's oldest film festival, established in 1932."
    ],
    images: {
      main: "https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?q=80&w=1000",
      thumbnail: "https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?q=80&w=400"
    },
    continent: "Europe"
  },
  {
    id: "dubai",
    name: "Dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    clues: [
      "This city is home to the world's tallest building since 2010.",
      "Known for luxury shopping, ultramodern architecture, and a lively nightlife scene.",
      "Features man-made islands in the shape of palm trees and a world map."
    ],
    funFacts: [
      "It transformed from a small fishing village to a global city in just 50 years.",
      "The police force uses luxury supercars like Lamborghinis and Ferraris.",
      "This city has the world's largest choreographed fountain system."
    ],
    trivia: [
      "This city's tallest building is over 2,700 feet tall with more than 160 floors.",
      "About 85% of the city's population consists of expatriates."
    ],
    images: {
      main: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000",
      thumbnail: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=400"
    },
    continent: "Asia"
  }
];

// Get a random list of destinations for answer options
export const getRandomDestinations = (count: number, excludeId?: string): Destination[] => {
  const filteredDestinations = excludeId 
    ? destinations.filter(dest => dest.id !== excludeId) 
    : [...destinations];
  
  const shuffled = [...filteredDestinations].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Get a random destination
export const getRandomDestination = (): Destination => {
  const randomIndex = Math.floor(Math.random() * destinations.length);
  return destinations[randomIndex];
};

// Create answer options with one correct destination and others as decoys
export const createAnswerOptions = (correctDestination: Destination, optionCount: number = 4): Destination[] => {
  const decoys = getRandomDestinations(optionCount - 1, correctDestination.id);
  const options = [correctDestination, ...decoys];
  return options.sort(() => 0.5 - Math.random()); // Shuffle options
};
