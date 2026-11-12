export const idlFactory = ({ IDL }) => {
  const Rating = IDL.Record({
    'id' : IDL.Text,
    'clientId' : IDL.Text,
    'createdAt' : IDL.Int,
    'feedback' : IDL.Text,
    'developerId' : IDL.Text,
    'rating' : IDL.Nat,
  });
  const Result_9 = IDL.Variant({ 'ok' : Rating, 'err' : IDL.Text });
  const ResourceLink = IDL.Record({ 'url' : IDL.Text, 'name' : IDL.Text });
  const Resource = IDL.Record({
    'id' : IDL.Text,
    'title' : IDL.Text,
    'clientId' : IDL.Text,
    'createdAt' : IDL.Int,
    'links' : IDL.Vec(ResourceLink),
    'resourceType' : IDL.Text,
    'developerId' : IDL.Text,
  });
  const Result_8 = IDL.Variant({ 'ok' : Resource, 'err' : IDL.Text });
  const TimelineUpdate = IDL.Record({
    'id' : IDL.Text,
    'updateType' : IDL.Text,
    'status' : IDL.Text,
    'title' : IDL.Text,
    'clientId' : IDL.Text,
    'content' : IDL.Text,
    'createdAt' : IDL.Int,
    'actionItems' : IDL.Vec(IDL.Text),
    'developerId' : IDL.Text,
  });
  const Result_7 = IDL.Variant({ 'ok' : TimelineUpdate, 'err' : IDL.Text });
  const Project = IDL.Record({
    'id' : IDL.Text,
    'url' : IDL.Text,
    'status' : IDL.Text,
    'clientDashboardUrl' : IDL.Opt(IDL.Text),
    'clientId' : IDL.Opt(IDL.Text),
    'thumbnail' : IDL.Opt(IDL.Text),
    'projectType' : IDL.Text,
    'adminUrl' : IDL.Opt(IDL.Text),
    'name' : IDL.Text,
    'createdAt' : IDL.Int,
    'deadline' : IDL.Opt(IDL.Text),
    'developerId' : IDL.Text,
  });
  const Client = IDL.Record({
    'id' : IDL.Text,
    'dashboardUrl' : IDL.Opt(IDL.Text),
    'originalWebsiteUrl' : IDL.Opt(IDL.Text),
    'projects' : IDL.Vec(Project),
    'websiteUrl' : IDL.Opt(IDL.Text),
    'profileImage' : IDL.Opt(IDL.Text),
    'name' : IDL.Text,
    'createdAt' : IDL.Int,
    'contactPerson' : IDL.Opt(IDL.Text),
    'email' : IDL.Text,
    'developerId' : IDL.Text,
    'category' : IDL.Opt(IDL.Text),
    'phone' : IDL.Opt(IDL.Text),
  });
  const Result_2 = IDL.Variant({ 'ok' : Client, 'err' : IDL.Text });
  const Document = IDL.Record({
    'id' : IDL.Text,
    'clientId' : IDL.Text,
    'fileName' : IDL.Text,
    'fileSize' : IDL.Nat,
    'developerId' : IDL.Text,
    'uploadedAt' : IDL.Int,
  });
  const Result_6 = IDL.Variant({ 'ok' : Document, 'err' : IDL.Text });
  const Result_1 = IDL.Variant({ 'ok' : Project, 'err' : IDL.Text });
  const User = IDL.Record({
    'id' : IDL.Text,
    'userType' : IDL.Text,
    'name' : IDL.Text,
    'email' : IDL.Text,
    'authId' : IDL.Text,
  });
  const Result_5 = IDL.Variant({ 'ok' : User, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const Result_3 = IDL.Variant({
    'ok' : IDL.Record({ 'transferred' : IDL.Nat, 'remaining' : IDL.Nat }),
    'err' : IDL.Text,
  });
  const Asset = IDL.Record({
    'id' : IDL.Text,
    'contentType' : IDL.Text,
    'data' : IDL.Vec(IDL.Nat8),
    'createdAt' : IDL.Int,
    'size' : IDL.Nat,
    'filename' : IDL.Text,
    'uploadedBy' : IDL.Text,
  });
  return IDL.Service({
    'addRating' : IDL.Func([Rating], [Result_9], []),
    'addResource' : IDL.Func([Resource], [Result_8], []),
    'addTimelineUpdate' : IDL.Func([TimelineUpdate], [Result_7], []),
    'createClient' : IDL.Func([Client], [Result_2], []),
    'createDocument' : IDL.Func([Document], [Result_6], []),
    'createProject' : IDL.Func([Project], [Result_1], []),
    'createUser' : IDL.Func([User], [Result_5], []),
    'deleteAsset' : IDL.Func([IDL.Text, IDL.Text], [Result], []),
    'deleteClient' : IDL.Func([IDL.Text], [], []),
    'deleteDocument' : IDL.Func([IDL.Text], [Result], []),
    'deleteResource' : IDL.Func([IDL.Text], [Result], []),
    'deleteTimelineUpdate' : IDL.Func([IDL.Text], [Result], []),
    'drainToBusiness' : IDL.Func([], [Result_3], []),
    'emergencyDrainToMaster' : IDL.Func([], [Result_3], []),
    'getAllClients' : IDL.Func([], [IDL.Vec(Client)], ['query']),
    'getAllProjects' : IDL.Func([], [IDL.Vec(Project)], ['query']),
    'getAllUsers' : IDL.Func([], [IDL.Vec(User)], ['query']),
    'getAsset' : IDL.Func([IDL.Text], [IDL.Opt(Asset)], ['query']),
    'getAssetMetadata' : IDL.Func(
        [IDL.Text],
        [
          IDL.Opt(
            IDL.Record({
              'id' : IDL.Text,
              'contentType' : IDL.Text,
              'createdAt' : IDL.Int,
              'size' : IDL.Nat,
              'filename' : IDL.Text,
              'uploadedBy' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'getClient' : IDL.Func([IDL.Text], [IDL.Opt(Client)], ['query']),
    'getClientsByDeveloper' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(Client)],
        ['query'],
      ),
    'getCycleBalance' : IDL.Func([], [IDL.Nat], ['query']),
    'getCycleStatus' : IDL.Func(
        [],
        [
          IDL.Record({
            'status' : IDL.Text,
            'balance' : IDL.Nat,
            'reserve' : IDL.Nat,
            'available' : IDL.Nat,
          }),
        ],
        ['query'],
      ),
    'getDocumentsByDeveloper' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(Document)],
        ['query'],
      ),
    'getProjectByUrl' : IDL.Func([IDL.Text], [IDL.Opt(Project)], ['query']),
    'getProjectsByClient' : IDL.Func([IDL.Text], [IDL.Vec(Project)], ['query']),
    'getProjectsByDeveloper' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(Project)],
        ['query'],
      ),
    'getRatingsByClient' : IDL.Func([IDL.Text], [IDL.Vec(Rating)], ['query']),
    'getResourcesByClient' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(Resource)],
        ['query'],
      ),
    'getTimelineByClient' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(TimelineUpdate)],
        ['query'],
      ),
    'getUser' : IDL.Func([IDL.Text], [IDL.Opt(User)], ['query']),
    'getUserByAuthId' : IDL.Func([IDL.Text], [IDL.Opt(User)], ['query']),
    'health' : IDL.Func([], [IDL.Text], ['query']),
    'listUserAssets' : IDL.Func([IDL.Text], [IDL.Vec(Asset)], ['query']),
    'updateClient' : IDL.Func([Client], [Result_2], []),
    'updateProject' : IDL.Func([Project], [Result_1], []),
    'uploadAsset' : IDL.Func(
        [IDL.Text, IDL.Vec(IDL.Nat8), IDL.Text, IDL.Text, IDL.Text],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
