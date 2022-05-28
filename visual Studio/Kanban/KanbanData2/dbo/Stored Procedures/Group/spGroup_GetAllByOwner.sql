CREATE PROCEDURE [dbo].[spGroup_GetAllByOwner]
	@userId UNIQUEIDENTIFIER
AS
BEGIN
	SELECT
		[Group].[Id],
		[User].[UserName],
		[Group].[Name] as GroupName,
		[Group].[Color],
		[Group].[Name]
	FROM
		[dbo].[Group], [dbo].[User]--, [dbo].[GroupUser]
	WHERE
		--[GroupUser].[GroupId] = [Group].[Id] and
		[User].[Id] = [Group].[UserId] and
		[Group].[UserId] = @userId
END

