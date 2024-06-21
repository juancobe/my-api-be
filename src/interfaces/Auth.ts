import { Request } from "express"

export interface Account {
    id: number;
    username: string;
    password: string;
}

export interface MessageResponse {
    message: string;
}

export interface JwtPayload {
    id: number;
    username: string;
}

export interface IGetUserAuthInfoRequest extends Request {
    userAccount: JwtPayload
}