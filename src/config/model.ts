'use strict';

import { AccessibleResourceV1, emptyAccessibleResourceV1 } from "../atlclients/authInfo";

export enum SettingSource {
    JiraIssue = 'jiraIssue',
    BBPullRequest = 'bbPullRequest',
    BBPipeline = 'bbPipeline',
    BBIssue = 'bbIssue',
    JiraAuth = 'jiraAuth',
    BBAuth = 'bbAuth',
    Default = 'default'
}

export enum OutputLevel {
    Silent = 'silent',
    Errors = 'errors',
    Info = 'info',
    Debug = 'debug'
}

export interface WorkingProjectV1 {
    name: string;
    id: string;
    key: string;
}

export interface IConfig {
    outputLevel: OutputLevel;
    enableCharles: boolean;
    charlesCertPath: string;
    charlesDebugOnly: boolean;
    offlineMode: boolean;
    showWelcomeOnInstall: boolean;
    jira: JiraConfig;
    bitbucket: BitbucketConfig;
    enableUIWS: boolean;
    enableCurlLogging: boolean;
    enableHttpsTunnel: boolean;
}

export interface JiraConfig {
    enabled: boolean;
    workingProject: WorkingProjectV1;
    workingSite: AccessibleResourceV1;
    lastCreateSiteAndProject: SiteIdAndProjectKey;
    explorer: JiraExplorer;
    issueMonitor: JiraIssueMonitor;
    statusbar: JiraStatusBar;
    hover: JiraHover;
    customJql: SiteJQLV1[];
    jqlList: JQLEntry[];
    todoIssues: TodoIssues;
}

export type SiteIdAndProjectKey = {
    siteId: string;
    projectKey: string;
};
export interface JiraStatusBar {
    enabled: boolean;
    showProduct: boolean;
    showUser: boolean;
    showLogin: boolean;
}

export interface JiraIssueMonitor {
    refreshInterval: number;
}

export interface JiraExplorer {
    enabled: boolean;
    monitorEnabled: boolean;
    showOpenIssues: boolean;
    openIssueJql: string;
    showAssignedIssues: boolean;
    assignedIssueJql: string;
    refreshInterval: number;
}

export interface JiraHover {
    enabled: boolean;
}

export interface SiteJQLV1 {
    siteId: string;
    jql: JQLEntryV1[];
}

export interface TodoIssues {
    enabled: boolean;
    triggers: string[];
}

export interface JQLEntry {
    id: string;
    enabled: boolean;
    name: string;
    query: string;
    siteId: string;
    monitor: boolean;
}

export interface JQLEntryV1 {
    id: string;
    enabled: boolean;
    name: string;
    query: string;
}

export interface BitbucketConfig {
    enabled: boolean;
    explorer: BitbucketExplorer;
    statusbar: BitbucketStatusBar;
    contextMenus: BitbucketContextMenus;
    pipelines: BitbucketPipelinesConfig;
    issues: BitbucketIssuesConfig;
}

export interface BitbucketPipelinesConfig {
    explorerEnabled: boolean;
    monitorEnabled: boolean;
    refreshInterval: number;
    hideEmpty: boolean;
    hideFiltered: boolean;
    branchFilters: string[];
}

export interface BitbucketIssuesConfig {
    explorerEnabled: boolean;
    monitorEnabled: boolean;
    refreshInterval: number;
    createJiraEnabled: boolean;
}

export interface BitbucketExplorer {
    enabled: boolean;
    refreshInterval: number;
    relatedJiraIssues: BitbucketRelatedJiraIssues;
    relatedBitbucketIssues: BitbucketRelatedBitbucketIssues;
    notifications: BitbucketNotifications;
}

export interface BitbucketRelatedJiraIssues {
    enabled: boolean;
}

export interface BitbucketRelatedBitbucketIssues {
    enabled: boolean;
}

export interface BitbucketNotifications {
    refreshInterval: number;
    pullRequestCreated: boolean;
}

export interface BitbucketStatusBar {
    enabled: boolean;
    showProduct: boolean;
    showUser: boolean;
    showLogin: boolean;
}

