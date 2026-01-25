const sql = require('./db.cjs');

/**
 * Verify auth token and return user data
 */
async function verifyAuthToken(token) {
  if (!token) {
    return null;
  }

  try {
    const tokenData = await sql`
      SELECT user_id FROM auth_tokens 
      WHERE token = ${token} 
      AND expires_at > ${Date.now()}
      LIMIT 1
    `;

    if (tokenData.length === 0) {
      return null;
    }

    const userId = tokenData[0].user_id;

    // Get user and account data
    const users = await sql`
      SELECT u.id, u.username, u.display_name, u.is_premium, u.is_guest
      FROM users u
      WHERE u.id = ${userId}
      LIMIT 1
    `;

    if (users.length === 0) {
      return null;
    }

    const user = users[0];

    // Get account data
    const accounts = await sql`
      SELECT id, crossmint_email, crossmint_wallet_id, wallet_address
      FROM accounts
      WHERE user_id = ${userId}
      LIMIT 1
    `;

    const account = accounts.length > 0 ? accounts[0] : null;
    const grudgeId = generateGrudgeId(user.id);

    return {
      userId: user.id,
      username: user.username,
      displayName: user.display_name,
      isPremium: user.is_premium,
      isGuest: user.is_guest,
      accountId: account?.id,
      grudgeId,
      walletAddress: account?.wallet_address,
      crossmintWalletId: account?.crossmint_wallet_id,
      crossmintEmail: account?.crossmint_email
    };
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

/**
 * Generate Grudge ID from user UUID
 */
function generateGrudgeId(userId) {
  return `GRUDGE_${userId.replace(/-/g, '').substring(0, 12).toUpperCase()}`;
}

/**
 * Update user's last login timestamp
 */
async function updateLastLogin(userId) {
  try {
    await sql`
      UPDATE users
      SET last_login_at = ${Date.now()}
      WHERE id = ${userId}
    `;
  } catch (error) {
    console.error('Update last login error:', error);
  }
}

/**
 * Update last token used timestamp
 */
async function updateTokenUsage(token) {
  try {
    await sql`
      UPDATE auth_tokens
      SET last_used_at = ${Date.now()}
      WHERE token = ${token}
    `;
  } catch (error) {
    console.error('Update token usage error:', error);
  }
}

module.exports = {
  verifyAuthToken,
  generateGrudgeId,
  updateLastLogin,
  updateTokenUsage
};
