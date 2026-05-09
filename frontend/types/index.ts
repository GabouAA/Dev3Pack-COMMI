export interface CommissionCard {
    id: string;
    title: string;
    days: number;
    price: number;
    currency: 'EUR' | 'USD';
    artistName: string;
    artistAvatarUrl?: string;
    imageHeight: string;
}