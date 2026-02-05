const Replicate = require("replicate");

/**
 * Replicate client
 */
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

/**
 * Replicate Video (Stable Video Diffusion)
 * Image → Video
 */
const createVideoWithReplicate = async (imageUrl) => {
  const output = await replicate.run(
    "stability-ai/stable-video-diffusion",
    {
      input: {
        input_image: imageUrl,
        motion_bucket_id: 127,
        fps: 6,
        num_frames: 14,
      },
    }
  );

  return output?.[0];
};
/**
 * Main video generator
 */
const createVideo = async ({ imageUrl, prompt, provider = "replicate" }) => {
  try {

    // default → Replicate
    return await createVideoWithReplicate(imageUrl);
  } catch (error) {
    console.error(
      "Video generation failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};

module.exports = {
  createVideo,
  createVideoWithReplicate
};
