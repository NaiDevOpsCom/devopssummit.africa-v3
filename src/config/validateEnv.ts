import * as Env from "./env";

/**
 * Call this once at app startup (main.tsx).
 * Validates all required env vars are present and correctly formatted.
 * Throws in development, logs warnings in production.
 */
export const validateEnv = (): void => {
  const errors: string[] = [];

  // Validate ImageKit configuration
  if (!Env.IMAGEKIT_URL_ENDPOINT) {
    errors.push("VITE_IMAGEKIT_URL_ENDPOINT is missing.");
  } else {
    try {
      new URL(Env.IMAGEKIT_URL_ENDPOINT);
    } catch {
      errors.push(`VITE_IMAGEKIT_URL_ENDPOINT is not a valid URL: "${Env.IMAGEKIT_URL_ENDPOINT}"`);
    }
  }

  if (!Env.IMAGEKIT_PUBLIC_KEY) {
    errors.push("VITE_IMAGEKIT_PUBLIC_KEY is missing.");
  }

  // Catch dangerous mistakes — secret keys exposed as VITE_ vars
  const dangerousPatterns = [
    { pattern: /^sk_/, name: "Generic SECRET key (sk_...)" },
    { pattern: /^SG\./, name: "SendGrid API key" },
    { pattern: /^AKIA/, name: "AWS Access Key ID" },
    { pattern: /^ghp_|^ghs_|^gho_/, name: "GitHub Token" },
    { pattern: /^private_/, name: "ImageKit PRIVATE key" },
    { pattern: /^AIza/, name: "Google API Key" },
    { pattern: /-----BEGIN PRIVATE KEY-----/, name: "Private Key" },
    { pattern: /sk_(live|test)_/, name: "Stripe/Provider Secret Key" },
    { pattern: /^[a-zA-Z0-9+/]{40}$/, name: "AWS Secret Access Key Pattern" },
    { pattern: /^SK[a-f0-9]{32}$/, name: "Twilio API Secret" },
  ];

  Object.entries(import.meta.env).forEach(([key, value]) => {
    if (!key.startsWith("VITE_")) return;
    dangerousPatterns.forEach(({ pattern, name }) => {
      if (pattern.test(String(value))) {
        errors.push(
          `SECURITY: ${key} appears to contain a ${name}. ` +
            `Secret keys must NEVER be prefixed with VITE_.`,
        );
      }
    });
  });

  if (errors.length > 0) {
    const message = `[Env Validation Failed]\n\n${errors.map((e) => `• ${e}`).join("\n")}`;
    if (Env.IS_DEVELOPMENT) {
      // In dev, we want to know immediately.
      // However, if the user just cloned the repo, we don't want to break the build
      // if they have placeholders. So we only throw if it's a security violation.
      const hasSecurityViolation = errors.some((e) => e.includes("SECURITY:"));
      if (hasSecurityViolation) {
        throw new Error(message);
      } else {
        console.warn(message);
      }
    } else {
      console.error(message); // Log but don't crash in production
    }
  }
};
