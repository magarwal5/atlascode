import { ReducerAction } from '@atlassianlabs/guipi-core-controller';
import { ApprovalStatus, emptyPullRequest, emptyUser, PullRequest, Reviewer, User } from '../../../bitbucket/model';

export enum PullRequestDetailsMessageType {
    Init = 'init',
    Update = 'configUpdate',
    FetchUsersResponse = 'fetchUsersResponse',
    UpdateSummaryResponse = 'updateSummaryResponse',
    UpdateTitleResponse = 'updateTitleResponse',
    UpdateReviewersResponse = 'updateReviewersResponse',
    UpdateApprovalStatusResponse = 'updateApprovalStatusResponse',
    UpdateSummary = 'updateSummary',
    UpdateTitle = 'updateTitle',
    UpdateReviewers = 'updateReviewers',
    UpdateApprovalStatus = 'updateApprovalStatus',
    CheckoutBranch = 'checkoutBranch',
}

export type PullRequestDetailsMessage =
    | ReducerAction<PullRequestDetailsMessageType.Init, PullRequestDetailsInitMessage>
    | ReducerAction<PullRequestDetailsMessageType.Update, PullRequestDetailsInitMessage>
    | ReducerAction<PullRequestDetailsMessageType.UpdateSummary, PullRequestDetailsSummaryMessage>
    | ReducerAction<PullRequestDetailsMessageType.UpdateTitle, PullRequestDetailsTitleMessage>
    | ReducerAction<PullRequestDetailsMessageType.UpdateReviewers, PullRequestDetailsReviewersMessage>
    | ReducerAction<PullRequestDetailsMessageType.UpdateApprovalStatus, PullRequestDetailsApprovalMessage>
    | ReducerAction<PullRequestDetailsMessageType.CheckoutBranch, PullRequestDetailsCheckoutBranchMessage>;

export type PullRequestDetailsResponse =
    | ReducerAction<PullRequestDetailsMessageType.FetchUsersResponse, FetchUsersResponseMessage>
    | ReducerAction<PullRequestDetailsMessageType.UpdateSummaryResponse, VoidResponse>
    | ReducerAction<PullRequestDetailsMessageType.UpdateTitleResponse, VoidResponse>
    | ReducerAction<PullRequestDetailsMessageType.UpdateApprovalStatusResponse, VoidResponse>
    | ReducerAction<PullRequestDetailsMessageType.UpdateReviewersResponse, VoidResponse>;

export interface PullRequestDetailsInitMessage {
    pr: PullRequest;
    currentUser: User;
    currentBranchName: string;
}

export interface VoidResponse {}

export interface FetchUsersResponseMessage {
    users: User[];
}

export interface PullRequestDetailsSummaryMessage {
    htmlSummary: string;
    rawSummary: string;
}

export interface PullRequestDetailsTitleMessage {
    title: string;
}

export interface PullRequestDetailsReviewersMessage {
    reviewers: Reviewer[];
}

export interface PullRequestDetailsApprovalMessage {
    status: ApprovalStatus;
}

export interface PullRequestDetailsCheckoutBranchMessage {
    branchName: string;
}
export const emptyPullRequestDetailsInitMessage: PullRequestDetailsInitMessage = {
    pr: emptyPullRequest,
    currentUser: emptyUser,
    currentBranchName: '',
};
