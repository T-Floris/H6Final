CREATE PROCEDURE [dbo].[spBoard_GetAll]
AS
BEGIN
	SELECT
		*
	FROM
		[dbo].[Board] ,[dbo].[User] --, [dbo].[BoardGroup]
	WHERE
	--	--[BoardGroup].[BoardId] = [Board].[Id] and
		[User].[Id] = [Board].[UserId]
END