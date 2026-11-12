/**
 * Candid IDL Factory for Zubaze DFINITY Canister
 * Canister ID: q4jjt-lqaaa-aaaau-acpyq-cai
 * 
 * This defines the interface for communicating with the DFINITY canister
 * Updated: 2025-12-06 - Ensure Railway deployment picks up this file
 */

const idlFactory = ({ IDL }) => {
  const Project = IDL.Record({
    'id': IDL.Text,
    'url': IDL.Text,
    'status': IDL.Text,
    'clientDashboardUrl': IDL.Opt(IDL.Text),
    'clientId': IDL.Opt(IDL.Text),
    'thumbnail': IDL.Opt(IDL.Text),
    'projectType': IDL.Text,
    'adminUrl': IDL.Opt(IDL.Text),
    'name': IDL.Text,
    'createdAt': IDL.Int,
    'deadline': IDL.Opt(IDL.Text),
    'developerId': IDL.Text,
  });

  const Client = IDL.Record({
    'id': IDL.Text,
    'projects': IDL.Vec(Project),
    'name': IDL.Text,
    'createdAt': IDL.Int,
    'email': IDL.Text,
    'websiteUrl': IDL.Opt(IDL.Text),
    'originalWebsiteUrl': IDL.Opt(IDL.Text),
    'dashboardUrl': IDL.Opt(IDL.Text),
    'category': IDL.Opt(IDL.Text),
    'developerId': IDL.Text,
  });
  const Result_2 = IDL.Variant({ 'ok': Client, 'err': IDL.Text });

  const Result_1 = IDL.Variant({ 'ok': Project, 'err': IDL.Text });

  const User = IDL.Record({
    'id': IDL.Text,
    'userType': IDL.Text,
    'name': IDL.Text,
    'email': IDL.Text,
    'authId': IDL.Text,
  });
  const Result_5 = IDL.Variant({ 'ok': User, 'err': IDL.Text });
  const Result = IDL.Variant({ 'ok': IDL.Text, 'err': IDL.Text });

  const Asset = IDL.Record({
    'id': IDL.Text,
    'contentType': IDL.Text,
    'data': IDL.Vec(IDL.Nat8),
    'createdAt': IDL.Int,
    'size': IDL.Nat,
    'filename': IDL.Text,
    'uploadedBy': IDL.Text,
  });

  const ResourceLink = IDL.Record({
    'name': IDL.Text,
    'url': IDL.Text,
  });

  const Resource = IDL.Record({
    'id': IDL.Text,
    'clientId': IDL.Text,
    'developerId': IDL.Text,
    'resourceType': IDL.Text,
    'title': IDL.Text,
    'links': IDL.Vec(ResourceLink),
    'createdAt': IDL.Int,
  });

  const TimelineUpdate = IDL.Record({
    'id': IDL.Text,
    'clientId': IDL.Text,
    'developerId': IDL.Text,
    'updateType': IDL.Text,
    'title': IDL.Text,
    'content': IDL.Text,
    'actionItems': IDL.Vec(IDL.Text),
    'status': IDL.Text,
    'createdAt': IDL.Int,
  });

  const Rating = IDL.Record({
    'id': IDL.Text,
    'clientId': IDL.Text,
    'developerId': IDL.Text,
    'rating': IDL.Nat,
    'feedback': IDL.Text,
    'createdAt': IDL.Int,
  });

  const Result_3 = IDL.Variant({ 'ok': Resource, 'err': IDL.Text });
  const Result_4 = IDL.Variant({ 'ok': TimelineUpdate, 'err': IDL.Text });
  const Result_6 = IDL.Variant({ 'ok': Rating, 'err': IDL.Text });

  return IDL.Service({
    'createClient': IDL.Func([Client], [Result_2], []),
    'createProject': IDL.Func([Project], [Result_1], []),
    'createUser': IDL.Func([User], [Result_5], []),
    'deleteAsset': IDL.Func([IDL.Text, IDL.Text], [Result], []),
    'getAllClients': IDL.Func([], [IDL.Vec(Client)], ['query']),
    'getAllProjects': IDL.Func([], [IDL.Vec(Project)], ['query']),
    'getAllUsers': IDL.Func([], [IDL.Vec(User)], ['query']),
    'getAsset': IDL.Func([IDL.Text], [IDL.Opt(Asset)], ['query']),
    'getClient': IDL.Func([IDL.Text], [IDL.Opt(Client)], ['query']),
    'getClientsByDeveloper': IDL.Func([IDL.Text], [IDL.Vec(Client)], ['query']),
    'getCycleBalance': IDL.Func([], [IDL.Nat], ['query']),
    'getCycleStatus': IDL.Func([], [
      IDL.Record({
        'status': IDL.Text,
        'balance': IDL.Nat,
        'reserve': IDL.Nat,
        'available': IDL.Nat,
      }),
    ], ['query']),
    'getProjectByUrl': IDL.Func([IDL.Text], [IDL.Opt(Project)], ['query']),
    'getProjectsByClient': IDL.Func([IDL.Text], [IDL.Vec(Project)], ['query']),
    'getProjectsByDeveloper': IDL.Func([IDL.Text], [IDL.Vec(Project)], ['query']),
    'getUser': IDL.Func([IDL.Text], [IDL.Opt(User)], ['query']),
    'getUserByAuthId': IDL.Func([IDL.Text], [IDL.Opt(User)], ['query']),
    'health': IDL.Func([], [IDL.Text], ['query']),
    'updateClient': IDL.Func([Client], [Result_2], []),
    'updateProject': IDL.Func([Project], [Result_1], []),
    'uploadAsset': IDL.Func(
      [IDL.Text, IDL.Vec(IDL.Nat8), IDL.Text, IDL.Text, IDL.Text],
      [Result],
      [],
    ),
    'drainToBusiness': IDL.Func([], [
      IDL.Variant({
        'ok': IDL.Record({ 'transferred': IDL.Nat, 'remaining': IDL.Nat }),
        'err': IDL.Text,
      })
    ], []),
    'emergencyDrainToMaster': IDL.Func([], [
      IDL.Variant({
        'ok': IDL.Record({ 'transferred': IDL.Nat, 'remaining': IDL.Nat }),
        'err': IDL.Text,
      })
    ], []),
    
    // Dashboard content methods
    'addResource': IDL.Func([Resource], [Result_3], []),
    'getResourcesByClient': IDL.Func([IDL.Text], [IDL.Vec(Resource)], ['query']),
    'deleteResource': IDL.Func([IDL.Text], [Result], []),
    
    'addTimelineUpdate': IDL.Func([TimelineUpdate], [Result_4], []),
    'getTimelineByClient': IDL.Func([IDL.Text], [IDL.Vec(TimelineUpdate)], ['query']),
    'deleteTimelineUpdate': IDL.Func([IDL.Text], [Result], []),
    
    'addRating': IDL.Func([Rating], [Result_6], []),
    'getRatingsByClient': IDL.Func([IDL.Text], [IDL.Vec(Rating)], ['query']),
  });
};

module.exports = { idlFactory };
