CREATE PROCEDURE [dbo].[spBoard_GetAll]
AS
BEGIN
	SELECT
		[Board].[Id],
		[User].[UserName],
		[Board].[Name]

	FROM
		[dbo].[Board] ,[dbo].[User] --, [dbo].[BoardGroup]
	WHERE
	--	--[BoardGroup].[BoardId] = [Board].[Id] and
		[User].[Id] = [Board].[UserId]
END