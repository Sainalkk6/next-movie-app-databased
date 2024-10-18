import React, { ChangeEventHandler, ReactNode } from "react";
import { IconType } from "react-icons";

export type CustomLabelProps = {
    label: string;
    labelFor: string;
}

export type CustomInputType = {
    placeholder: string;
    handleChange: ChangeEventHandler<HTMLInputElement>
    value: string;
    type: string;
    id: string;
    error: boolean
    handleBlur: (e: React.FocusEvent<any, Element>) => void;
}

export type CustomContainerProps = {
    children: React.ReactNode
}

export type CustomLinkProps = {
    route: string;
    label: ReactNode
}

export type MovieCardProps = {
    title: string;
    poster: string;
    description: string;
    rating: number;
    releaseData: string;
    id: number;
}

export type DataType = {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
}

export type CustomButtonProps = {
    size: number;
    id: number;
    email: string;
    value: number;
    Icon: React.ElementType;
    handleClick: (id: number, email: string) => any
}

export type HomeProps = {
    data: any
    isLoading: boolean;
    isError: boolean;
    error: any
}

export type CustomPaginationProps = {
    icon: boolean
    href: string;
    label: string
}

export type HandleLikesProp = {
    id?: number,
    email: string
}

export type HandleWatchlaterProps = {
    id?: number,
    email: string
}

export type NewMovieTypeProps = {
    title: string;
    poster: string;
    description: string;
    rating: number;
    releaseData: string;
    id: number;
    page?: "LikePage" | "WatchLaterPage"
}