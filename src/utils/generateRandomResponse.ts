export const generateRandomResponse = () => {
  const responses = [
    "Remember, you are not alone. Would you like to talk?",
    "Taking care of your mental health is just as important as your physical health. How can I help?",
    "If you need to vent, I'm here to listen.",
    "You deserve care and support. Do you want to talk about it?",
    "Take a deep breath, one step at a time. How can I assist you today?",
    "It's okay not to be okay all the time. Want to share how you're feeling?",
    "Small progress is still progress. What can we do together to help you?",
    "You are valuable, and your feelings matter. How can I support you?",
    "Sometimes, talking about what we feel is already a big relief. I'm here to listen.",
    "If things feel difficult, remember that help is available. Don't hesitate to reach out!"
  ];

  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}