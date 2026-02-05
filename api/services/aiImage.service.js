const Replicate = require("replicate");
const OpenAI = require("openai");

/**
 * Replicate client
 */
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

/**
 * OpenAI client
 */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate image using Replicate (SDXL Lightning)
 */
const createImageWithReplicate = async (prompt) => {
  const output = await replicate.run(
    "bytedance/sdxl-lightning",
    {
      input: {
        prompt,
        num_inference_steps: 4,
        guidance_scale: 1,
      },
    }
  );

  return output[0];
};

/**
 * Generate image using OpenAI (DALL·E / GPT Image)
 */
const createImageWithOpenAI = async (prompt) => {
  const result = await openai.images.generate({
    model: "gpt-image-1",
    prompt,
    size: "1024x1024",
  });

  return result.data[0].url;
};

/**
 * Main image generator
 * Switch provider here
 */
const createImage = async (prompt, provider = "replicate") => {
  try {
    console.log('---provider---------',prompt,provider)
    if (provider === "replicate") {
      return await createImageWithReplicate(prompt);
    }

    // default → OpenAI
    return await createImageWithOpenAI(prompt);
  } catch (error) {
    console.error("Image generation failed:", error.message);
    throw error;
  }
};

module.exports = {
  createImage,
  createImageWithOpenAI,
  createImageWithReplicate,
};
