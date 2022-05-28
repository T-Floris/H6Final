CREATE PROCEDURE [dbo].[spBoardGroup_RemoveGroup]
	@BoardId UNIQUEIDENTIFIER,
	@GroupId UNIQUEIDENTIFIER
AS
BEGIN
	DELETE 
		[BoardGroup]
	WHERE 
		[BoardGroup].[BoardId] = @BoardId and
		[BoardGroup].[GroupId] = @GroupId
END
