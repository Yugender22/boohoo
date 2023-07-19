
export const formatAmount = (amount: number): string => {
    return amount.toLocaleString("en-GB", {style:"currency", currency:"GBP"});
}