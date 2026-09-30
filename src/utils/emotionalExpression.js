// Emotional Expression Engine
// Transforms raw personal answers into authentic, emotionally nuanced letters without artificial drama.

export function generateEmotionalLetters({
  name = "My Love",
  sender = "Me",
  relationship = "Partner",
  trigger = "",
  feeling = "",
  memory = "",
  unspoken = "",
  tone = "intimate"
}) {
  const cleanName = name.trim() || "Dearest";
  const cleanSender = sender.trim() || "Forever yours";

  // Tone variations
  let letters = [];

  // Option 1: The Quiet Hearth (Intimate, atmospheric, focuses on the quiet spaces)
  letters.push({
    id: "hearth",
    title: "The Quiet Hearth",
    vibe: "Intimate & Reflective",
    description: "Gentle and warm, focusing on the comfort and depth of everyday presence.",
    content: `${cleanName},

I found myself pausing today, thinking about everything that has led us here${trigger ? `—especially ${trigger.toLowerCase()}` : ""}. Sometimes life moves with such relentless momentum that we forget to speak the truths that matter most.

${feeling ? `What I feel more than anything is ${feeling.toLowerCase()}. It isn't loud or demanding; it is a quiet, steady certainty that lives underneath everything.` : `There is a steady, quiet warmth whenever I think of you—one that words rarely do justice to.`}

${memory ? `I keep going back to that moment: ${memory}. Out of all the days we have lived, that is the one that stays with me, reminding me who you are and why you mean what you do to me.` : `There are so many quiet moments that stay etched in my mind, moments that reminded me how deeply grateful I am to walk beside you.`}

${unspoken ? `If there is one thing I want you to carry in your heart, it is this: ${unspoken}.` : `I want you to know that you are seen, you are cherished, and your presence in my world is an irreplaceable gift.`}

Thank you for being here, exactly as you are.

With all my heart,
${cleanSender}`
  });

  // Option 2: The Direct & Vulnerable (Unfiltered sincerity, reassuring)
  letters.push({
    id: "vulnerable",
    title: "The Direct & Vulnerable",
    vibe: "Sincere & Grounded",
    description: "Direct and unadorned honesty, cutting through surface noise to say what matters.",
    content: `Dear ${cleanName},

I wanted to put this into words because saying it out loud sometimes gets caught in my throat.

${trigger ? `Lately, with ${trigger.toLowerCase()}, it hit me how precious this is.` : `I wanted to give you something tangible that you can always return to when the world gets loud.`}

${feeling ? `The honest truth is: ${feeling.toLowerCase()}. You give me a sense of peace that I don't find anywhere else.` : `You have brought a steadiness and warmth to my life that I will never take for granted.`}

${memory ? `Whenever I need reminding of what really counts, I think of ${memory}. That wasn't just a memory for me; it was proof of what we share.` : `Every single chapter we have shared has shaped me into someone better.`}

${unspoken ? `Please never doubt this: ${unspoken}. No matter how much time passes, that will not change.` : `Please remember that through every storm and every quiet season, I am right here with you.`}

Always,
${cleanSender}`
  });

  // Option 3: The Timeless Keepsake (Poetic, enduring, written for a lifetime)
  letters.push({
    id: "timeless",
    title: "The Timeless Keepsake",
    vibe: "Enduring & Soulful",
    description: "Written as an heirloom message meant to be reread decades from now.",
    content: `${cleanName},

Some moments belong to time, and some moments belong to memory.

${trigger ? `Thinking of ${trigger.toLowerCase()} reminded me that love is not measured in years, but in the shelter we build for each other.` : `I wanted to preserve this moment in time, before today becomes yesterday.`}

${feeling ? `If my heart could speak without hesitation, it would tell you: ${feeling.toLowerCase()}.` : `You have given my days a richer color, a gentler rhythm, and a deeper meaning.`}

${memory ? `I will forever hold onto ${memory}—it is anchored in my mind like a lantern in the dark.` : `The memories we carry are the most valuable things I will ever own.`}

${unspoken ? `${unspoken}. Hold this close whenever you need reminding.` : `Know that wherever life takes us, you are deeply loved and profoundly treasured.`}

Forever and always,
${cleanSender}`
  });

  return letters;
}
