export function formatCurrency(value) {
    return new Intl.NumberFormat("cn", {
      style: "currency",
      currency: "CNY",
    }).format(value);
  }