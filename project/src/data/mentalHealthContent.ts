import { MentalHealthContent, BreathingExercise } from '../types';

export const mentalHealthContent: MentalHealthContent = {
  tips: [
    "Take 5 deep breaths when you feel overwhelmed. This activates your parasympathetic nervous system.",
    "Practice the 5-4-3-2-1 grounding technique: 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste.",
    "Write down 3 things you're grateful for today. Gratitude rewires your brain for positivity.",
    "Take a 10-minute walk outside. Nature and movement are powerful mood boosters.",
    "Set boundaries with technology. Consider a 'phone-free' hour before bed.",
    "Practice self-compassion. Treat yourself with the same kindness you'd show a good friend.",
    "Create a bedtime routine to improve sleep quality. Good sleep is foundational to mental health.",
    "Connect with someone you care about. Social connection is essential for wellbeing.",
    "Try progressive muscle relaxation: tense and release each muscle group from toes to head.",
    "Practice mindful eating. Focus on the taste, texture, and smell of your food."
  ],
  quotes: [
    "You are braver than you believe, stronger than you seem, and smarter than you think. - A.A. Milne",
    "The only way out is through. - Robert Frost",
    "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared, or anxious. Having feelings doesn't make you a negative person. It makes you human.",
    "Healing isn't about erasing your past, it's about making peace with it.",
    "You are not your thoughts. You are the observer of your thoughts.",
    "Progress, not perfection. Every small step counts.",
    "It's okay to not be okay. What's not okay is suffering in silence.",
    "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
    "Be patient with yourself. Nothing in nature blooms all year.",
    "You are enough, just as you are, right now."
  ],
  exercises: [
    {
      name: "4-7-8 Breathing",
      description: "A calming technique that helps reduce anxiety and promote sleep",
      steps: [
        "Sit comfortably with your back straight",
        "Place your tongue against the roof of your mouth behind your front teeth",
        "Exhale completely through your mouth",
        "Inhale through your nose for 4 counts",
        "Hold your breath for 7 counts",
        "Exhale through your mouth for 8 counts",
        "Repeat this cycle 3-4 times"
      ],
      duration: 60,
      pattern: [4, 7, 8, 0]
    },
    {
      name: "Box Breathing",
      description: "A simple technique used by Navy SEALs to stay calm under pressure",
      steps: [
        "Sit upright in a comfortable position",
        "Exhale slowly through your mouth",
        "Inhale through your nose for 4 counts",
        "Hold your breath for 4 counts",
        "Exhale through your mouth for 4 counts",
        "Hold empty for 4 counts",
        "Repeat for 4-6 cycles"
      ],
      duration: 80,
      pattern: [4, 4, 4, 4]
    },
    {
      name: "Belly Breathing",
      description: "Deep diaphragmatic breathing to activate the relaxation response",
      steps: [
        "Lie down or sit comfortably",
        "Place one hand on your chest, one on your belly",
        "Breathe in slowly through your nose",
        "Feel your belly rise more than your chest",
        "Exhale slowly through pursed lips",
        "Feel your belly fall",
        "Continue for 5-10 minutes"
      ],
      duration: 120,
      pattern: [6, 2, 6, 2]
    }
  ],
  activities: [
    "Try journaling for 10 minutes. Write about your thoughts and feelings without judgment.",
    "Listen to your favorite calming music or nature sounds for 15 minutes.",
    "Do some gentle stretching or yoga poses to release physical tension.",
    "Take a warm bath or shower to relax your muscles and mind.",
    "Practice a creative activity like drawing, coloring, or crafting.",
    "Organize a small space in your home. A tidy environment can calm the mind.",
    "Call or text a friend or family member you haven't spoken to in a while.",
    "Try a new healthy recipe and mindfully prepare your meal.",
    "Read a few pages of a book that brings you joy or comfort.",
    "Practice meditation for 10-15 minutes using a guided app or video."
  ]
};

export const moodResponses = {
  happy: {
    greeting: "I'm so glad to hear you're feeling happy! Let's keep that positive energy flowing.",
    suggestions: ["Share your joy with someone special", "Reflect on what's making you happy", "Use this positive energy to tackle a small goal"]
  },
  sad: {
    greeting: "I understand you're feeling sad right now. That's completely okay and valid.",
    suggestions: ["Practice self-compassion", "Consider talking to someone you trust", "Try a gentle breathing exercise"]
  },
  anxious: {
    greeting: "I can sense you're feeling anxious. Let's work together to find some calm.",
    suggestions: ["Try the 5-4-3-2-1 grounding technique", "Practice deep breathing", "Limit caffeine and news consumption"]
  },
  stressed: {
    greeting: "Stress can be overwhelming. Let's focus on some techniques to help you feel more centered.",
    suggestions: ["Take regular breaks", "Practice progressive muscle relaxation", "Prioritize your tasks and delegate when possible"]
  },
  calm: {
    greeting: "It's wonderful that you're feeling calm and centered right now.",
    suggestions: ["Use this peaceful moment for reflection", "Practice gratitude", "Set positive intentions for your day"]
  },
  excited: {
    greeting: "Your excitement is contagious! Let's channel this energy positively.",
    suggestions: ["Share your excitement with others", "Use this energy for creative projects", "Remember to balance excitement with rest"]
  },
  angry: {
    greeting: "I understand you're feeling angry. It's important to acknowledge and process these feelings safely.",
    suggestions: ["Take deep breaths before responding", "Try physical exercise to release tension", "Express your feelings through writing"]
  },
  neutral: {
    greeting: "Sometimes feeling neutral is exactly what we need. How can I support you today?",
    suggestions: ["Check in with your basic needs", "Consider setting a small intention for today", "Practice mindfulness"]
  }
};