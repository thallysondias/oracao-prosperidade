type ResendWelcomeOptions = {
  email: string;
  name: string;
  productNames?: string[];
};

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const templateId = process.env.RESEND_WELCOME_TEMPLATE_ID;

  if (!apiKey || !templateId) {
    return null;
  }

  return {
    apiKey,
    from,
    templateId,
  };
}

function buildWelcomeHtml(name: string, productNames: string[]) {
  const firstName = name.split(" ")[0] || name;
  const productsSection = productNames.length
    ? `<p><strong>Your access includes:</strong> ${productNames.join(", ")}</p>`
    : "";

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 24px;">
      <h1 style="margin-bottom: 16px; color: #111827;">Welcome, ${firstName}!</h1>
      <p>Your access has been activated successfully.</p>
      ${productsSection}
      <p>You can now log in and start using your content.</p>
      <p style="margin-top: 24px;">Blessings,<br />Calmia.club</p>
    </div>
  `.trim();
}

async function createContact(apiKey: string, email: string, name: string) {
  const [firstName, ...rest] = name.trim().split(/\s+/).filter(Boolean);
  const lastName = rest.join(" ");

  const response = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      firstName: firstName || name,
      lastName: lastName || undefined,
      unsubscribed: false,
    }),
  });

  if (response.ok || response.status === 409) {
    return { success: true };
  }

  const error = await response.json().catch(() => null);
  console.error("Resend contact sync error:", error);
  return { success: false, error };
}

export async function sendWelcomeEmailWithResend({
  email,
  name,
  productNames = [],
}: ResendWelcomeOptions) {
  const config = getResendConfig();

  if (!config) {
    console.warn("Skipping Resend sync because required welcome template credentials are not configured.");
    return { success: false, skipped: true };
  }

  await createContact(config.apiKey, email, name);

  try {
    const body = config.templateId
      ? {
          to: [email],
          template: {
            id: config.templateId,
            variables: {
              NAME: name,
              EMAIL: email,
              PRODUCTS: productNames.join(", "),
            },
          },
        }
      : {
          from: config.from,
          to: [email],
          subject: "Welcome to Calmia.club",
          html: buildWelcomeHtml(name, productNames),
        };

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => null);

    if (response.ok) {
      return { success: true, data };
    }

    console.error("Resend email send error:", data);
    return { success: false, error: data };
  } catch (error) {
    console.error("Error sending welcome email with Resend:", error);
    return { success: false, error };
  }
}
