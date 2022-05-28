CREATE PROCEDURE [dbo].[spSearch_GroupUser]
	@GroupId UNIQUEIDENTIFIER,
	@UserName nvarchar(50)
AS
BEGIN
	SELECT
		LEN([User].[UserName]) - LEN(@UserName) as search_UserName,
		[user].[UserName],
		[GroupAccess].[Name]
	FROM
		[dbo].[GroupUser], [dbo].[GroupAccess], [dbo].[User], [dbo].[Group]
	WHERE
		[User].[UserName] like '%' + @UserName + '%' and
		[GroupUser].[UserId] = [User].[Id] and
		[Group].[Id] = @GroupId and
		[GroupAccess].[Id] = [GroupUser].[GroupId]
	ORDER BY
		search_UserName,
		[User].[UserName] asc
END