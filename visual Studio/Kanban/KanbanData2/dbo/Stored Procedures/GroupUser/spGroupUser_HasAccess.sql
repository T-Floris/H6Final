CREATE PROCEDURE [dbo].[spGroupUser_HasAccess]
	@groupId UNIQUEIDENTIFIER,
	@userId UNIQUEIDENTIFIER
AS
BEGIN
SELECT CASE WHEN EXISTS (
		SELECT
			[Group].[Name] as GroupName,
			[User].[UserName],
			[GroupAccess].[Name] as AccessName

		FROM
			[dbo].[GroupUser], 
			[dbo].[GroupAccess],
			[dbo].[Group],
			[dbo].[User]
		WHERE
			[GroupUser].[GroupId] = @groupId and
			[GroupUser].[UserId] = @userId and
			[GroupUser].[GroupAccessId] = [GroupAccess].[Id] and
			[GroupAccess].[Name] = 'admin' and
			[User].[Id] = @userId or
			[GroupUser].[GroupId] = @groupId and
			[GroupUser].[UserId] = @userId and
			[GroupUser].[GroupAccessId] = [GroupAccess].[Id] and
			[GroupAccess].[Name] = 'owner' and
			[User].[Id] = @userId
			--[GroupUser].[GroupAccessId] = [GroupAccess].[Id] and
			--[GroupUser].[GroupId] = [Group].[Id] or
			--[GroupUser].[GroupId] = @groupId and
			--[GroupUser].[UserId] = @userId and
			--[GroupUser].[GroupAccessId] = [GroupAccess].[Id] and
			--[GroupAccess].[Name] = 'Admin' or
			--[GroupUser].[GroupId] = [Group].[Id]
			--[GroupAccess].[Name] = 'Admin' and
		)
	THEN CAST(1 AS BIT)
	ELSE CAST(0 AS BIT) END
End
