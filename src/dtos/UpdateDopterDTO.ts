export type UpdateAdopterDTO = {
    name?: string;
    password?: string;
    mobile?: string;
    picture?: string | null;
    address?: { city: string; state: string } | null;
};