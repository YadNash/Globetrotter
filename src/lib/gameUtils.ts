
import { Destination } from './gameData';

// Get 1-2 random clues from the destination
export const getRandomClues = (destination: Destination, count: number = 2): string[] => {
  const clues = [...destination.clues];
  const shuffled = clues.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, clues.length));
};

// Get a random fun fact from the destination
export const getRandomFunFact = (destination: Destination): string => {
  const facts = destination.funFacts;
  const randomIndex = Math.floor(Math.random() * facts.length);
  return facts[randomIndex];
};

// Generate confetti elements for the correct answer
export const generateConfetti = (container: HTMLElement, count: number = 50): void => {
  const colors = ['#1e88e5', '#43a047', '#ffb300', '#e53935', '#8e24aa', '#00acc1'];
  
  // Clear any existing confetti first
  const existingConfetti = container.querySelectorAll('.confetti');
  existingConfetti.forEach(el => el.remove());
  
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    // Randomize confetti appearance
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 10 + 5;
    const left = Math.random() * 100;
    const angle = Math.random() * 360;
    const delay = Math.random() * 0.5;
    
    // Apply styles
    confetti.style.setProperty('--confetti-color', color);
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.left = `${left}%`;
    confetti.style.top = `-20px`;
    confetti.style.transform = `rotate(${angle}deg)`;
    confetti.style.animationDelay = `${delay}s`;
    
    container.appendChild(confetti);
    
    // Remove confetti after animation completes
    setTimeout(() => {
      confetti.remove();
    }, 2000);
  }
};

// Save user data to localStorage
export const saveUserData = (username: string, score: number): void => {
  const userData = {
    username,
    score,
    lastPlayed: new Date().toISOString()
  };
  localStorage.setItem('globetrotterUser', JSON.stringify(userData));
};

// Get user data from localStorage
export const getUserData = () => {
  const data = localStorage.getItem('globetrotterUser');
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

// Generate a challenge URL
export const generateChallengeURL = (username: string): string => {
  // In a real app, this would create a unique URL with server-side logic
  // For now, we'll just encode the username in the URL
  const baseUrl = window.location.origin;
  return `${baseUrl}?challenger=${encodeURIComponent(username)}`;
};

// Check if the current session is from a challenge
export const checkForChallenge = (): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('challenger');
};
