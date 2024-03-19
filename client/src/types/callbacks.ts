import { chatType, imageType } from "./storeTypes";

// CallbacksActionsTypes
export type followUnfollowActionType = "follow" | "unfollow";
export type blockUnblockActionType = "block" | "unblock";
export type imageMenuOptionsActionsType =
    "Save" |
    "Unsave" |
    "Hide" |
    "Show" |
    "Delete" |
    "Not interested" |
    "Download" |
    "Save";
export type chatsMenuOptionsActionsType =
    "Clear all chats" |
    "Delete all chats";
export type messagesMenuOptionsActionsType =
    "Clear chat" |
    "Delete chat" |
    "Block user"
    ;
export type commentMenuOptionsActionsType =
    "Delete";

// Callbacks types
export type hideShowToggleCallbackType = (mode: string) => void;
export type sortByToggleCallbackType = (sortBy: "date" | "popularity") => void
export type saveToggleCallbackType = (isSaveMode: boolean) => void
export type toggleButtonCallbackType<
    T extends
    followUnfollowActionType |
    blockUnblockActionType |
    "send request" | "request sended" | "confirm"
    > = (action: T) => void
export type commentsCallbackType = (isCommentSectionOpened: boolean) => void
export type onArrowBackClickCallbackType = () => void
export type uploadImageCallbackType = (event: React.ChangeEvent<HTMLInputElement>) => void
export type imageProcessedCallbackType = (canvas: HTMLCanvasElement, imgfile: File) => void
export type readyImageCallbackType = (canvas: HTMLCanvasElement, imgfile: File) => void
export type setSelectedUserIdCallbackType = (id: number) => void
export type addInputCallbackType = (text: string) => void
export type changeInputCallbackType = (text: string) => void
export type setIsEmailVerifiedCallbackType = (isVerified: boolean) => void
export type imageMenuHandlerType = (imageId: number, action: imageMenuOptionsActionsType, images: imageType[], setImages: React.Dispatch<React.SetStateAction<imageType[]>>) => void
export type optionActionCallbackType<
    T extends
    imageMenuOptionsActionsType |
    chatsMenuOptionsActionsType |
    messagesMenuOptionsActionsType |
    commentMenuOptionsActionsType
    > = (action: T) => void
export type customMenuHandlerCallbackType = (optionId: number) => void
export type menuOptionsHandlerCallbackType = (itemId: number, action?: imageMenuOptionsActionsType) => void
export type giveCurrentImagesCallbackType = (result: {
    count: string,
    rows: imageType[] | []
}) => void
export type setChatIdCallbackType = (chatId: number | string) => void
export type setNewChatCallbackType = (chat: chatType) => void
export type messageOptionsCallbackType = (messageId: number) => void