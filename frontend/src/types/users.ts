export interface BaseOptions {
    onSuccess?: () => void;
    onError?: () => void;
}

export interface BaseUser {
    email: string;
    password: string;
}

export interface RegisterUserParam extends BaseUser, BaseOptions { }

export interface LoginUserParam extends BaseUser, BaseOptions { }

export interface User {
    name: string;
    email: string;
}

export interface UserSlice {
    user: User | null;
    isLoading: boolean;
    error: Error | null;
}