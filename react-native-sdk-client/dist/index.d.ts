/// <reference types="react" />
import { StyleProp, ViewStyle, ViewProps } from 'react-native';
import { WebViewProps } from 'react-native-webview';

/**
 * Inbound events from Stage TEN.
 */
declare type EventName = 
/**
 * Sent when the Stage TEN service is initialized, and the state of plugins is available.
 *
 * When you receive this event, you can send the `getstate` action.
 */
'stageten_init' | 
/**
 * Sent in response to a `getstate` action.
 */
'state' | 
/**
 * Sent when there is a change in aspect ratio. This would ordinarily only occur if a user were
 * broadcasting in portrait, then on a subsequent broadcast switched to landscape (or vice versa),
 * and the viewer's app were still open.
 */
'aspect_ratio_change' | 
/**
 * Sent when there is a change to the active question. Either when the question is
 * activated/deactived or when the question data changes.
 */
'voting_activequestionchange' | 
/**
 * Sent when there is an update to the chat state.
 */
'chat_messages' | 
/**
 * Sent when the list of Products in the Sale is updated.
 */
'commerce_saleproducts' | 
/**
 * Sent when a Sale is made active or inactive.
 */
'commerce_saleactivestate';
declare type Event = {
    name: EventName;
    payload: object | null;
};
/**
 * Outbound actions from the application.
 */
declare type ActionName = 
/**
 * Request the full state of the player. This is useful on initial load. The player will
 * respond with a `state` event
 */
'getstate' | 
/**
 * Send a message into the chat.
 */
'chat_sendmessage' | 
/**
 * Set the username for the chat. This is required before the user can chat.
 */
'chat_setusername' | 
/**
 * Cast a vote for an answer.
 */
'vote';
declare type Action = {
    action: ActionName;
    payload: object | null;
};

interface StageTenActions {
    /**
     * Send an Action to the Stage TEN service. This is the core method for communicating with
     * Stage TEN. All other methods on this interface are convenience methods which call
     * this method.
     */
    sendAction(message: Action): void;
    /**
     * Convenience method for sending the `getstate` action.
     *
     * You should call this after receiving the `stageten_init` event.
     */
    getState(): void;
    /**
     * Convenience method for sending the `chat_sendmessage` action with `message` in the payload.
     *
     * @param message The message to be sent
     */
    sendChatMessage(message: string): void;
    /**
     * Convenience method for sending the `chat_setusername` action with `username` in the payload.
     *
     * @param username The name the user entered
     */
    setChatUsername(username: string): void;
    /**
     * Convenience method for sending the `vote` action with `answerId` in the payload.
     *
     * @param answerId The id (a UUID) corresponding to the answer the user picked.
     */
    vote(answerId: string): void;
}

interface PlayerProps {
    /**
     * Your Stage TEN channel id. This is a UUID, used to build the URI to your player.
     *
     * This is required, unless you provide a URI override via the `uri` field.
     */
    channelId?: string;
    /**
     * You may optionally override the player URI. This is not necessary under most circumstances;
     * you can provide your Stage TEN channel id via the `channelId` field.
     */
    uri?: string;
    /**
     * Called when the client-side interface for sending Actions is ready. Note that you should
     * still wait for `stageten_init` event before sending any Actions.
     */
    onActionsReady: (actions: StageTenActions) => void;
    /**
     * Called when the Stage TEN service sends a message.
     */
    onEvent: (event: Event) => void;
    /**
     * Called when the player sends an Action to Stage TEN. This method is provided as a convenience, where
     * you can do e.g. logging or analytics.
     */
    onSendAction?: (action: Action) => void;
    /**
     * Style the StageTenPlayer View
     */
    style?: StyleProp<ViewStyle>;
    /**
     * A flag to tell the player if it should automatically update the player aspect ratio when the broadcast
     * aspect ratio changes. This is `true` by default.
     */
    autoUpdateAspectRatio?: boolean;
    /**
     * Apply properties to the StageTenPlayer View.
     */
    viewProps?: ViewProps;
    /**
     * Apply properties to the StageTenPlayer WebView.
     */
    webViewProps?: WebViewProps;
}

declare function StageTenPlayer({ channelId, uri, onActionsReady, onEvent, onSendAction, style, autoUpdateAspectRatio, viewProps, webViewProps, }: PlayerProps): JSX.Element;

/**
 * Parse the aspect ratio provided by Stage TEN
 *
 * @param aspectRatio The aspect ratio as string; in the form e.g. '16:9' or '9:16'
 * @returns The quotient of the aspect ratio, for example '9:16' => 0.5625
 */
declare function parseAspectRatio(aspectRatio: string): number;

export { Action, ActionName, Event, EventName, PlayerProps, StageTenActions, StageTenPlayer, parseAspectRatio };
