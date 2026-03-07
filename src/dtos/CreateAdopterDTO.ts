export type CreateAdopterDTO = {
    name: string;
    password: string;
    mobile: string;
    picture?: string;
    address?: {
        city: string;
        state: string;
    };
};