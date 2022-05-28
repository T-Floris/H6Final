CREATE PROCEDURE [dbo].[spBoardGroup_HasAccess]
	@groupId UNIQUEIDENTIFIER,
	@boardId UNIQUEIDENTIFIER
AS
BEGIN
SELECT CASE WHEN EXISTS (
		SELECT 
			[Board].[Name] AS BoardName,
			[Group].[Name] AS GroupName,
			[BoardAccess].[Name] as AccessName
		FROM
			[dbo].[BoardGroup],
			[dbo].[BoardAccess],
			[dbo].[Board],
			[dbo].[Group]
		WHERE
			[BoardGroup].[GroupId] = @groupId AND
			[BoardGroup].[BoardId] = @boardId AND
			[BoardGroup].[BoardAccessId] = [BoardAccess].[Id] AND
			[BoardAccess].[Name] = '' AND
			[Group].[Id] = @groupId OR
			[BoardGroup].[GroupId] = @groupId AND
			[BoardGroup].[BoardId] = @boardId AND
			[BoardGroup].[BoardAccessId] = [BoardAccess].[Id] AND
			[BoardAccess].[Name] = '' AND
			[Group].[Id] = @groupId
		)
	THEN CAST(1 AS BIT)
	ELSE CAST(0 AS BIT) 
	END
END