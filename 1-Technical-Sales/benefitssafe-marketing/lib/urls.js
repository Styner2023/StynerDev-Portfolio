export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.benefitssafe.com';

export const getRegisterUrl = (plan) => {
  const base = `${APP_URL}/auth/register`;
  return plan ? `${base}?plan=${plan}` : base;
};

export const getLoginUrl = () => `${APP_URL}/auth/login`;