export interface BitbucketContextMenus {
    enabled: boolean;
}

export const emptyWorkingProjectV1: WorkingProjectV1 = {
    name: '',
    id: '',
    key: ''
};

export function notEmptyProjectV1(p: WorkingProjectV1): p is WorkingProjectV1 {
    return (<WorkingProjectV1>p).name !== undefined
        && (<WorkingProjectV1>p).name !== ''
        && (<WorkingProjectV1>p).id !== undefined
        && (<WorkingProjectV1>p).id !== ''
        && (<WorkingProjectV1>p).key !== undefined
        && (<WorkingProjectV1>p).key !== ''
        ;
}

export const emptyJiraExplorer: JiraExplorer = {
    enabled: true,
    monitorEnabled: true,
    showOpenIssues: true,
    openIssueJql: "",
    showAssignedIssues: true,
    assignedIssueJql: "",
    refreshInterval: 5
};

export const emtpyIssueMonitor: JiraIssueMonitor = {
    refreshInterval: 5
};

export const emptyJiraStatusBar: JiraStatusBar = {
    enabled: true,
    showProduct: true,
    showUser: true,
    showLogin: true
};

export const emptyJiraHover: JiraHover = {
    enabled: true
};

export const emptyJQLEntry: JQLEntry = {
    id: "",
    enabled: true,
    monitor: true,
    name: "",
    query: "",
    siteId: "",
};

export const emptyTodoIssues: TodoIssues = {
    enabled: true,
    triggers: []
};

export const emptyJiraConfig: JiraConfig = {
    enabled: true,
    workingProject: emptyWorkingProjectV1,
    workingSite: emptyAccessibleResourceV1,
    lastCreateSiteAndProject: { siteId: "", projectKey: "" },
    explorer: emptyJiraExplorer,
    issueMonitor: emtpyIssueMonitor,
    statusbar: emptyJiraStatusBar,
    hover: emptyJiraHover,
    customJql: [],
    jqlList: [],
    todoIssues: emptyTodoIssues
};

export const emptyRelatedJiraIssues: BitbucketRelatedJiraIssues = {
    enabled: true
};

export const emptyRelatedBitbucketIssues: BitbucketRelatedBitbucketIssues = {
    enabled: true
};

export const emptyBitbucketNotfications: BitbucketNotifications = {
    refreshInterval: 10,
    pullRequestCreated: true
};

export const emptyBitbucketExplorer: BitbucketExplorer = {
    enabled: true,
    refreshInterval: 5,
    relatedJiraIssues: emptyRelatedJiraIssues,
    relatedBitbucketIssues: emptyRelatedBitbucketIssues,
    notifications: emptyBitbucketNotfications
};

export const emptyBitbucketStatusBar: BitbucketStatusBar = {
    enabled: true,
    showProduct: true,
    showUser: true,
    showLogin: true
};

export const emptyBitbucketContextMenus: BitbucketContextMenus = {
    enabled: true
};

export const emptyPipelinesConfig: BitbucketPipelinesConfig = {
    explorerEnabled: true,
    monitorEnabled: true,
    refreshInterval: 5,
    hideEmpty: true,
    hideFiltered: false,
    branchFilters: []
};

export const emptyIssuesConfig: BitbucketIssuesConfig = {
    explorerEnabled: true,
    monitorEnabled: true,
    refreshInterval: 15,
    createJiraEnabled: false,
};

export const emptyBitbucketConfig: BitbucketConfig = {
    enabled: true,
    explorer: emptyBitbucketExplorer,
    statusbar: emptyBitbucketStatusBar,
    contextMenus: emptyBitbucketContextMenus,
    pipelines: emptyPipelinesConfig,
    issues: emptyIssuesConfig
};

export const emptyConfig: IConfig = {
    outputLevel: OutputLevel.Silent,
    enableCharles: false,
    charlesCertPath: '',
    charlesDebugOnly: false,
    offlineMode: false,
    showWelcomeOnInstall: true,
    jira: emptyJiraConfig,
    bitbucket: emptyBitbucketConfig,
    enableUIWS: false,
    enableCurlLogging: false,
    enableHttpsTunnel: false,
};
