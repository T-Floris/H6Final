﻿CREATE PROCEDURE [dbo].[spBoard_GetAll]
	@UserId UNIQUEIDENTIFIER
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
		[User].[Id] = [Board].[UserId] and
		[Board].[UserId] = @UserId
END