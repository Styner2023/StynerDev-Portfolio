import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Asset {
  'id' : string,
  'contentType' : string,
  'data' : Uint8Array | number[],
  'createdAt' : bigint,
  'size' : bigint,
  'filename' : string,
  'uploadedBy' : string,
}
export interface Client {
  'id' : string,
  'dashboardUrl' : [] | [string],
  'originalWebsiteUrl' : [] | [string],
  'projects' : Array<Project>,
  'websiteUrl' : [] | [string],
  'profileImage' : [] | [string],
  'name' : string,
  'createdAt' : bigint,
  'contactPerson' : [] | [string],
  'email' : string,
  'developerId' : string,
  'category' : [] | [string],
  'phone' : [] | [string],
}
export interface Document {
  'id' : string,
  'clientId' : string,
  'fileName' : string,
  'fileSize' : bigint,
  'developerId' : string,
  'uploadedAt' : bigint,
}
export interface Project {
  'id' : string,
  'url' : string,
  'status' : string,
  'clientDashboardUrl' : [] | [string],
  'clientId' : [] | [string],
  'thumbnail' : [] | [string],
  'projectType' : string,
  'adminUrl' : [] | [string],
  'name' : string,
  'createdAt' : bigint,
  'deadline' : [] | [string],
  'developerId' : string,
}
export interface Rating {
  'id' : string,
  'clientId' : string,
  'createdAt' : bigint,
  'feedback' : string,
  'developerId' : string,
  'rating' : bigint,
}
export interface Resource {
  'id' : string,
  'title' : string,
  'clientId' : string,
  'createdAt' : bigint,
  'links' : Array<ResourceLink>,
  'resourceType' : string,
  'developerId' : string,
}
export interface ResourceLink { 'url' : string, 'name' : string }
export type Result = { 'ok' : string } |
  { 'err' : string };
export type Result_1 = { 'ok' : Project } |
  { 'err' : string };
export type Result_2 = { 'ok' : Client } |
  { 'err' : string };
export type Result_3 = {
    'ok' : { 'transferred' : bigint, 'remaining' : bigint }
  } |
  { 'err' : string };
export type Result_5 = { 'ok' : User } |
  { 'err' : string };
export type Result_6 = { 'ok' : Document } |
  { 'err' : string };
export type Result_7 = { 'ok' : TimelineUpdate } |
  { 'err' : string };
export type Result_8 = { 'ok' : Resource } |
  { 'err' : string };
export type Result_9 = { 'ok' : Rating } |
  { 'err' : string };
export interface TimelineUpdate {
  'id' : string,
  'updateType' : string,
  'status' : string,
  'title' : string,
  'clientId' : string,
  'content' : string,
  'createdAt' : bigint,
  'actionItems' : Array<string>,
  'developerId' : string,
}
export interface User {
  'id' : string,
  'userType' : string,
  'name' : string,
  'email' : string,
  'authId' : string,
}
export interface _SERVICE {
  'addRating' : ActorMethod<[Rating], Result_9>,
  'addResource' : ActorMethod<[Resource], Result_8>,
  'addTimelineUpdate' : ActorMethod<[TimelineUpdate], Result_7>,
  'createClient' : ActorMethod<[Client], Result_2>,
  'createDocument' : ActorMethod<[Document], Result_6>,
  'createProject' : ActorMethod<[Project], Result_1>,
  'createUser' : ActorMethod<[User], Result_5>,
  'deleteAsset' : ActorMethod<[string, string], Result>,
  'deleteClient' : ActorMethod<[string], undefined>,
  'deleteDocument' : ActorMethod<[string], Result>,
  'deleteResource' : ActorMethod<[string], Result>,
  'deleteTimelineUpdate' : ActorMethod<[string], Result>,
  'drainToBusiness' : ActorMethod<[], Result_3>,
  'emergencyDrainToMaster' : ActorMethod<[], Result_3>,
  'getAllClients' : ActorMethod<[], Array<Client>>,
  'getAllProjects' : ActorMethod<[], Array<Project>>,
  'getAllUsers' : ActorMethod<[], Array<User>>,
  'getAsset' : ActorMethod<[string], [] | [Asset]>,
  'getAssetMetadata' : ActorMethod<
    [string],
    [] | [
      {
        'id' : string,
        'contentType' : string,
        'createdAt' : bigint,
        'size' : bigint,
        'filename' : string,
        'uploadedBy' : string,
      }
    ]
  >,
  'getClient' : ActorMethod<[string], [] | [Client]>,
  'getClientsByDeveloper' : ActorMethod<[string], Array<Client>>,
  'getCycleBalance' : ActorMethod<[], bigint>,
  'getCycleStatus' : ActorMethod<
    [],
    {
      'status' : string,
      'balance' : bigint,
      'reserve' : bigint,
      'available' : bigint,
    }
  >,
  'getDocumentsByDeveloper' : ActorMethod<[string], Array<Document>>,
  'getProjectByUrl' : ActorMethod<[string], [] | [Project]>,
  'getProjectsByClient' : ActorMethod<[string], Array<Project>>,
  'getProjectsByDeveloper' : ActorMethod<[string], Array<Project>>,
  'getRatingsByClient' : ActorMethod<[string], Array<Rating>>,
  'getResourcesByClient' : ActorMethod<[string], Array<Resource>>,
  'getTimelineByClient' : ActorMethod<[string], Array<TimelineUpdate>>,
  'getUser' : ActorMethod<[string], [] | [User]>,
  'getUserByAuthId' : ActorMethod<[string], [] | [User]>,
  'health' : ActorMethod<[], string>,
  'listUserAssets' : ActorMethod<[string], Array<Asset>>,
  'updateClient' : ActorMethod<[Client], Result_2>,
  'updateProject' : ActorMethod<[Project], Result_1>,
  'uploadAsset' : ActorMethod<
    [string, Uint8Array | number[], string, string, string],
    Result
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
