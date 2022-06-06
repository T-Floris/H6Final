CREATE PROCEDURE [dbo].[spBoard_GetMemberOf]
	@UserId UNIQUEIDENTIFIER
AS
BEGIN
	SELECT
		[Board].[Id],
		[User].[UserName],
		[Board].[Name]

	FROM
		[dbo].[Board] ,[dbo].[User], [dbo].[BoardGroup], [dbo].[GroupUser] --, [dbo].[BoardGroup]
	WHERE
	--	--[BoardGroup].[BoardId] = [Board].[Id] and
		[User].[Id] = [Board].[UserId] and
		[Board].[UserId] = @UserId 
END
