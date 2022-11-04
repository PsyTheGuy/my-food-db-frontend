export type FoodEntryDetails = Record<string, { unit: string; amount: number }>;
export type FoodEntryCreateOptions = {
  name: string;
  details?: FoodEntryDetails;
};
export type FoodEntry = FoodEntryCreateOptions & { _id: string; createdAt: Date };
export type FoodEntryUpdateOptions = Partial<FoodEntryCreateOptions>;
export type LoginData = {
  username: string;
  password: string;
};
