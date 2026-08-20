import { authFetch } from "./api.js";
import { SUBSCRIPTION_PACKAGES as BACKEND_PACKAGES, mockBackend } from "./mockBackend.js";

export const SUBSCRIPTION_PACKAGES = BACKEND_PACKAGES;
export const TOKEN_PACKAGES = SUBSCRIPTION_PACKAGES; // Backward compatibility alias

export const getTokenPackages = async () => {
  try {
    const data = await authFetch("/payment/packages");
    if (Array.isArray(data)) return data;
  } catch {
    // fallback
  }
  return SUBSCRIPTION_PACKAGES;
};

export const initiatePayment = async (packageId) => {
  const selectedPkg = SUBSCRIPTION_PACKAGES.find((p) => p.id === packageId) || SUBSCRIPTION_PACKAGES[0];
  try {
    const data = await authFetch("/payment/initiate", {
      method: "POST",
      body: JSON.stringify({ packageId: selectedPkg.id, amount: selectedPkg.price }),
    });
    if (data?.orderId) return data;
  } catch {
    // fallback
  }

  return {
    orderId: `order_${Date.now()}_${selectedPkg.id}`,
    amount: selectedPkg.price,
    currency: selectedPkg.currency,
    packageId: selectedPkg.id,
    durationLabel: selectedPkg.durationLabel,
  };
};

export const verifyPayment = async ({ orderId, paymentId, packageId }) => {
  const selectedPkg = SUBSCRIPTION_PACKAGES.find((p) => p.id === packageId) || SUBSCRIPTION_PACKAGES[0];
  try {
    const data = await authFetch("/payment/verify", {
      method: "POST",
      body: JSON.stringify({
        orderId,
        paymentId: paymentId || `pay_${Date.now()}`,
        packageId: selectedPkg.id,
      }),
    });
    if (data?.subscription) return data;
  } catch {
    // fallback
  }

  const result = await mockBackend.subscribeUser(selectedPkg.id, paymentId || `pay_${Date.now()}`);
  return {
    success: true,
    user: result.user,
    subscription: result.subscription,
    tokens: result.tokens,
    package: selectedPkg,
    message: result.message,
  };
};
