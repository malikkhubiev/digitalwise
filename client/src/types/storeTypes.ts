export type commentType = {
    id: number
    authorId: number
    authorName: string
    avatar: string
    isOwn: boolean
    createdAt: string
    body: string
    isLiked: boolean
    numberOfLikes: string
};

export type imagesFromServerType = {
    count: string
    rows: imageType[] | []
};

export type tagType = {
    id: number
    name: string
    isPrivate: boolean
};

export type imageType = {
    id: number
    authorId: number
    authorName: string
    avatar: string
    isOwn: boolean
    createdAt: string
    src: string
    description: string
    tags: tagType[]
    numberOfLikes: string
    isLiked: boolean
    isPrivate: boolean
    isSaved: boolean
    comments: commentType[] | []
    numberOfComments: string
    numberOfViews: string
};

export type imageLikerType = {
    id: number,
    avatar: string | null,
    name: string,
};

export type blockedUserType = {
    id: number,
    avatar: string | null,
    name: string,
    isBlocked: boolean
};

export type blockedUsersType = {
    id: number,
    avatar: string,
    name: string,
    isBlocked: boolean
}[];

export type followersAndFollowingListType = {
    id: number,
    avatar: string,
    name: string,
    amIFollowed: boolean,
    isOpened: boolean,
}[];

export type followersAndFollowingType = {
    list: followersAndFollowingListType | []
    number: string
};

export type requestersType = {
    id: number,
    avatar: string,
    name: string
}[];

export type profileType = {
    id: number
    name: string
    avatar: string
    isOwn: boolean
    isOpened: boolean
    isOpenedForMe?: boolean
    isRequestSended?: boolean
    followers: followersAndFollowingType
    following: followersAndFollowingType
    blocked?: {
        rows: blockedUserType[],
        count: string
    }
    postsNumber: string
    amIFollowed: boolean
    isBlocked: boolean
    usualImagesByDate: {
        rows: imageType[],
        count: string
    }
    usualImagesByPopularity: {
        rows: imageType[],
        count: string
    }
    isFirstTime: boolean
};

export type messageType = {
    id: number
    from: number
    to: number
    visibleForFirstChatter: boolean
    visibleForSecondChatter: boolean
    text: string
    createdAt: Date
};

export type chatType = {
    id: number | string
    messages: messageType[]
    lastMessage: messageType
    chatterAva: string | null
    chatterName: string
    firstChatterId?: number
    secondChatterId?: number
    newMessagesNumber?: number
};

export type preferenceType = {
    id: number
    name: string
    rating: number
};