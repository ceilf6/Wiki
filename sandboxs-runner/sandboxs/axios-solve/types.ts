export interface ApiResponse<T> {
    status: number;
    message?: string;
    msg?: string;
    data: T;
}

export enum ApiStatus {
    SUCCESS = 0,
    UN_LOGIN = 100001,
    PERMISSION_DENIED = 1001,
    BUSINESS_ERROR = 1002,
}

export interface RequestOptions {
    noToast?: boolean;
    cancelDuplicate?: boolean;
}
