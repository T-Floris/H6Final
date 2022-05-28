CREATE PROCEDURE [dbo].[spBoardGroup_ChangeRole]
	@GroupId UNIQUEIDENTIFIER,
	@BoardId UNIQUEIDENTIFIER,
	@BoardAccessId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE [BoardGroup]
	SET [BoardAccessId] = @BoardAccessId
	WHERE 
		[BoardGroup].[GroupId] = @GroupId and
		[BoardGroup].[BoardId] = @BoardId
END
