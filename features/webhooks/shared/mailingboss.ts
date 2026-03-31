import { MAILINGBOSS_API_URL } from '@/shared/config/external-links';

function getMailingBossConfig() {
  const token = process.env.MAILINGBOSS_TOKEN;
  const listUid = process.env.MAILINGBOSS_LIST_UID;

  if (!token || !listUid) {
    return null;
  }

  return { token, listUid };
}

export async function addToMailingBoss(email: string, name: string, tag: string) {
  const config = getMailingBossConfig();

  if (!config) {
    console.warn('Skipping MailingBoss sync because credentials are not configured.');
    return { success: false, skipped: true };
  }

  try {
    const [firstName] = name.split(' ');

    const response = await fetch(`${MAILINGBOSS_API_URL}/${config.token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        list_uid: config.listUid,
        fname: firstName || name,
        taginternals: tag,
      }),
    });

    const data = await response.json();

    if (response.ok && data.status === 'success') {
      return { success: true, data };
    }

    console.error('MailingBoss API error:', data);
    return { success: false, error: data };
  } catch (error) {
    console.error('Error adding to MailingBoss:', error);
    return { success: false, error };
  }
}
