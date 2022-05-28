CREATE PROCEDURE [dbo].[spGroupUser_GetInGroup]
	@Id UNIQUEIDENTIFIER
AS
BEGIN
	SELECT
		[Group].[Name] as GroupName,
		[User].[UserName],
		[GroupAccess].[Name] as AccessName

	FROM
		[dbo].[GroupUser], 
		[dbo].[Group],
		[dbo].[User],
		[dbo].[GroupAccess]
	WHERE
		[GroupUser].[GroupId] = @Id and
		[GroupUser].[UserId] = [User].[Id] and
		[GroupUser].[GroupAccessId] = [GroupAccess].[Id] and
		[GroupUser].[GroupId] = [Group].[Id]

End
